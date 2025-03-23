export {}
import fs from 'node:fs'
import path from 'node:path'
/*
  1. Подпись
Прочитать файл text.txt с любым текстом. Дописать в конец строку "(c) Лев" и сохранить в новый файл.
*/

const file = fs.readFileSync(path.resolve(__dirname, '../../lessons/test.txt')).toString()
const text = file + "\n(c) Лев"
fs.writeFileSync(path.resolve(__dirname, 'newText.txt'), text)
console.log(text)
