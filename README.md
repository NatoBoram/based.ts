# `based.ts`

[![GitHub Pages](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml) [![Node.js CI](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml)

A TypeScript library for working with arbitrary bases.

## Usage

```sh
pnpm i -D @natoboram/based.ts
```

```ts
import { bytesToBigInt, getRandomBytes, toBase } from "@natoboram/based.ts"

const bytes = getRandomBytes()
const bigInt = bytesToBigInt(bytes)
const base36 = toBase(bigInt, 36n)

console.log("Base 36 UUID:", base36)
```
