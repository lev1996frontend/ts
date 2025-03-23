import fs from 'node:fs'
import path from 'node:path'

// const file = fs.readFileSync(__filename).toString()
// console.log(path.resolve(__dirname, '12.ts'))

// fs.writeFileSync(path.resolve(__dirname, 'test.txt'), '!!!')

// console.log(
//   fs.existsSync('package.json')
// )

// console.log(fs.readdirSync('src'))

// console.log(
//   fs.statSync('src').isDirectory()
// )

// JSON.parse()
// JSON.stringify

// const file = fs.readFileSync('package.json').toString()
// const p = JSON.parse(file)
// const name = JSON.stringify(p.name)
// console.log(p.name)

fs.writeFileSync(__filename, fs.readFileSync(__filename).toString() + '\nconsole.log(":)")')

console.log(":)")
console.log(":)")
console.log(":)")
