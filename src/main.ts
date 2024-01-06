#!/usr/bin/env node

import { base36Uuid } from "./base36-uuid.js"

const uuid = base36Uuid()
console.log("Base 36 UUID:", uuid)
