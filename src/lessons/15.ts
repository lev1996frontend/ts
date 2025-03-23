export {}

type BaseType = {
  p1: string
  test: number
}
type BaseType2 = {
  p2: string
}

type TypeObject = BaseType & BaseType2 & {
  p3: string
}

abstract class BaseClass {
  protected p: string // = 'default value'
  constructor(p?: string) {
    this.p = p ?? 'default value'
  }

  // getClassName() {
  //   // return (this as any).__proto__constructor.name
  //   return BaseClass.name
  // }

  // abstract getClassName(): string
}
// class BaseClass2 {} // двойное наследование запрещено

// const b = new BaseClass()
class ClassObject extends BaseClass implements BaseType, BaseType2 {
  static lang = 'ru'

  p1: string
  p2: string
  readonly test: number = 0

  #id: number

  get id() {
    return this.#id
  }

  set id(newValue: number) {
    if (newValue === this.#id + 1) {
      this.#id = newValue
    } else {
      throw new Error()
    }
  }

  constructor(p?: string) {
    super(p)
    this.p
    this.p1 = ''
    this.p2 = ''
    this.#id = 1
  }

  readonly nextId = () => {
    return this.#id + 1
  }

  incId() {
    this.#id++
  }

  getClassName() {
    if (ClassObject.lang === 'ru') {
      return 'Тестовый класс'
    }
    return ClassObject.name
  }

  toString() {
    return String(this.#id)
  }

  [Symbol.iterator]() {
    const keys = Object.values(this)
    let index = 0
    return {
      next: () => {
        if (index < keys.length) {
          return { value: keys[index++], done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}



const newTypeObject = (p1 = '') => ({
  p1,
  p2: '',
  p3: '',
  test: 0,
})
const o1: TypeObject = newTypeObject()
// {
//   p1: '',
//   p2: '',
//   p3: '',
// }

const o2: ClassObject = new ClassObject()
o2.id = 2
o2.id = 3

// o2.p
// o2.id
// o2.id = 5 // Error

const { id, nextId, incId } = o2
print(id)
// o2.incId = function(this: ClassObject) {
//   this.id
// }
print(nextId()) 
// incId() // Error: this = undefined

// o2.test = 2 // Error
const o3: BaseType = o2
o3.test = 2


o2 instanceof BaseClass
// o2.__proto__.constructor


// JSON

ClassObject.lang = 'en'

print(`o2 = ${o2}`)


// Map Set

const objects = new Map<BaseClass, number>()
objects.set(o2, o2.id)
objects.has(o2)
objects.get(o2) // number | undefined
objects.clear()
objects.delete(o2)
const objectsKeys = [...objects.keys()]

for (const [key, value] of objects) {}

for (const key of o2) {
  console.log('key', key)
}

const names = new Set<string>()
names.add('Tom')
names.add('Василий')
names.add('Василий')

console.log(names.size)
console.log(names)

type Keys<T extends object> = { [K in keyof T]: K }
const keys = <T extends object>(obj: T): Keys<T> => {
  return new Proxy(obj, {
    get(target, key) {
      return key
    }
  }) as Keys<T>
}

print(keys(o2).id) // 'id'

console.log(Object.keys(o2))
