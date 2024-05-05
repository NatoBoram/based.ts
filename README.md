# `based.ts`

[![Node.js CI](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml) [![GitHub Pages](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml) [![GitHub Downloads](https://img.shields.io/github/downloads/NatoBoram/based.ts/total?logo=github)](https://github.com/NatoBoram/based.ts/releases) [![NPM Downloads](https://img.shields.io/npm/dt/%40natoboram/based.ts?logo=npm)](https://www.npmjs.com/package/@natoboram/based.ts) [![Dependabot Updates](https://github.com/NatoBoram/based.ts/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/dependabot/dependabot-updates)

A TypeScript library for working with arbitrary bases.

## Installation

It can be installed globally if you want to generate base36-encoded UUIDs.

```sh
pnpm install --global @natoboram/based.ts
basedts
```

```log
Base 36 UUID: 2pcugbwbg50o24pnu8h3u1f0b
```

Proper CLI options are planned for the future, but for now that's all I needed this package for.

## Usage

```sh
pnpm i -D @natoboram/based.ts
```

```ts
import {
	basedToBigInt,
	bytesToBigInt,
	getRandomBytes,
	toBase,
} from "@natoboram/based.ts"

// Generate a base36-encoded UUID
const bytes = getRandomBytes()
const bigInt = bytesToBigInt(bytes)
const base36 = toBase(bigInt, 36n)
console.log("Base 36 UUID:", base36)

// Convert between two bases
const base64 = toBase(basedToBigInt("20zsnycqen1k898slr7xgnc9t", 36n), 64n)
```
