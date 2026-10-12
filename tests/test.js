/* @prettier */
let ck = require("../chalkolors.js")
let assert = require("assert")

const FMT = {
	reset: ["\x1b[0m", "\x1b[0m"],
	bold: ["\x1b[1m", "\x1b[22m", "\x1b[22m\x1b[1m"],
	dim: ["\x1b[2m", "\x1b[22m", "\x1b[22m\x1b[2m"],
	italic: ["\x1b[3m", "\x1b[23m"],
	underline: ["\x1b[4m", "\x1b[24m"],
	// Extended underline styles (`SGR 4:x` sub-parameters).
	underlineDouble: ["\x1b[4:2m", "\x1b[24m"],
	underlineCurly: ["\x1b[4:3m", "\x1b[24m"],
	underlineDotted: ["\x1b[4:4m", "\x1b[24m"],
	underlineDashed: ["\x1b[4:5m", "\x1b[24m"],
	overline: ["\x1b[53m", "\x1b[55m"],
	inverse: ["\x1b[7m", "\x1b[27m"],
	hidden: ["\x1b[8m", "\x1b[28m"],
	strikethrough: ["\x1b[9m", "\x1b[29m"],

	black: ["\x1b[30m", "\x1b[39m"],
	red: ["\x1b[31m", "\x1b[39m"],
	green: ["\x1b[32m", "\x1b[39m"],
	yellow: ["\x1b[33m", "\x1b[39m"],
	blue: ["\x1b[34m", "\x1b[39m"],
	magenta: ["\x1b[35m", "\x1b[39m"],
	cyan: ["\x1b[36m", "\x1b[39m"],
	white: ["\x1b[37m", "\x1b[39m"],
	gray: ["\x1b[90m", "\x1b[39m"],

	bgBlack: ["\x1b[40m", "\x1b[49m"],
	bgRed: ["\x1b[41m", "\x1b[49m"],
	bgGreen: ["\x1b[42m", "\x1b[49m"],
	bgYellow: ["\x1b[43m", "\x1b[49m"],
	bgBlue: ["\x1b[44m", "\x1b[49m"],
	bgMagenta: ["\x1b[45m", "\x1b[49m"],
	bgCyan: ["\x1b[46m", "\x1b[49m"],
	bgWhite: ["\x1b[47m", "\x1b[49m"],
	bgGray: ["\x1b[100m", "\x1b[49m"],

	blackBright: ["\x1b[90m", "\x1b[39m"],
	redBright: ["\x1b[91m", "\x1b[39m"],
	greenBright: ["\x1b[92m", "\x1b[39m"],
	yellowBright: ["\x1b[93m", "\x1b[39m"],
	blueBright: ["\x1b[94m", "\x1b[39m"],
	magentaBright: ["\x1b[95m", "\x1b[39m"],
	cyanBright: ["\x1b[96m", "\x1b[39m"],
	whiteBright: ["\x1b[97m", "\x1b[39m"],

	bgBlackBright: ["\x1b[100m", "\x1b[49m"],
	bgRedBright: ["\x1b[101m", "\x1b[49m"],
	bgGreenBright: ["\x1b[102m", "\x1b[49m"],
	bgYellowBright: ["\x1b[103m", "\x1b[49m"],
	bgBlueBright: ["\x1b[104m", "\x1b[49m"],
	bgMagentaBright: ["\x1b[105m", "\x1b[49m"],
	bgCyanBright: ["\x1b[106m", "\x1b[49m"],
	bgWhiteBright: ["\x1b[107m", "\x1b[49m"],

	// Underline color (`SGR 58`/`59`). It has no basic 16-color form, so the palette index is used.
	underlineBlack: ["\x1b[58;5;0m", "\x1b[59m"],
	underlineRed: ["\x1b[58;5;1m", "\x1b[59m"],
	underlineGreen: ["\x1b[58;5;2m", "\x1b[59m"],
	underlineYellow: ["\x1b[58;5;3m", "\x1b[59m"],
	underlineBlue: ["\x1b[58;5;4m", "\x1b[59m"],
	underlineMagenta: ["\x1b[58;5;5m", "\x1b[59m"],
	underlineCyan: ["\x1b[58;5;6m", "\x1b[59m"],
	underlineWhite: ["\x1b[58;5;7m", "\x1b[59m"],
	underlineGray: ["\x1b[58;5;8m", "\x1b[59m"],

	underlineRedBright: ["\x1b[58;5;9m", "\x1b[59m"],
	underlineGreenBright: ["\x1b[58;5;10m", "\x1b[59m"],
	underlineYellowBright: ["\x1b[58;5;11m", "\x1b[59m"],
	underlineBlueBright: ["\x1b[58;5;12m", "\x1b[59m"],
	underlineMagentaBright: ["\x1b[58;5;13m", "\x1b[59m"],
	underlineCyanBright: ["\x1b[58;5;14m", "\x1b[59m"],
	underlineWhiteBright: ["\x1b[58;5;15m", "\x1b[59m"],
}

