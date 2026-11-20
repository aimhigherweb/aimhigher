// Contrast of a foreground colour against every point of a CSS gradient background.
// axe can't check text on gradients (it reports them as "incomplete"), so this walks the gradient's
// colour line, works out the contrast at each point and finds the weakest one.
//
// The colour line is interpolated in sRGB, as browsers do for hex/rgb() stops. The gradient's angle or
// shape isn't used: every point on the line is checked, as if text could sit anywhere on it.

/** WCAG contrast minimums: 1.4.3 (AA) and 1.4.6 (AAA), for normal and large text */
export const thresholds = {
	AA: { normal: 4.5, large: 3 },
	AAA: { normal: 7, large: 4.5 },
};

/** How many points along the gradient to check (plus every stop) */
const samples = 2000;

const named = {
	black: `#000000`,
	white: `#ffffff`,
	transparent: `#00000000`,
};

/**
 * Parse a colour into [r, g, b, a] (0–255 for channels, 0–1 for alpha).
 * Takes hex (#rgb, #rgba, #rrggbb, #rrggbbaa), rgb()/rgba() in comma or space syntax, black, white and transparent.
 */
export const parseColour = (input) => {
	const value = (named[input.trim().toLowerCase()] ?? input).trim();
	const hex = value.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i);

	if (hex) {
		const digits = hex[1].length <= 4 ? [...hex[1]].map((d) => d + d) : hex[1].match(/../g);
		const [r, g, b, a = 255] = digits.map((d) => parseInt(d, 16));

		return [r, g, b, a / 255];
	}

	const rgb = value.match(/^rgba?\(\s*([^)]+)\)$/i);

	if (rgb) {
		const parts = rgb[1].split(/\s*[,/]\s*|\s+/).filter(Boolean);

		if (parts.length === 3 || parts.length === 4) {
			const channel = (part) => (part.endsWith(`%`) ? parseFloat(part) * 2.55 : parseFloat(part));
			const alpha = parts[3] === undefined ? 1 : parts[3].endsWith(`%`) ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
			const colour = [...parts.slice(0, 3).map(channel), alpha];

			if (colour.every((n) => Number.isFinite(n))) return colour;
		}
	}

	throw new Error(`Can't read the colour "${input}" (use hex or rgb())`);
};

/** Split on commas that aren't inside brackets */
const splitTopLevel = (text) => {
	const parts = [];
	let depth = 0;
	let current = ``;

	for (const char of text) {
		if (char === `(`) depth++;
		if (char === `)`) depth--;

		if (char === `,` && depth === 0) {
			parts.push(current.trim());
			current = ``;
		}
		else {
			current += char;
		}
	}

	parts.push(current.trim());

	return parts;
};

/**
 * Parse a CSS gradient (linear, radial or conic, repeating or not) into colour stops
 * with every position filled in, as fractions of the gradient line.
 */
