// tests/basic-a11y_home.js
const pa11y = require(`pa11y`);
const fs = require(`file-system`);

function runTest() {
	Promise.all([
		pa11y(`http://localhost:8000`, {
			standard: `WCAG2AAA`,
			chromeLaunchConfig: {
				ignoreHTTPSErrors: false
			}
			// actions: [],
			// // screenCapture: `${__dirname}/results/basic-a11y_home_mobile.png`,
			// viewport: {
			// 	width: 320,
			// 	height: 480,
			// 	deviceScaleFactor: 2,
			// 	isMobile: true,
			// },
		}),
		// pa11y(`http://localhost:8000`, {
		// 	standard: `WCAG2AAA`,
		// 	actions: [],
		// 	// screenCapture: `${__dirname}/results/basic-a11y_home_desktop.png`,
		// 	viewport: {
		// 		width: 1280,
		// 		height: 1024,
		// 		deviceScaleFactor: 1,
		// 		isMobile: false,
		// 	},
		// }),
	]).then((results) => {
		console.log({ results });

		fs.writeFile(`tests/results/basic-a11y_home.json`, JSON.stringify(results), (err) => {
			console.log(err);
		});
	}).catch((err) => console.log(err));
}

runTest();
