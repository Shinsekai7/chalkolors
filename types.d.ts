export type Formatter = (input: string | number | null | undefined) => string

export interface Colors {
	isColorSupported: boolean

	reset: Formatter
	bold: Formatter
	dim: Formatter
	italic: Formatter
	underline: Formatter
	underlineDouble: Formatter
	underlineCurly: Formatter
	underlineDotted: Formatter
	underlineDashed: Formatter
	overline: Formatter
	inverse: Formatter
	hidden: Formatter
	strikethrough: Formatter

	black: Formatter
	red: Formatter
	green: Formatter
	yellow: Formatter
	blue: Formatter
	magenta: Formatter
	cyan: Formatter
	white: Formatter
	gray: Formatter

	bgBlack: Formatter
	bgRed: Formatter
	bgGreen: Formatter
	bgYellow: Formatter
	bgBlue: Formatter
	bgMagenta: Formatter
	bgCyan: Formatter
	bgWhite: Formatter
	bgGray: Formatter

	blackBright: Formatter
	redBright: Formatter
	greenBright: Formatter
	yellowBright: Formatter
	blueBright: Formatter
	magentaBright: Formatter
	cyanBright: Formatter
	whiteBright: Formatter

	bgBlackBright: Formatter
	bgRedBright: Formatter
	bgGreenBright: Formatter
	bgYellowBright: Formatter
	bgBlueBright: Formatter
	bgMagentaBright: Formatter
	bgCyanBright: Formatter
	bgWhiteBright: Formatter

	underlineBlack: Formatter
	underlineRed: Formatter
	underlineGreen: Formatter
	underlineYellow: Formatter
	underlineBlue: Formatter
	underlineMagenta: Formatter
	underlineCyan: Formatter
	underlineWhite: Formatter
	underlineGray: Formatter

	underlineRedBright: Formatter
	underlineGreenBright: Formatter
	underlineYellowBright: Formatter
	underlineBlueBright: Formatter
	underlineMagentaBright: Formatter
	underlineCyanBright: Formatter
	underlineWhiteBright: Formatter
}