export const parseGradient = (input) => {
	const match = input.trim().replace(/;$/, ``).match(/^(?:repeating-)?(?:linear|radial|conic)-gradient\(([\s\S]*)\)$/i);

	if (!match) throw new Error(`Can't read the gradient "${input}"`);

	const stops = [];
	const parts = splitTopLevel(match[1]);

	// The first part can be the direction or shape (`138deg`, `to right`, `circle at center`, `from 90deg`)
	if (/^(to\s|from\s|at\s|circle|ellipse|closest|farthest|in\s|-?[\d.]+(deg|grad|rad|turn|px|em|rem|%)?(\s|$))/i.test(parts[0])) parts.shift();

	for (const part of parts) {
		// The colour is the function or word at the start; anything after it is one or two positions
		const colour = part.match(/^(#[\da-f]+|rgba?\([^)]*\)|[a-z]+)\s*(.*)$/i);

		if (!colour || !/^(#|rgb|black$|white$|transparent$)/i.test(colour[1])) {
			// A lone position between stops is a colour hint, which moves the midpoint; not supported
			throw new Error(`Can't read the colour stop "${part}" (use hex or rgb() colours, with % positions)`);
		}

		const rgba = parseColour(colour[1]);
		const positions = colour[2].split(/\s+/).filter(Boolean).map((position) => {
			if (!position.endsWith(`%`)) throw new Error(`Stop positions need to be percentages, got "${position}"`);

			return parseFloat(position) / 100;
		});

		if (!positions.length) stops.push({ colour: rgba, position: null });
		for (const position of positions) stops.push({ colour: rgba, position });
	}

	if (stops.length < 2) throw new Error(`A gradient needs at least two colour stops`);

	// Fill in missing positions as the spec does: ends default to 0% and 100%,
	// a stop can't come before the one ahead of it, and runs without positions are spread evenly
	if (stops[0].position === null) stops[0].position = 0;
	if (stops.at(-1).position === null) stops.at(-1).position = 1;

	let max = stops[0].position;

	for (const stop of stops) {
		if (stop.position !== null) {
			stop.position = Math.max(stop.position, max);
			max = stop.position;
		}
	}

	for (let i = 1; i < stops.length; i++) {
		if (stops[i].position !== null) continue;

		let end = i;

		while (stops[end].position === null) end++;

		const start = stops[i - 1].position;
		const step = (stops[end].position - start) / (end - i + 1);

		for (let j = i; j < end; j++) stops[j].position = start + step * (j - i + 1);
	}

	return stops;
};

/** Colour at a point (0–1) on the gradient line */
export const colourAt = (stops, t) => {
	if (t <= stops[0].position) return stops[0].colour;
	if (t >= stops.at(-1).position) return stops.at(-1).colour;

	const next = stops.findIndex((stop) => stop.position > t);
	const a = stops[next - 1];
	const b = stops[next];
	const mix = (t - a.position) / (b.position - a.position);

	return a.colour.map((channel, i) => channel + (b.colour[i] - channel) * mix);
};

/** Flatten a translucent colour onto what's behind it */
const composite = ([r, g, b, a], [br, bg, bb]) => [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a)];

export const luminance = ([r, g, b]) => {
	const [lr, lg, lb] = [r, g, b].map((value) => {
		const c = value / 255;

		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});

	return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
};

export const contrast = (a, b) => {
	const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);

	return (high + 0.05) / (low + 0.05);
};

export const toHex = (colour) => `#${colour.slice(0, 3).map((c) => Math.round(c).toString(16).padStart(2, `0`)).join(``)}`;

/**
 * Check a foreground colour against every point of a gradient.
 *
 * @param {string} gradient CSS gradient, e.g. `linear-gradient(138deg, #009DEE 18.9%, #00A5B3 82.35%)`
 * @param {string} foreground text colour
 * @param {object} [options]
 * @param {string} [options.backdrop] what translucent stops (and a translucent foreground) sit on; white by default
 * @param {number[]} [options.points] positions (0–1) to report, as well as each stop and the weakest point
 * @returns {{ stops, points, weakest, strongest, passes }} `passes` is keyed by level then text size
 */
export const checkGradient = (gradient, foreground, { backdrop = `#ffffff`, points = [0, 0.25, 0.5, 0.75, 1] } = {}) => {
	const stops = parseGradient(gradient);
	const base = composite(parseColour(backdrop), [255, 255, 255]);
	const at = (position) => {
		const background = composite(colourAt(stops, position), base);
		const text = composite(parseColour(foreground), background);

		return { position, colour: toHex(background), ratio: contrast(text, background) };
	};

	// Every stop, plus evenly spaced points between them; then a finer pass around the weakest
	const positions = [...stops.map(({ position }) => position), ...Array.from({ length: samples + 1 }, (_, i) => i / samples)];
	let checked = positions.map(at);
	const coarse = checked.reduce((low, point) => (point.ratio < low.ratio ? point : low));

	checked = checked.concat(Array.from({ length: 201 }, (_, i) => at(Math.min(1, Math.max(0, coarse.position + (i - 100) / samples / 100)))));

	const weakest = checked.reduce((low, point) => (point.ratio < low.ratio ? point : low));
	const strongest = checked.reduce((high, point) => (point.ratio > high.ratio ? point : high));

	return {
		foreground: toHex(composite(parseColour(foreground), composite(colourAt(stops, weakest.position), base))),
		stops: stops.map(({ position }) => at(position)),
		points: points.map(at),
		weakest,
		strongest,
		passes: Object.fromEntries(Object.entries(thresholds).map(([level, sizes]) => [
			level,
			Object.fromEntries(Object.entries(sizes).map(([size, min]) => [size, weakest.ratio >= min])),
		])),
	};
};
