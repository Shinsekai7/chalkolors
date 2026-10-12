# chalkolors

A tiny and fast library for terminal output formatting with ANSI colors.

```javascript
import ck from "chalkolors"

console.log(
  ck.green(`How are ${ck.italic(`you`)} doing?`)
)
```

- **No dependencies.**
- **1.6 times** faster than colorette and nanocolors and **2.5 times** faster than chalk on complex formatting, on par for simple calls.
- Extended underline styles (double, curly, dotted, dashed), overline and underline colors.
- Node.js v16+. Support for both CJS and ESM projects.
- TypeScript type declarations included.
- [`NO_COLOR`](https://no-color.org/) friendly.

## Install

```sh
npm install chalkolors
```

## Usage

chalkolors provides an object which includes a variety of text coloring and formatting functions.

```javascript
import ck from "chalkolors"
```

### Colors

`black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray` and bright variants `blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

```javascript
console.log(`I see a ${ck.red("red door")} and I want it painted ${ck.black("black")}`)
```

### Background colors

`bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`, `bgGray` and bright variants `bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`.

```javascript
console.log(
  ck.bgBlack(
    ck.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)
```

### Formatting

`reset`, `bold`, `dim`, `italic`, `underline`, `overline`, `inverse`, `hidden`, `strikethrough`.

```javascript
for (let task of tasks) {
  console.log(`${ck.bold(task.name)} ${ck.dim(task.durationMs + "ms")}`)
}
```

### Underline styles

`underlineDouble`, `underlineCurly`, `underlineDotted`, `underlineDashed`.

```javascript
console.log(`This word is ${ck.underlineCurly("misspeled")}`)
```

These use the `SGR 4:x` sequences. Terminals without support for them may show a plain underline or no underline at all.

### Underline colors

`underlineBlack`, `underlineRed`, `underlineGreen`, `underlineYellow`, `underlineBlue`, `underlineMagenta`, `underlineCyan`, `underlineWhite`, `underlineGray` and bright variants `underlineRedBright`, `underlineGreenBright`, `underlineYellowBright`, `underlineBlueBright`, `underlineMagentaBright`, `underlineCyanBright`, `underlineWhiteBright`.

Underline colors only change the color of the line, so combine them with an underline style:

```javascript
console.log(ck.underlineRed(ck.underlineCurly("misspeled")))
```

### Utilities

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import ck from "chalkolors"

  if (ck.isColorSupported) {
    console.log("Yay! This script can use colors and formatters")
  }
  ```

- `createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

  ```javascript
  import ck from "chalkolors"

  let { red, bgWhite } = ck.createColors(options.enableColors)
  ```

Color support is detected from the environment: `NO_COLOR` or `--no-color` disable colors; `FORCE_COLOR`, `--color`, Windows, a TTY (unless `TERM=dumb`) or `CI` enable them.

## Replacing `chalk`

1. Replace package name in import:

   ```diff
   - import chalk from 'chalk'
   + import ck from 'chalkolors'
   ```

2. Replace variable:

   ```diff
   - chalk.red(text)
   + ck.red(text)
   ```

3. Replace chains to nested calls:

   ```diff
   - chalk.red.bold(text)
   + ck.red(ck.bold(text))
   ```

4. You can use [`colorize-template`](https://github.com/usmanyunusov/colorize-template)
   to replace chalk’s tagged template literal.

   ```diff
   + import { createColorize } from 'colorize-template'

   + let colorize = createColorize(ck)
   - chalk.red.bold`full {yellow ${"text"}}`
   + colorize`{red.bold full {yellow ${"text"}}}`
   ```

## Benchmarks

Results from Node.js 24.21.0 on an Intel Core i9-10940X (Windows). Lower is better.

Complex formatting expression (nested calls):

```diff
$ node benchmarks/complex.mjs
  chalk v4        676 ns
  chalk v5        685 ns
  cli-color    15,470 ns
  ansi-colors   1,950 ns
  kleur           613 ns
  kleur/colors    526 ns
  colorette       434 ns
  nanocolors      441 ns
  yoctocolors     445 ns
+ chalkolors      269 ns
```

Simple API call:

```diff
$ node benchmarks/simple.mjs
  chalk v4       28.52 ns
  chalk v5       17.72 ns
  cli-color   1,810.00 ns
  ansi-colors   198.61 ns
  kleur          27.00 ns
  kleur/colors   20.66 ns
  colorette       4.81 ns
  nanocolors      5.14 ns
  yoctocolors     5.08 ns
+ chalkolors      5.07 ns
```

Coloring already colored large text:

```diff
$ node benchmarks/recursion.mjs
  chalk v4       63.77 µs
  chalk v5       63.70 µs
  cli-color      37.70 µs
  ansi-colors    35.34 µs
  kleur          33.34 µs
  kleur/colors   33.34 µs
  colorette      59.39 µs
  nanocolors     33.48 µs
  yoctocolors    41.97 µs
+ chalkolors     43.02 µs
```

Library loading time:

```diff
$ node benchmarks/loading.mjs
  chalk v4       1.91 µs
  chalk v5       3.17 µs
  cli-color      6.86 µs
  ansi-colors    1.16 µs
  kleur          1.10 µs
  kleur/colors   1.12 µs
  colorette      1.12 µs
  nanocolors     1.12 µs
  yoctocolors    5.87 µs
+ chalkolors     1.14 µs
```

Bundled size:

```diff
$ node benchmarks/size.mjs
  chalk v4       49.26 KB
  cli-color     138.27 KB
  ansi-colors    10.22 KB
  kleur           3.81 KB
  kleur/colors    3.06 KB
  colorette       6.04 KB
  nanocolors      5.75 KB
  yoctocolors     8.80 KB
+ chalkolors      6.29 KB
```

To run them yourself:

```sh
npm install
npm install --no-save chalk5@npm:chalk@5
node benchmarks/size.mjs
node benchmarks/loading.mjs
node benchmarks/simple.mjs
node benchmarks/complex.mjs
node benchmarks/recursion.mjs
```

## Credits

- [picocolors](https://github.com/alexeyraspopov/picocolors) by [@alexeyraspopov](https://github.com/alexeyraspopov) — chalkolors is a fork of picocolors and keeps its ISC license.
- [yoctocolors](https://github.com/sindresorhus/yoctocolors) by [@sindresorhus](https://github.com/sindresorhus) — the underline colors come from yoctocolors.

## License

ISC. The underline colors are derived from yoctocolors and are MIT licensed. See [LICENSE](LICENSE).
