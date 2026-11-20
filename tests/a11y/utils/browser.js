// Checks that run inside the page. `install` puts them on `window.__a11y`; call them with
// `page.evaluate(() => window.__a11y.check())`. Everything here runs in the browser, so this
// function can't use anything from the surrounding module.
import { injectAxe } from './a11y.js';

const helpers = () => {
	const { axe } = window;

	/** Rebuild axe's tree after DOM changes, so names and roles are current */
	const refresh = () => {
		axe.teardown();
		axe.setup(document);
	};

	const describe = (el) => {
		let selector;

		try {
			selector = axe.utils.getSelector(el);
		}
		catch {
			selector = el.tagName.toLowerCase();
		}

		const text = (el.innerText || el.getAttribute(`aria-label`) || el.getAttribute(`alt`) || ``).trim().replace(/\s+/g, ` `);

		return text ? `${selector} "${text.slice(0, 60)}${text.length > 60 ? `…` : ``}"` : selector;
	};

	const accessibleName = (el) => {
		try {
			return axe.commons.text.accessibleText(el).trim().replace(/\s+/g, ` `);
		}
		catch {
			return (el.getAttribute(`aria-label`) || el.textContent || ``).trim().replace(/\s+/g, ` `);
		}
	};

	const rendered = (el) => el.checkVisibility({ visibilityProperty: true, opacityProperty: true })
		&& !el.closest(`[aria-hidden="true"], [inert]`);

	/** Positioned off the page, like `.sr-only` (`position: absolute; right: -200vw`) */
	const offPage = (el) => {
		for (let node = el; node && node !== document.body; node = node.parentElement) {
			if (!/absolute|fixed/.test(getComputedStyle(node).position)) continue;

			const rect = node.getBoundingClientRect();
			const left = rect.left + window.scrollX;
			const top = rect.top + window.scrollY;

			if (left >= document.documentElement.clientWidth || left + rect.width <= 0 || top + rect.height <= 0) return true;
		}

		return false;
	};

	/** Hidden visually but still in the accessibility tree (an `.sr-only` element, a hidden native checkbox) */
	const visuallyHidden = (el) => {
		const rect = el.getBoundingClientRect();
		const style = getComputedStyle(el);

		return rect.width <= 1 || rect.height <= 1
			|| style.clip === `rect(0px, 0px, 0px, 0px)`
			|| /inset\(50%\)/.test(style.clipPath)
			|| offPage(el);
	};

	const interactive = [
		`a[href]`, `button`, `input:not([type="hidden"])`, `select`, `textarea`, `summary`,
		`[role="button"]`, `[role="link"]`, `[role="checkbox"]`, `[role="radio"]`, `[role="switch"]`,
		`[role="tab"]`, `[role="menuitem"]`, `[role="option"]`, `[tabindex]:not([tabindex="-1"])`,
	].join(`, `);

	/** Elements a keyboard user should reach with Tab, in DOM order */
	const tabbable = () => [...document.querySelectorAll(`${interactive}, iframe, [contenteditable="true"]`)]
		.filter((el) => el.tabIndex >= 0 && !el.disabled && rendered(el) && !el.closest(`[inert]`));

	/** The thing that visibly represents an element: its label, if the control itself is hidden */
	/**
	 * The element's smallest corner radius in px, capped at half its shorter side, so a rounded
	 * button or a circle gets its real perimeter (2.4.13 uses the shape's own outline when that's
	 * shorter than its bounding box). Percentages resolve against the shorter side.
	 */
	const cornerRadius = (el, rect) => {
		const style = getComputedStyle(el);
		const shorter = Math.min(rect.width, rect.height);
		const corners = [`borderTopLeftRadius`, `borderTopRightRadius`, `borderBottomRightRadius`, `borderBottomLeftRadius`].map((corner) => {
			// "50%" or "10px", or "10px 20px" for an elliptical corner (use the smaller)
			const values = style[corner].split(` `).map((value) => (value.endsWith(`%`) ? (parseFloat(value) / 100) * shorter : parseFloat(value)));

			return Math.min(...values) || 0;
		});

		return Math.min(...corners, shorter / 2);
	};

	const visibleTarget = (el) => {
		if (!visuallyHidden(el)) return el;

		return el.labels?.[0] ?? (el.id && document.querySelector(`[for="${CSS.escape(el.id)}"]`)) ?? null;
	};

	/**
	 * Whether clicks across a 44 × 44px area centred on the target reach it. Hit testing counts
	 * `::before` / `::after` boxes that enlarge the target (they hit-test as their element), and
	 * fails where an adjacent target's hit area overlaps, so spacing is checked too.
	 */
	const hitArea = (target, control) => {
		target.scrollIntoView({ block: `center`, inline: `center` });

		const rect = target.getBoundingClientRect();
		const cx = rect.left + (rect.width / 2);
		const cy = rect.top + (rect.height / 2);
		const half = { x: (Math.max(rect.width, 44) / 2) - 0.5, y: (Math.max(rect.height, 44) / 2) - 0.5 };
		const steps = 4;

		for (let i = 0; i <= steps; i++) {
			for (let j = 0; j <= steps; j++) {
				const hit = document.elementFromPoint(cx - half.x + ((2 * half.x * i) / steps), cy - half.y + ((2 * half.y * j) / steps));

				if (!hit || !(target.contains(hit) || control.contains(hit))) return false;
			}
		}

		return true;
	};

	/** Width of `count`ch in an element's font (1ch is the width of "0"), measured with a hidden probe inside it */
	const chWidth = (el, count) => {
		const probe = document.createElement(`span`);

		probe.style.cssText = `position: absolute; visibility: hidden; width: ${count}ch; height: 0; padding: 0; border: 0;`;
		el.append(probe);

		const { width } = probe.getBoundingClientRect();

		probe.remove();

		return width;
	};

	/** Width of the widest rendered line of text in an element */
	const widestLine = (el, lh) => {
		const top = el.getBoundingClientRect().top;
		const lines = new Map();
		const rects = [];
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);

		// Measure visible text only: `.sr-only` text is positioned off the page and would stretch the line
		while (walker.nextNode()) {
			const node = walker.currentNode;
			let hidden = false;

			for (let parent = node.parentElement; parent && parent !== el; parent = parent.parentElement) {
				if (!rendered(parent) || visuallyHidden(parent)) {
					hidden = true;
					break;
				}
			}

			if (hidden || !node.textContent.trim()) continue;

			const range = document.createRange();

			range.selectNodeContents(node);
			rects.push(...range.getClientRects());
		}

		for (const rect of rects) {
			if (!rect.width || !rect.height) continue;

			// Group the boxes by which line their vertical middle falls on
			const line = Math.floor((rect.top + (rect.height / 2) - top) / lh);
			const { left, right } = lines.get(line) ?? { left: Infinity, right: -Infinity };

			lines.set(line, { left: Math.min(left, rect.left), right: Math.max(right, rect.right) });
		}

		return Math.max(0, ...[...lines.values()].map(({ left, right }) => right - left));
	};

	const lineHeight = (style) => (style.lineHeight === `normal` ? parseFloat(style.fontSize) * 1.2 : parseFloat(style.lineHeight));

	/** Elements that directly contain visible text */
	const textElements = (root = document.body) => {
		const found = new Set();
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
			acceptNode: (node) => (node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
		});

		while (walker.nextNode()) {
			const el = walker.currentNode.parentElement;

			if (el && !el.closest(`script, style, noscript, template, title`) && rendered(el) && !visuallyHidden(el)) found.add(el);
		}

		return [...found];
	};

	/** Inside something allowed to scroll in two dimensions (tables, code), per 1.4.10's exception */
	const inScrollableContent = (el) => {
		for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
			if (/^(PRE|TABLE)$/.test(node.tagName)) return true;

			const { overflowX } = getComputedStyle(node);

			if (/auto|scroll/.test(overflowX) && node.scrollWidth > node.clientWidth) return true;
		}

		return false;
	};

	return {
		refresh,

		/** 2.5.5 Target Size (Enhanced): targets are at least 44 × 44 CSS px, unless inline in text */
		targetSize() {
			refresh();
			const issues = [];
			const seen = new Set();
			const scroll = { x: window.scrollX, y: window.scrollY };

			for (const el of document.querySelectorAll(interactive)) {
				// `<a>` has no `disabled` property, so check the attribute as well
				if (el.disabled || el.hasAttribute(`disabled`) || el.getAttribute(`aria-disabled`) === `true` || !rendered(el)) continue;

				const target = visibleTarget(el);

				// A visually hidden control with no visible label (e.g. a skip link before it's focused)
				if (!target || seen.has(target)) continue;
				seen.add(target);

				const style = getComputedStyle(target);

				// Any inline-level box: links get `display: inline-block` from the underline mixin
				if (style.display.startsWith(`inline`)) {
					const block = target.parentElement?.closest(`p, li, td, th, dd, dt, blockquote, figcaption, label, h1, h2, h3, h4, h5, h6, div`);

					// "Inline" exception: a link within a sentence or block of text
					if (block && block.innerText.trim().length > target.innerText.trim().length) continue;
				}

				const { width, height } = target.getBoundingClientRect();

				if ((width < 44 || height < 44) && !hitArea(target, el)) {
					issues.push({ target: describe(target), message: `${Math.round(width)} × ${Math.round(height)}px, and its hit area (including ::before/::after) doesn't cover 44 × 44px` });
				}
			}

			window.scrollTo(scroll.x, scroll.y);

			return issues;
		},

		/** 2.4.9 Link Purpose (Link Only), 2.4.4 Link Purpose (In Context) */
		linkPurpose() {
			refresh();
			const issues = [];
			const vague = /^(click|click here|tap here|here|this|this link|link|more|read more|read on|continue|continue reading|learn more|find out more|see more|view|view more|details|more details|more info|info|go|website|page)$/;
			const byName = new Map();

			for (const el of document.querySelectorAll(`a[href], [role="link"]`)) {
				if (!el.checkVisibility({ visibilityProperty: true }) || el.closest(`[aria-hidden="true"]`)) continue;

				const name = accessibleName(el);
				const key = name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ` `).trim();

				if (!key) {
					issues.push({ target: describe(el), message: `link has no accessible name` });
					continue;
				}

				if (vague.test(key)) {
					issues.push({ target: describe(el), message: `"${name}" doesn't say where the link goes without its surrounding context` });
				}

				if (el.href) {
					const url = new URL(el.href, location.href);

					url.hash = ``;
					const href = url.href.replace(/\/$/, ``);

					if (!byName.has(key)) byName.set(key, { name, hrefs: new Set(), els: [] });
					byName.get(key).hrefs.add(href);
					byName.get(key).els.push(el);
				}
			}

			for (const { name, hrefs, els } of byName.values()) {
				if (hrefs.size > 1) {
					issues.push({
						target: els.map(describe).join(`, `),
						message: `${hrefs.size} links named "${name}" go to different places: ${[...hrefs].join(`, `)}`,
					});
				}
			}

			return issues;
		},

		/** 3.2.5 Change on Request (G201): links that open a new window say so */
		newWindowWarnings() {
			refresh();

			return [...document.querySelectorAll(`a[target="_blank"], area[target="_blank"], form[target="_blank"]`)]
				.filter((el) => !el.closest(`[aria-hidden="true"]`))
				.filter((el) => !/new (tab|window)|opens? in|external/i.test(`${accessibleName(el)} ${el.title}`))
				.map((el) => ({ target: describe(el), message: `opens a new tab/window without warning (add e.g. "(opens in a new tab)" to its accessible name)` }));
		},

		/** 2.4.10 Section Headings, 1.3.1: one or more h1, and no skipped levels */
		headings() {
			const issues = [];
			const headings = [...document.querySelectorAll(`h1, h2, h3, h4, h5, h6, [role="heading"]`)]
				.filter((el) => el.checkVisibility({ visibilityProperty: true }) && !el.closest(`[aria-hidden="true"]`))
				.map((el) => ({ el, level: Number(el.getAttribute(`aria-level`) || el.tagName.slice(1)) || 2 }));

			if (!headings.some(({ level }) => level === 1)) issues.push(`page has no level 1 heading`);

			headings.forEach(({ el, level }, i) => {
				const prev = headings[i - 1]?.level ?? 0;

				if (level > prev + 1) issues.push({ target: describe(el), message: `h${level} follows h${prev || `(none)`}, skipping a level` });
			});

			return { issues, h1s: headings.filter(({ level }) => level === 1).length };
		},

		/** 1.4.8 Visual Presentation: line height, paragraph spacing, line length, no justified text */
		visualPresentation() {
			const issues = [];
			const blocks = [...document.querySelectorAll(`main p, main li, main dd, main dt, main blockquote, main figcaption, main td, main th`)]
				.filter((el) => rendered(el) && !visuallyHidden(el) && el.innerText.trim().length >= 40)
				// Only text blocks, not containers of other blocks
				.filter((el) => [...el.children].every((child) => getComputedStyle(child).display.startsWith(`inline`) || child.tagName === `BR`));

			for (const el of blocks) {
				const style = getComputedStyle(el);
				const fontSize = parseFloat(style.fontSize);
				const lh = lineHeight(style);
				if (lh / fontSize < 1.49) {
					issues.push({ target: describe(el), message: `line-height is ${(lh / fontSize).toFixed(2)}; needs at least 1.5` });
				}

				if (style.textAlign === `justify`) {
					issues.push({ target: describe(el), message: `text is justified` });
				}

				// Width is no more than 80 characters (technique C20): compare the widest rendered line
				// with 80ch in the element's own font, so narrow glyphs like `-` or `i` don't count against it
				const widest = widestLine(el, lh);
				const limit = chWidth(el, 80);

				if (widest > limit + 1) {
					issues.push({ target: describe(el), message: `lines are ${Math.round(widest)}px wide (${Math.round((widest / limit) * 80)}ch); needs 80ch (${Math.round(limit)}px) or less` });
				}

				// Paragraph spacing ≥ 1.5 × line spacing: baseline-to-baseline across the paragraph break is
				// at least 1.5 line-heights, i.e. the gap between the two paragraphs' line boxes is ≥ 0.5 line-heights
				const next = el.nextElementSibling;

				if (el.tagName === `P` && next?.tagName === `P` && rendered(next)) {
					const gap = next.getBoundingClientRect().top - el.getBoundingClientRect().bottom;

					if (gap < lh * 0.5 - 0.5) {
						issues.push({ target: describe(el), message: `${Math.round(gap)}px gap before the next paragraph; needs at least ${Math.ceil(lh * 0.5)}px (1.5 × line spacing)` });
					}
				}
			}

			return issues;
		},

		/** 1.4.10 Reflow (and 1.4.4 / 1.4.12): nothing needs horizontal scrolling or is cut off at the sides */
		overflow() {
			const issues = [];
			const width = document.documentElement.clientWidth;

			if (document.documentElement.scrollWidth > width + 1) {
				issues.push(`page scrolls horizontally: content is ${document.documentElement.scrollWidth}px wide in a ${width}px viewport`);
			}

			const reported = [];

			for (const el of [...textElements(), ...document.querySelectorAll(interactive)]) {
				if (!rendered(el) || visuallyHidden(el) || inScrollableContent(el)) continue;
				// Only report the outermost offender
				if (reported.some((parent) => parent.contains(el))) continue;

				const rect = el.getBoundingClientRect();

				if (rect.width && (rect.right > width + 1 || rect.left < -1)) {
					reported.push(el);
					issues.push({ target: describe(el), message: `spans ${Math.round(rect.left)}px to ${Math.round(rect.right)}px in a ${width}px viewport` });
				}
			}

			return issues;
		},

		/** 1.4.12 Text Spacing: text isn't clipped once spacing is increased */
		clippedText() {
			const issues = [];

			for (const el of document.querySelectorAll(`body *`)) {
				const style = getComputedStyle(el);

				if (!/hidden|clip/.test(style.overflowX + style.overflowY) || !rendered(el) || visuallyHidden(el)) continue;
				if (!el.innerText?.trim()) continue;

				const clippedY = /hidden|clip/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1;
				const clippedX = /hidden|clip/.test(style.overflowX) && el.scrollWidth > el.clientWidth + 1;

				if (clippedY || clippedX) {
					issues.push({ target: describe(el), message: `text is cut off (${el.scrollWidth}×${el.scrollHeight}px of content in a ${el.clientWidth}×${el.clientHeight}px box)` });
				}
			}

			return issues;
		},

		/** 2.2.2 Pause, Stop, Hide / 2.3.3 Animation from Interactions */
		animations({ reducedMotion }) {
			const motion = /transform|translate|rotate|scale|^(top|left|right|bottom|inset)$|^margin|^offset|^width$|^height$|background-position|^all$/;
			const issues = [];

			for (const animation of document.getAnimations()) {
				if (animation.playState !== `running`) continue;

				const { effect } = animation;
				const timing = effect?.getComputedTiming();

				if (!timing || !timing.duration) continue;

				const props = animation instanceof CSSTransition
					? [animation.transitionProperty]
					: effect.getKeyframes().flatMap((frame) => Object.keys(frame)).filter((key) => !/^(offset|computedOffset|easing|composite)$/.test(key));
				const kebab = props.map((prop) => prop.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`));
				const target = effect.target ? describe(effect.target) : `(document)`;
				const label = animation.animationName || animation.transitionProperty || `animation`;

				if (timing.iterations === Infinity) {
					issues.push({ target, message: `"${label}" repeats forever with no way to pause it (2.2.2)` });
				}
				else if (reducedMotion && kebab.some((prop) => motion.test(prop))) {
					issues.push({ target, message: `"${label}" animates ${kebab.join(`, `)} even with prefers-reduced-motion: reduce (2.3.3)` });
				}
			}

			for (const video of document.querySelectorAll(`video[autoplay]`)) {
				if (!video.controls && !video.muted) issues.push({ target: describe(video), message: `autoplaying video with sound and no controls (1.4.2, 2.2.2)` });
				else if (!video.controls) issues.push({ target: describe(video), message: `autoplaying video with no controls to pause it (2.2.2)` });
			}

			for (const el of document.querySelectorAll(`marquee, blink`)) {
				issues.push({ target: describe(el), message: `<${el.tagName.toLowerCase()}> moves with no way to stop it (2.2.2)` });
			}

			return issues;
		},

		/** Visible interactive elements, tagged with data-a11y-hover so Playwright can hover each one */
		hoverTargets() {
			const els = [...document.querySelectorAll(interactive)].filter((el) => rendered(el) && !visuallyHidden(el));

			els.forEach((el, i) => el.setAttribute(`data-a11y-hover`, String(i)));

			return els.length;
		},

		/** Tag every tabbable element with its DOM index, so the keyboard test can tell them apart */
		tabbables() {
			refresh();

			return tabbable().map((el, i) => {
				el.setAttribute(`data-a11y-tab`, String(i));

				return describe(el);
			});
		},

		/** What has focus now: its index, description, the box to screenshot, and anything covering it */
		focused() {
			const el = document.activeElement;

			if (!el || el === document.body || el === document.documentElement) return null;

			const target = visibleTarget(el) ?? el;
			const rect = target.getBoundingClientRect();
			const { innerWidth, innerHeight } = window;
			const inset = 2;
			const points = [
				[rect.left + rect.width / 2, rect.top + rect.height / 2],
				[rect.left + inset, rect.top + inset],
				[rect.right - inset, rect.top + inset],
				[rect.left + inset, rect.bottom - inset],
				[rect.right - inset, rect.bottom - inset],
			];
			const covering = new Set();

			for (const [x, y] of points) {
				if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) continue;

				const hit = document.elementFromPoint(x, y);

				if (hit && !target.contains(hit) && !el.contains(hit) && !hit.contains(target) && hit !== el) {
					covering.add(describe(hit));
				}
			}

			return {
				index: el.getAttribute(`data-a11y-tab`),
				description: describe(el),
				// Page coordinates, for a full-page screenshot clip
				box: { x: rect.left + window.scrollX, y: rect.top + window.scrollY, width: rect.width, height: rect.height, radius: cornerRadius(target, rect) },
				offscreen: rect.bottom <= 0 || rect.top >= innerHeight || rect.right <= 0 || rect.left >= innerWidth,
				partlyOffscreen: rect.top < 0 || rect.left < 0 || rect.bottom > innerHeight || rect.right > innerWidth,
				covering: [...covering],
			};
		},

		/**
		 * Every piece of visible text, for the pixel contrast check (utils/contrast.js): its colour as
		 * rendered (RGBA, after opacity), whether it's large text, and the boxes its glyphs sit in (page px).
		 */
		contrastTargets() {
			const canvas = document.createElement(`canvas`).getContext(`2d`, { willReadFrequently: true });
			// Any CSS colour (oklch, color-mix…) to RGBA via the canvas
			const rgba = (color) => {
				canvas.clearRect(0, 0, 1, 1);
				canvas.fillStyle = `#000`;
				canvas.fillStyle = color;
				canvas.fillRect(0, 0, 1, 1);

				const [r, g, b, a] = canvas.getImageData(0, 0, 1, 1).data;

				return [r, g, b, a / 255];
			};
			const opacity = (el) => {
				let value = 1;

				for (let node = el; node; node = node.parentElement) value *= Number(getComputedStyle(node).opacity);

				return value;
			};
			const pageRect = ({ left, top, width, height }) => ({ x: left + window.scrollX, y: top + window.scrollY, width, height });
			// Trim a glyph box to what its ancestors actually show. Range rects ignore overflow, so text
			// cut off by `overflow: hidden` (like line-clamped excerpts) would otherwise be measured
			// against whatever sits outside the box. Stops at <body>, whose overflow belongs to the viewport.
			const visiblePart = (rect, el) => {
				let { left, top, right, bottom } = rect;

				for (let node = el; node && node !== document.body; node = node.parentElement) {
					const style = getComputedStyle(node);
					const clipX = style.overflowX !== `visible`;
					const clipY = style.overflowY !== `visible`;

					if (!clipX && !clipY) continue;

					// The padding box: overflow is clipped inside the borders
					const box = node.getBoundingClientRect();
					const innerLeft = box.left + node.clientLeft;
					const innerTop = box.top + node.clientTop;

					if (clipX) {
						left = Math.max(left, innerLeft);
						right = Math.min(right, innerLeft + node.clientWidth);
					}

					if (clipY) {
						top = Math.max(top, innerTop);
						bottom = Math.min(bottom, innerTop + node.clientHeight);
					}
				}

				return { left, top, width: right - left, height: bottom - top };
			};
			const large = (style) => {
				const size = parseFloat(style.fontSize);

				// 18pt, or 14pt bold, in CSS px
				return size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
			};
			const targets = new Map();

			const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
				acceptNode: (node) => (node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
			});

			while (walker.nextNode()) {
				const node = walker.currentNode;
				const el = node.parentElement;

				if (!el || el.closest(`script, style, noscript, template, title, svg`) || !rendered(el) || visuallyHidden(el)) continue;
				// Disabled controls are exempt ("incidental" text)
				if (el.closest(`:disabled, [aria-disabled="true"]`)) continue;

				const range = document.createRange();

				range.selectNodeContents(node);

				const rects = [...range.getClientRects()]
					.map((rect) => visiblePart(rect, el))
					.filter(({ width, height }) => width >= 1 && height >= 1)
					.map(pageRect);

				if (!rects.length) continue;

				if (!targets.has(el)) {
					const style = getComputedStyle(el);
					const fill = style.webkitTextFillColor;
					const [r, g, b, a] = rgba(fill && fill !== style.color ? fill : style.color);

					targets.set(el, {
						description: describe(el),
						color: [r, g, b, a * opacity(el)],
						large: large(style),
						// Gradient-filled text, or a shadow/outline that may be what gives it contrast
						review: [
							/text/.test(style.backgroundClip + style.webkitBackgroundClip) && `gradient-filled text`,
							style.textShadow !== `none` && `text-shadow`,
							parseFloat(style.webkitTextStrokeWidth) > 0 && `text stroke`,
						].filter(Boolean),
						rects: [],
					});
				}

				targets.get(el).rects.push(...rects);
			}

			// Placeholder text in empty fields
			for (const el of document.querySelectorAll(`input[placeholder], textarea[placeholder]`)) {
				if (el.value || !el.placeholder.trim() || el.disabled || !rendered(el) || visuallyHidden(el)) continue;

				const style = getComputedStyle(el, `::placeholder`);
				const box = el.getBoundingClientRect();
				const fieldStyle = getComputedStyle(el);
				const padX = parseFloat(fieldStyle.paddingLeft) + parseFloat(fieldStyle.borderLeftWidth);
				const lh = lineHeight(fieldStyle);
				const top = el.tagName === `TEXTAREA` ? box.top + parseFloat(fieldStyle.paddingTop) + parseFloat(fieldStyle.borderTopWidth) : box.top + (box.height - lh) / 2;
				const [r, g, b, a] = rgba(style.color);

				targets.set(el, {
					description: `${describe(el)} placeholder "${el.placeholder}"`,
					color: [r, g, b, a * opacity(el)],
					large: large(style),
					review: [],
					rects: [pageRect({ left: box.left + padX, top, width: Math.max(1, box.width - padX * 2), height: lh })],
				});
			}

			return [...targets.values()];
		},

		/**
		 * What paints the background at a page point (from contrastTargets/measureContrast), for
		 * quoting in a contrast failure: the element, and its colour, gradient (with its stops) or image.
		 * ::before/::after can't be hit-tested, so a pseudo-element shape shows up as its parent, or not at all.
		 */
		paintedAt({ x, y }) {
			const canvas = document.createElement(`canvas`).getContext(`2d`, { willReadFrequently: true });
			const hex = (color) => {
				canvas.clearRect(0, 0, 1, 1);
				canvas.fillStyle = `#000`;
				canvas.fillStyle = color;
				canvas.fillRect(0, 0, 1, 1);

				const [r, g, b, a] = canvas.getImageData(0, 0, 1, 1).data;

				return `#${[r, g, b, ...(a < 255 ? [a] : [])].map((value) => value.toString(16).padStart(2, `0`)).join(``)}`;
			};
			const transparent = (color) => /^rgba\(.*,\s*0\)$|^transparent$/.test(color);
			// <linearGradient>/<radialGradient> stops, following href to an inherited gradient
			const svgGradient = (ref) => {
				for (let grad = ref, seen = 0; grad && seen < 5; seen++) {
					const stops = [...grad.querySelectorAll(`stop`)];

					if (stops.length) {
						return `${grad.tagName} #${ref.id}: ${stops.map((stop) => {
							const style = getComputedStyle(stop);
							const color = Number(style.stopOpacity) < 1 ? `color-mix(in srgb, ${style.stopColor} ${Number(style.stopOpacity) * 100}%, transparent)` : style.stopColor;

							return `${hex(color)} ${stop.getAttribute(`offset`) ?? `0`}`;
						}).join(`, `)}`;
					}

					const href = grad.getAttribute(`href`) ?? grad.getAttribute(`xlink:href`);

					grad = href && document.getElementById(href.slice(1));
				}

				return `gradient #${ref.id} (no stops found)`;
			};
			const svgPaint = (paint) => {
				const id = /url\(["']?#([^"')]+)/.exec(paint)?.[1];

				if (!id) return hex(paint);

				const ref = document.getElementById(id);

				return /gradient/i.test(ref?.tagName) ? svgGradient(ref) : `${ref?.tagName ?? `missing`} #${id}`;
			};
			// Colours inside a CSS gradient, as hex
			const cssPaint = (image) => image.replace(/(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*(?:\([^()]*\)[^()]*)*\)|#[0-9a-f]{3,8}\b/gi, (color) => hex(color));

			// Elements with pointer-events: none (decorative shapes) aren't returned otherwise
			const style = document.createElement(`style`);

			style.textContent = `*, *::before, *::after { pointer-events: auto !important; }`;
			document.head.append(style);
			window.scrollTo(0, y - innerHeight / 2);

			const stack = document.elementsFromPoint(x - window.scrollX, y - window.scrollY);

			style.remove();

			for (const el of stack) {
				const computed = getComputedStyle(el);

				if (el instanceof SVGGeometryElement || el instanceof SVGTextContentElement) {
					if (computed.fill !== `none` && Number(computed.fillOpacity) > 0) return `${describe(el)}, fill ${svgPaint(computed.fill)}`;
					continue;
				}

				if (el instanceof HTMLImageElement || el instanceof SVGImageElement || el instanceof HTMLVideoElement || el instanceof HTMLCanvasElement) {
					return `${describe(el)}, image ${el.currentSrc ?? el.href?.baseVal ?? ``}`;
				}

				const paints = [
					computed.backgroundImage !== `none` && `background ${cssPaint(computed.backgroundImage)}`,
					!transparent(computed.backgroundColor) && `background-color ${hex(computed.backgroundColor)}`,
				].filter(Boolean);

				if (paints.length) return `${describe(el)}, ${paints.join(` over `)}`;
			}

			return `nothing found under the text (the page background)`;
		},

		/** Open everything that hides content behind an interaction, so axe can check it */
		expandAll() {
			document.querySelectorAll(`details`).forEach((details) => {
				details.open = true;
			});
		},

		/** Rough reading level of the main content (Flesch-Kincaid grade), for 3.1.5 */
		readingLevel() {
			const main = document.querySelector(`main`) ?? document.body;
			const text = main.innerText.replace(/\s+/g, ` `).trim();
			const sentences = Math.max(1, (text.match(/[.!?]+(\s|$)/g) ?? []).length);
			const words = text.match(/[A-Za-z]+(?:'[a-z]+)?/g) ?? [];
			const syllables = words.reduce((sum, word) => {
				const groups = word.toLowerCase().replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ``).replace(/^y/, ``).match(/[aeiouy]{1,2}/g);

				return sum + Math.max(1, groups?.length ?? 1);
			}, 0);

			if (words.length < 100) return null;

			return {
				words: words.length,
				grade: Math.round((0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59) * 10) / 10,
			};
		},

		/** Abbreviations with no expansion on the page, for 3.1.4 */
		abbreviations() {
			const main = document.querySelector(`main`) ?? document.body;
			const expanded = new Set([...document.querySelectorAll(`abbr[title]`)].map((el) => el.textContent.trim()));
			// textContent, not innerText: `text-transform: uppercase` isn't an abbreviation
			const text = main.textContent;
			const found = new Set(text.match(/\b[A-Z][A-Z0-9]{1,}s?\b/g) ?? []);

			// "Accessible Rich Internet Applications (ARIA)" also counts as expanding it
			return [...found].filter((abbr) => !expanded.has(abbr) && !new RegExp(`\\(${abbr}\\)`).test(text)).sort();
		},
	};
};

/** Add axe-core and the checks above to the page (again after every navigation) */
export const install = async (page) => {
	await injectAxe(page);

	if (await page.evaluate(() => Boolean(window.__a11y))) return;

	await page.addScriptTag({ content: `window.__a11y = (${helpers.toString()})();` });
};

export default install;
