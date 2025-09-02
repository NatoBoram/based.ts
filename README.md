# [`@natoboram/based.ts`](https://github.com/NatoBoram/based.ts)

[![Node.js CI](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml) [![GitHub Pages](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml) [![GitHub Downloads](https://img.shields.io/github/downloads/NatoBoram/based.ts/total?logo=github)](https://github.com/NatoBoram/based.ts/releases) [![NPM Downloads](https://img.shields.io/npm/dt/%40natoboram/based.ts?logo=npm)](https://www.npmjs.com/package/@natoboram/based.ts) [![Dependabot Updates](https://github.com/NatoBoram/based.ts/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/dependabot/dependabot-updates) [![Wakapi](https://wakapi.dev/api/badge/NatoBoram/interval:any/project:based.ts)](https://wakapi.dev/summary?interval=any&project=based.ts) [![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/NatoBoram/based.ts?logo=CodeRabbit&logoColor=FF570A&label=CodeRabbit%20Reviews&labelColor=171717&color=FF570A)](https://github.com/NatoBoram/based.ts/pulls?q=reviewed-by%3Acoderabbitai%5Bbot%5D)

A TypeScript library for working with arbitrary bases.

## CLI

It can be installed globally if you want to convert numbers or generate UUIDs from the terminal.

```sh
pnpm install --global @natoboram/based.ts
```

```log
Usage: basedts convert [options] <number>

Convert a number from a base in a space to another base in another space

Arguments:
  number                The number to convert

Options:
  --from-base <base>    The base of the number (default: "10")
  --from-space <space>  The space of the number to convert from (default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/")
  --to-base <base>      The base to convert to (default: "10")
  --to-space <space>    The space to convert the number to (default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/")
  -h, --help            Display help for command
```

```log
Usage: basedts uuid [options]

Generate a UUID in a different base with a different space than normal UUIDs

Options:
  --base <base>    The base of the UUID to generate (default: "16")
  --space <space>  The space of the UUID to generate (default: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/")
  -h, --help       Display help for command
```

## Library

```sh
pnpm install @natoboram/based.ts
```

```ts
import { toBase, basedToBigInt } from "@natoboram/based.ts"

// Convert between two bases
const bigInt = basedToBigInt("69", 10n)
const based = toBase(bigInt, 16n)

console.log(based) // 45
```

```ts
import { Based } from "@natoboram/based.ts"

// Perform operations on numbers of different bases
const four = new Based("4", 64n)
const two = new Based("2", 16n)
const result = four.divide(two).to(10n)

console.log(result.value) // 2
```

## License

This _Source Code Form_ is subject to the terms of the **Mozilla Public License v2.0**. If a copy of the MPL was not distributed with this file, you can obtain one at <https://mozilla.org/MPL/2.0>.
