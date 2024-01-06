# `based.ts`

[![GitHub Pages](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/github-pages.yaml) [![Node.js CI](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/based.ts/actions/workflows/node.js.yaml)

Change between bases.

## Usage

```sh
pnpm i -D @natoboram/based.ts
```

```ts
import { base36Uuid } from "@natoboram/based.ts"

const uuid = base36Uuid()
console.log("Base 36 UUID:", uuid)
```
