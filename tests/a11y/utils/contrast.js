// Text contrast measured from pixels, so it works over gradients, images and SVG shapes, where axe
// and HTML_CodeSniffer can only say "couldn't tell".
//
// The page is screenshotted with the text made invisible (only the glyphs: -webkit-text-fill-color,
// so `currentColor` borders and SVG fills don't change). Each piece of text's colour is then compared
// with every background pixel under its glyph boxes.
import { PNG } from 'pngjs';

/** Hide text without changing anything else on the page */
export const hideText = `
	*, *::before, *::after, ::placeholder {
		-webkit-text-fill-color: transparent !important;
		text-shadow: none !important;
		-webkit-text-stroke: 0 !important;
		text-decoration-color: transparent !important;
		caret-color: transparent !important;
	}
`;

/** WCAG 2.2: 1.4.6 Contrast (Enhanced) is AAA, 1.4.3 Contrast (Minimum) is AA */
export const thresholds = {
	aaa: { normal: 7, large: 4.5 },
	aa: { normal: 4.5, large: 3 },
};

/** Ignore the lowest 1% of pixels, so anti-aliased edges of shapes don't decide the result */
const percentile = 0.01;

const channel = (value) => {
	const c = value / 255;

	return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (r, g, b) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

export const hex = (r, g, b, a = 1) => `#${[r, g, b, ...(a < 1 ? [Math.round(a * 255)] : [])]
	.map((value) => Math.round(value).toString(16).padStart(2, `0`)).join(``)}`;

/** How many distinct background colours to quote for the failing pixels */
const quoted = 3;

/**
 * Contrast of each target's text against the background screenshot.
 * Returns, per target, the contrast at the worst 1% of background pixels, the single worst pixel,
 * the median, and the share of pixels below the AAA threshold. Also the colours involved: the text,
 * the background at the low and median pixels, the most common failing background colours, and where
 * the low pixel is (page px), so the caller can find what paints it.
 */
export const measureContrast = ({ background, targets, scale = 1 }) => {
	const png = PNG.sync.read(background);
	const pixel = (i) => [png.data[i], png.data[i + 1], png.data[i + 2]];

	return targets.map((target) => {
		const [fr, fg, fb, alpha] = target.color;
		const ratios = [];
		// Index into png.data of each measured pixel, alongside `ratios`
		const pixels = [];

		for (const rect of target.rects) {
			const x0 = Math.max(0, Math.floor(rect.x * scale));
			const y0 = Math.max(0, Math.floor(rect.y * scale));
			const x1 = Math.min(png.width, Math.ceil((rect.x + rect.width) * scale));
			const y1 = Math.min(png.height, Math.ceil((rect.y + rect.height) * scale));

			for (let y = y0; y < y1; y++) {
				for (let x = x0; x < x1; x++) {
					const i = (y * png.width + x) * 4;
					const [br, bg, bb] = [png.data[i], png.data[i + 1], png.data[i + 2]];
					// Semi-transparent text is blended with whatever is behind it
					const text = luminance(
						fr * alpha + br * (1 - alpha),
						fg * alpha + bg * (1 - alpha),
						fb * alpha + bb * (1 - alpha)
					);

					ratios.push(ratio(text, luminance(br, bg, bb)));
					pixels.push(i);
				}
			}
		}

		if (!ratios.length) return { ...target, measured: false };

		const order = [...ratios.keys()].sort((a, b) => ratios[a] - ratios[b]);
		const at = (rank) => order[Math.floor(rank)];
		const required = thresholds.aaa[target.large ? `large` : `normal`];
		const passing = order.findIndex((index) => ratios[index] >= required);
		const failing = passing === -1 ? order : order.slice(0, passing);
		const lowIndex = at(order.length * percentile);
		const lowPixel = pixels[lowIndex] / 4;

		// Most common failing colours, each with the contrast it gives
		const counts = new Map();

		for (const index of failing) {
			const color = hex(...pixel(pixels[index]));
			const entry = counts.get(color) ?? { color, ratio: ratios[index], count: 0 };

			entry.count++;
			counts.set(color, entry);
		}

		return {
			...target,
			measured: true,
			worst: ratios[order[0]],
			low: ratios[lowIndex],
			median: ratios[at(order.length / 2)],
			required,
			failingShare: failing.length / ratios.length,
			colors: {
				text: hex(fr, fg, fb, alpha),
				low: hex(...pixel(pixels[lowIndex])),
				median: hex(...pixel(pixels[at(order.length / 2)])),
				failing: [...counts.values()].sort((a, b) => b.count - a.count).slice(0, quoted),
			},
			lowPoint: { x: (lowPixel % png.width) / scale, y: Math.floor(lowPixel / png.width) / scale },
		};
	});
};
