#!/usr/bin/env node

import { bytesToBigInt, getRandomBytes, toBase } from "./index.js"

const bytes = getRandomBytes()
const bigInt = bytesToBigInt(bytes)
const base36 = toBase(bigInt, 36n)

console.log("Base 36 UUID:", base36)
