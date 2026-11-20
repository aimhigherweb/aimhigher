// 2.4.13 Focus Appearance (AAA), measured from pixels rather than CSS:
// the focus indicator must change an area at least as big as a 2 CSS px thick perimeter of the
// component, and those pixels must have at least 3:1 contrast between the focused and unfocused states.
import { PNG } from 'pngjs';

/** How far outside the element to look for its indicator (outlines usually sit outside the box) */
const margin = 8;

const luminance = (r, g, b) => {
	const [lr, lg, lb] = [r, g, b].map((value) => {
		const c = value / 255;

		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

const contrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

/** Region of the page to compare, clamped to the page */
export const clipFor = (box, page) => {
	const x = Math.max(0, Math.floor(box.x - margin));
	const y = Math.max(0, Math.floor(box.y - margin));

	return {
		x,
		y,
		width: Math.max(1, Math.min(page.width - x, Math.ceil(box.width + margin * 2))),
		height: Math.max(1, Math.min(page.height - y, Math.ceil(box.height + margin * 2))),
	};
};

/**
 * Compare the unfocused page (a full-page PNG) with a focused clip of it.
 * Returns the indicator's area (in CSS px²) and the area 2.4.13 requires.
 */
export const measureIndicator = ({ baseline, focused, clip, box, scale = 1 }) => {
	const base = PNG.sync.read(baseline);
	const shot = PNG.sync.read(focused);
	let changed = 0;
	let contrasting = 0;

	for (let y = 0; y < shot.height; y++) {
		for (let x = 0; x < shot.width; x++) {
			const bx = Math.round(clip.x * scale) + x;
			const by = Math.round(clip.y * scale) + y;

			if (bx >= base.width || by >= base.height) continue;

			const i = (y * shot.width + x) * 4;
			const j = (by * base.width + bx) * 4;
			const before = [base.data[j], base.data[j + 1], base.data[j + 2]];
			const after = [shot.data[i], shot.data[i + 1], shot.data[i + 2]];

			if (before.every((value, k) => value === after[k])) continue;

			changed++;

			if (contrast(luminance(...before), luminance(...after)) >= 3) contrasting++;
		}
	}

	const px = scale * scale;

	return {
		changed: changed / px,
		contrasting: contrasting / px,
		// A 2px perimeter. WCAG's formula for a rounded rectangle: 4h + 4w − (16 − 4π)r, which is
		// 4πr for a circle and 4(w + h) for square corners
		required: (4 * (box.width + box.height)) - ((16 - (4 * Math.PI)) * (box.radius ?? 0)),
	};
};
