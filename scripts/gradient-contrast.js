#!/usr/bin/env node
// Check text contrast against every point of a gradient background, and find its weakest point.
//
// usage: npm run contrast:gradient -- <gradient> <foreground> [--level AA|AAA] [--large] [--backdrop <colour>] [--json]
//   npm run contrast:gradient -- '$gradient' '$white'
//   npm run contrast:gradient -- 'linear-gradient(90deg, #009DEE, #00636B)' '#fff' --level AA --large
//
// Colours and gradients can be Sass variables from lib/styles/_variables.scss ($primary, var.$gradient).
// Exits with 1 if the weakest point fails the chosen level (AAA normal text by default, as the site targets AAA).
import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

import { checkGradient, thresholds } from '../tests/a11y/utils/gradient.js';

const { values, positionals } = parseArgs({
	allowPositionals: true,
	options: {
		level: { type: `string`, default: `AAA` },
		large: { type: `boolean`, default: false },
		backdrop: { type: `string`, default: `#ffffff` },
		json: { type: `boolean`, default: false },
		help: { type: `boolean`, short: `h`, default: false },
	},
});

if (values.help || positionals.length !== 2) {
	console.log(readFileSync(new URL(import.meta.url), `utf8`).split(`\n`).slice(1, 9).map((line) => line.replace(/^\/\/ ?/, ``)).join(`\n`));
	process.exit(values.help ? 0 : 2);
}

const level = values.level.toUpperCase();

if (!thresholds[level]) {
	console.error(`--level must be AA or AAA`);
	process.exit(2);
}

/** Sass variables, so `$primary` or `var.$gradient` can be passed instead of the value */
const variables = Object.fromEntries(
	[...readFileSync(new URL(`../lib/styles/_variables.scss`, import.meta.url), `utf8`).matchAll(/^\s*\$([\w-]+)\s*:\s*([^;]+);/gm)]
		.map(([, name, value]) => [name, value.trim()])
);

const resolve = (value, depth = 0) => {
	if (depth > 10) throw new Error(`Sass variables nest too deep in "${value}"`);

	const replaced = value.replace(/(?:[\w-]+\.)?\$([\w-]+)/g, (whole, name) => {
		if (!(name in variables)) throw new Error(`No Sass variable $${name} in lib/styles/_variables.scss`);

		return variables[name];
	});

	return replaced.includes(`$`) ? resolve(replaced, depth + 1) : replaced;
};

let result;
let gradient;
let foreground;

try {
	gradient = resolve(positionals[0]);
	foreground = resolve(positionals[1]);
	result = checkGradient(gradient, foreground, { backdrop: resolve(values.backdrop) });
}
catch (error) {
	console.error(error.message);
	process.exit(2);
}

const size = values.large ? `large` : `normal`;
const required = thresholds[level][size];
const passed = result.weakest.ratio >= required;

if (values.json) {
	console.log(JSON.stringify({ gradient, foreground, level, size, required, passed, ...result }, null, `\t`));
	process.exit(passed ? 0 : 1);
}

const tty = process.stdout.isTTY;
const paint = (code) => (text) => (tty ? `\x1b[${code}m${text}\x1b[0m` : text);
const green = paint(32);
const red = paint(31);
const dim = paint(2);
const bold = paint(1);

const swatch = (hex) => {
	if (!tty) return ``;

	const [r, g, b] = hex.match(/\w\w/g).map((d) => parseInt(d, 16));

	return `\x1b[48;2;${r};${g};${b}m    \x1b[0m `;
};

const percent = (position) => `${Number((position * 100).toFixed(2))}%`.padStart(7);
const mark = (ratio) => (ratio >= required ? green(`pass`) : red(`fail`));
const row = ({ position, colour, ratio }) => `  ${percent(position)}  ${swatch(colour)}${colour}  ${ratio.toFixed(2).padStart(5)}:1  ${mark(ratio)}`;

console.log(`${bold(`Gradient`)}    ${gradient}`);
console.log(`${bold(`Foreground`)}  ${foreground}`);
console.log(`${bold(`Needs`)}       ${required}:1 (WCAG ${level}, ${size} text)\n`);

console.log(bold(`Stops`));
result.stops.forEach((point) => console.log(row(point)));

console.log(`\n${bold(`Along the gradient`)}`);
result.points.forEach((point) => console.log(row(point)));

console.log(`\n${bold(`Weakest point`)}`);
console.log(row(result.weakest));
console.log(dim(`  strongest: ${result.strongest.ratio.toFixed(2)}:1 at ${percent(result.strongest.position).trim()} (${result.strongest.colour})`));

console.log(`\n${bold(`Weakest point against each level`)}`);

for (const [name, sizes] of Object.entries(result.passes)) {
	const cells = Object.entries(sizes).map(([textSize, ok]) => `${textSize} ${thresholds[name][textSize]}:1 ${ok ? green(`pass`) : red(`fail`)}`);

	console.log(`  ${name.padEnd(4)} ${cells.join(`   `)}`);
}

console.log(`\n${passed ? green(bold(`PASS`)) : red(bold(`FAIL`))}: weakest point is ${result.weakest.ratio.toFixed(2)}:1, needs ${required}:1`);

process.exit(passed ? 0 : 1);
