/* @prettier */
let vm = require("vm")
let fs = require("fs")
let ck = require("../chalkolors.js")
let assert = require("assert")
let source = fs.readFileSync(__dirname + "/../chalkolors.js", "utf-8")
let CI = process.env.CI

test("ci server", () => {
	let ck = initModuleEnv({ env: { TERM: "dumb", CI: "1" } })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
})

test("arg --color", () => {
	let ck = initModuleEnv({ env: { TERM: "dumb" }, argv: ["--color"] })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
})

test("env NO_COLOR", () => {
	let ck = initModuleEnv({ env: { FORCE_COLOR: "1", NO_COLOR: "1" } })
	assert.equal(ck.isColorSupported, false)
	assert.equal(ck.red("text"), ck.createColors(false).red("text"))
})

test("env NO_COLOR empty", () => {
	let ck = initModuleEnv({ env: { NO_COLOR: "", CI } })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
})

test("env FORCE_COLOR", () => {
	let ck = initModuleEnv({ env: { TERM: "dumb", FORCE_COLOR: "1" } })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
})

test("arg --no-color", () => {
	let ck = initModuleEnv({ env: { FORCE_COLOR: "1" }, argv: ["--no-color"] })
	assert.equal(ck.isColorSupported, false)
	assert.equal(ck.red("text"), ck.createColors(false).red("text"))
})

test("no term", () => {
	let ck = initModuleEnv({ env: { TERM: "dumb" } })
	assert.equal(ck.isColorSupported, false)
	assert.equal(ck.red("text"), ck.createColors(false).red("text"))
})

test("windows", () => {
	let ck = initModuleEnv({ env: { TERM: "dumb" }, platform: "win32" })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
})

test("edge runtime", () => {
	let ck = initModuleEnv({ env: { FORCE_COLOR: "1" }, argv: undefined, require: undefined })
	assert.equal(ck.isColorSupported, true)
	assert.equal(ck.red("text"), ck.createColors(true).red("text"))
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

function initModuleEnv({
	env,
	argv = [],
	platform = "darwin",
	require = global.require,
	stdout = process.stdout,
}) {
	let process = { env, argv, platform, stdout }
	let context = vm.createContext({ require, process, module: { exports: {} } })
	let script = new vm.Script(source)
	script.runInContext(context)
	return context.module.exports
}
