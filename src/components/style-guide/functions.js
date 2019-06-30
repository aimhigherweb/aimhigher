const calculateColours = colours => {
	let colourTheme = {
		primary: {
			main: colours.primary.main,
		},
		secondary: {
			main: colours.primary.main,
		},
		neutral: {
			main: colours.primary.main,
		},
	}

	for (let key in colours) {
		const hexToRgb = function(str) {
				if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/gi.test(str)) {
					let hex = str.substr(1)
					hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex
					let rgb = parseInt(hex, 16)
					return [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255]
				}

				return false
			},
			rgbToHex = (r, g, b) =>
				'#' +
				[r, g, b]
					.map(x => {
						const hex = x.toString(16)
						return hex.length === 1 ? '0' + hex : hex
					})
					.join('')

		let colourMain = hexToRgb(colours[key]),
			convert = function(rgb, opacity, variant) {
				let r = [],
					colour

				if (variant === 'light') {
					colour = 255
				} else if (variant === 'dark') {
					colour = 0
				}

				for (let i = 0; i < 3; i++) {
					r[i] = Math.round(opacity * rgb[i] + (1 - opacity) * colour)
				}

				return r
			},
			luminanace = function(r, g, b) {
				let a = [r, g, b].map(function(v) {
					v /= 255
					return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
				})
				return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
			}

		colours[key] = {
			main: {
				name: 'main',
				rgb: colourMain,
			},
			light: {
				90: {
					name: '90',
					rgb: convert(colourMain, 0.9, 'light'),
				},
				75: {
					name: '75',
					rgb: convert(colourMain, 0.75, 'light'),
				},
				50: {
					name: '50',
					rgb: convert(colourMain, 0.5, 'light'),
				},
				25: {
					name: '25',
					rgb: convert(colourMain, 0.25, 'light'),
				},
				10: {
					name: '10',
					rgb: convert(colourMain, 0.1, 'light'),
				},
			},
			dark: {
				90: {
					name: '90',
					rgb: convert(colourMain, 0.9, 'dark'),
				},
				75: {
					name: '75',
					rgb: convert(colourMain, 0.75, 'dark'),
				},
				50: {
					name: '50',
					rgb: convert(colourMain, 0.5, 'dark'),
				},
				25: {
					name: '25',
					rgb: convert(colourMain, 0.25, 'dark'),
				},
				10: {
					name: '10',
					rgb: convert(colourMain, 0.1, 'dark'),
				},
			},
		}

		for (let cols in colours[key]) {
			let a11yPoint = 100

			if (colours[key][cols] === colours[key].main) {
				let rgbVal = [colours[key][cols].rgb[0], colours[key][cols].rgb[1], colours[key][cols].rgb[2]]

				colours[key][cols].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2])
				colourTheme[key][cols] = colours[key][cols].hex

				colours[key][cols].variant = rgbVal[0] * 0.299 + rgbVal[1] * 0.587 + rgbVal[2] * 0.114

				if (colours[key][cols].variant >= a11yPoint) {
					colours[key][cols].ratio = (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05) / (luminanace(0, 0, 0) + 0.05)
				} else {
					colours[key][cols].ratio = (luminanace(255, 255, 255) + 0.05) / (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
				}
			}

			for (let opts in colours[key][cols]) {
				if (colours[key][cols] !== colours[key].main) {
					let rgbVal = [colours[key][cols][opts].rgb[0], colours[key][cols][opts].rgb[1], colours[key][cols][opts].rgb[2]]

					colours[key][cols][opts].hex = rgbToHex(rgbVal[0], rgbVal[1], rgbVal[2])

					colours[key][cols][opts].variant = rgbVal[0] * 0.299 + rgbVal[1] * 0.587 + rgbVal[2] * 0.114

					if (colours[key][cols][opts].variant >= a11yPoint) {
						colours[key][cols][opts].ratio = (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05) / (luminanace(0, 0, 0) + 0.05)
					} else {
						colours[key][cols][opts].ratio = (luminanace(255, 255, 255) + 0.05) / (luminanace(rgbVal[0], rgbVal[1], rgbVal[2]) + 0.05)
					}
				}
			}
		}
	}
	return colours
}

export default calculateColours