test("color matching", () => {
	for (let format in FMT) {
		assert.equal(ck[format]("string"), FMT[format][0] + "string" + FMT[format][1])
		let output = "testing: " + format
		if (format.startsWith("underline") && !["underline", "underlineDouble", "underlineCurly", "underlineDotted", "underlineDashed"].includes(format)) {
			output = ck.underline(output)
		}
		console.log(ck[format](output))
	}
})

test("format/color nesting", () => {
	assert.equal(
		ck.bold(`BOLD ${ck.red(`RED ${ck.dim("DIM")} RED`)} BOLD`),
		FMT.bold[0] +
			"BOLD " +
			FMT.red[0] +
			"RED " +
			FMT.dim[0] +
			"DIM" +
			FMT.dim[1] +
			FMT.bold[0] +
			" RED" +
			FMT.red[1] +
			" BOLD" +
			FMT.bold[1]
	)
})

test("proper wrapping", () => {
	assert.equal(
		ck.red(ck.bold("==TEST==")),
		FMT.red[0] + FMT.bold[0] + "==TEST==" + FMT.bold[1] + FMT.red[1]
	)
})

test("complex case of wrapping", () => {
	assert.equal(
		ck.bold(ck.yellow(ck.bgRed(ck.italic("==TEST==")))),
		FMT.bold[0] +
			FMT.yellow[0] +
			FMT.bgRed[0] +
			FMT.italic[0] +
			"==TEST==" +
			FMT.italic[1] +
			FMT.bgRed[1] +
			FMT.yellow[1] +
			FMT.bold[1]
	)

	assert.equal(
		ck.cyan(ck.bold(ck.underline("==TEST=="))),
		FMT.cyan[0] +
			FMT.bold[0] +
			FMT.underline[0] +
			"==TEST==" +
			FMT.underline[1] +
			FMT.bold[1] +
			FMT.cyan[1]
	)
})

test("close sequence replacement", () => {
	assert.equal(
		ck.red(`foo ${ck.yellow("bar")} baz`),
		FMT.red[0] + "foo " + FMT.yellow[0] + "bar" + FMT.red[0] + " baz" + FMT.red[1]
	)

	assert.equal(
		ck.bold(`foo ${ck.red(ck.dim("bar"))} baz`),
		FMT.bold[0] +
			"foo " +
			FMT.red[0] +
			FMT.dim[0] +
			"bar" +
			FMT.dim[1] +
			FMT.bold[0] +
			FMT.red[1] +
			" baz" +
			FMT.bold[1]
	)

	assert.equal(
		ck.yellow(`foo ${ck.red(ck.bold("red"))} bar ${ck.cyan("cyan")} baz`),
		FMT.yellow[0] +
			"foo " +
			FMT.red[0] +
			FMT.bold[0] +
			"red" +
			FMT.bold[1] +
			FMT.yellow[0] +
			" bar " +
			FMT.cyan[0] +
			"cyan" +
			FMT.yellow[0] +
			" baz" +
			FMT.yellow[1]
	)
})

test("non-string input", () => {
	assert.equal(ck.red(), FMT.red[0] + "undefined" + FMT.red[1])
	assert.equal(ck.red(undefined), FMT.red[0] + "undefined" + FMT.red[1])
	assert.equal(ck.red(0), FMT.red[0] + "0" + FMT.red[1])
	assert.equal(ck.red(NaN), FMT.red[0] + "NaN" + FMT.red[1])
	assert.equal(ck.red(null), FMT.red[0] + "null" + FMT.red[1])
	assert.equal(ck.red(true), FMT.red[0] + "true" + FMT.red[1])
	assert.equal(ck.red(false), FMT.red[0] + "false" + FMT.red[1])
	assert.equal(ck.red(Infinity), FMT.red[0] + "Infinity" + FMT.red[1])
})

test("shouldn't overflow when coloring already colored large text", () => {
	try {
		ck.blue(ck.red("x").repeat(10000))
		assert(true)
	} catch (error) {
		console.error(error)
		assert(false)
	}
})

function test(name, fn) {
	try {
		fn()
		console.log(ck.green("✓ " + name))
	} catch (error) {
		console.log(ck.red("✗ " + name))
		throw error
	}
}
