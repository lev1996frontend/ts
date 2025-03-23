export {}
import fs from 'node:fs'

/*
3. ИИ
Написать скрипт, который печатает приветствие и спрашивает, как поприветствовать в следующий раз. Текст, который введут, должен перезаписать старое приветствие прямо в скрипте, чтобы при следующем запуске выводилось уже новое приветствие. Скрипт не должен поломаться, если хакер добавит в текст кавычку)
*/

print("HI!")
const inputHello = input("Введите приветствие: ").replaceAll(`"`, `\\"`)

const script = fs.readFileSync(__filename).toString()

const newScript = script.replace(/(?<=print\(").*(?="\))/, inputHello)

fs.writeFileSync(__filename, newScript)
