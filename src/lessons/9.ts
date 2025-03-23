export {}

let storeValue = ''

function store(): string
function store(value: string): void
function store(value?: string): string | void {
  if (typeof value === 'undefined') {
    return storeValue
  }
  storeValue = value
}

store('123')
// print(store('123')) // error
print(store())


function filter<T, U extends T>(
  arr: T[], 
  callback: (value: T, index: number, array: T[]) => value is U
): U[]
function filter<T>(
  arr: T[], 
  callback: (value: T, index: number, array: T[]) => unknown
): T[]
function filter<T, U extends T>(
  arr: T[], 
  callback: (value: T, index: number, array: T[]) => unknown
): U[] {
  const result: U[] = []

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]!
    if (callback(value, i, arr)) {
      result.push(value as U)
    }
  }

  return result
}
const v1 = filter([1,2,3,1], (n) => n === 1)
const v2 = [1,2,3,1].filter((n) => n === 1)

const test = (n: unknown) => typeof n === 'string' || n === 1 || n === 2

const arr: (string | number | null | undefined | boolean)[] = [1, 'hello', 0, null, undefined, '', 'world', false];

const filtered = arr.filter(Boolean)


// Условная шаблонизация

type User = {
  name: string
  age: number
  bio?: string
}

type T1 = Partial<User>
type T2 = Required<User>

type T3 = Pick<User, 'age' | 'bio'>
type T4 = Record<keyof User, string>
type T5 = Partial<Record<keyof User, true>>

type Validator = (n: number) => boolean
type Args = Parameters<Validator>
type R = ReturnType<Validator>

type NewValidator<T> = (...args: Args) => (
  T extends void 
    ? R 
    : T | Promise<T>
)

type T6 = NewValidator<void>
type T7 = NewValidator<number>


type Conteiner<T extends string | string[]> = {
  value: T
  id: T extends string ? number : number[]
} & (
  T extends string ? { index: number } : {}
)

type T8 = Conteiner<string>
type T9 = Conteiner<string[]>



type Arr = string[]
type V = Arr[number]
