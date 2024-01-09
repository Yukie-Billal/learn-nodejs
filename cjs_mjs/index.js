import express from 'express'
const app = express()

import commonFn from './commonjs.cjs'

console.log(commonFn)
console.log(commonFn.module('dari ESM'))

app.listen(3000, ()=>console.log('run 3000'))
