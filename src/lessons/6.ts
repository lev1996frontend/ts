export {}

// --- СТРУКТУРЫ ---

// структура - переменная, внутри которой хранятся другие переменные (свойства/properties)
const user = {
  name: 'Vit',
  age: 15,
} // as const

// { } - интерпретируются как объект там где передаётся значение (иначе означают блок команд)
// вместо = вложенные значения присваиваются через : (не путать с указанием типа)

// вывод на консоль
console.log(user) // debug
print(user.name) // get property
user.age = 12 // set property


// --- ПОЛЬЗОВАТЕЛЬСКИЕ ТИПЫ ---

type User = {
  name: string
  age: number
}
// type User = { } // Повторяющийся идентификатор "User"

// interface - расширяемые объекты, расширение может быть непредсказуемым
// как function - не используем, за исключением метапрограммирования
interface UserInterface {
  name: string
}
interface UserInterface {
  age: number
}
const userInterface: UserInterface = {
  // name,
  name: 'noname',
  age: 12,
}


// readonly - const property
type Card = {
  readonly id: string
  comment: string
}
const card: Card = {
  id: 'new',
  comment: '',
}
// card.id = 'old' // Ошибка
card.comment = 'shop card'



// --- ОБЪЕКТЫ И ФУНКЦИИ ---

// принять объект
const getUserInfo = (user: User) => `${user.name} (${user.age})`
print(getUserInfo(user))

// вернуть объект
const giveBirthChild = (name: string): User => {
  return {
    name: name,
    age: 0,
  }
}
const child: User = giveBirthChild('Vit')



// короткая функция
// ({...})
const quickGiveBirthChild = (name: string): User => ({
  name, // name: name,
  age: 0,
})

// Ошибка: { } воспринимаются как блок, а не как объект
// const quickGiveBirthChild2 = (name: string): User => {
//   name: name,
//   age: 0,
// }


// функции внутри объектов

const Lib = {
  printHello: (name: string) => print(`Hello, ${name}`),
  readName: () => input('What is your name? '),
}

Lib.printHello(Lib.readName())



// --- ДЕСТРУКТУРИЗАЦИЯ (распаковка) ---
// получение нескольких свойств объекта в переменные

// способ в несколько действий
const name1 = user.name
const age1 = user.age

// способ в одно действие
const {
  name: name2,
  age: age2,
} = user
console.log(name2, age2)

// то же самое, но устанавливаем значение в переменную с таким же названием, как свойство
const { name, age } = user // name, age
console.log(name, age)

/*
Для запоминания:
  - присваиваем справа налево
  - извлекаем слева направо
Или так:
  - слева всегда свойства объекта
  - справа источник или назначение
*/

// деструктуризация параметров
const userShortInfo = ({ name, age }: User) => `${name} (${age})`
userShortInfo(user)
userShortInfo({ name: 'name', age: 1 })



// --- АДРЕСАЦИЯ ---

// простые типы (копируют значение)
let str1 = 'first string'
let str2 = str1
str1 = 'other string'
str2 // 'first string'

// сложные типы (копируют ссылку на значение)
const object1 = { value: 1 }
const object2 = object1
object1.value++
object2.value // 2



// --- КЛОНИРОВАНИЕ объектов ---

const userInfo = {
  name: 'noname',
  age: 0,
  address: {
    street: 'First street',
    house: 10,
  },
  getInfo: () => {
    return userInfo.name + ': ' + userInfo.address.street
  }
}

// способ 1: деструктуризация (подходит для сопоставлений - изучим дальше)
const u1 = { ...userInfo } // клонирует свойства 1 уровня вложенности
// const u1 = {
//   name: userInfo.name,
//   age: userInfo.age,
//   address: userInfo.address,
//   getInfo: userInfo.getInfo,
// }
u1.age = 1
userInfo.age !== u1.age
// недостаток: вложенные объекты ссылаются на общее значение
u1.address.house = 2
userInfo.address.house === u1.address.house

const u11 = { ...userInfo, address: {...userInfo.address} } // решение


// способ 2: JSON (подходит для пересылки, здесь показан просто для примера)
const u3: typeof userInfo = JSON.parse(JSON.stringify(userInfo)) // глубокое клонирование свойств через JSON
u3.address.house = 3
userInfo.address.house !== u3.address.house
// недостатки
// u3.asd // u3: any
u3.getInfo === undefined // теряются свойства-функции
// и некоторые другие сюрпризы: классы (ООП), Date, Proxy ...



// способ 3: чаще используют сторонние библиотеки, которые мы посмотрим в следующих уроках
// имеются предыдущие доп сюрпризы, кроме Map, Set, Date, ...?



// --- ОБЪЕДИНЕНИЯ ТИПОВ ---

// смешанные типы

type Student = User & {
  rating: number
}

const student: Student = {
  name: user.name,
  age: user.age,
  rating: 10,
}

// более общие типы подходят частным подмножествам
getUserInfo(student) // Vit (15)
// но не наоборот
// const student2: Student = user // Ошибка: Свойство "rating" отсутствует
const student2: Student = user as Student // Риск ошибки во время выполнения
// student2.rating++ // Ошибки во время выполнения: rating === undefined

// подмножествам недоступны свойства общего типа
const person: User = student
// person.rating // Ошибка: Свойство "rating" не существует в типе "User"

const student3 = person as Student
student3.rating++

// --- ПРОВЕРКА ТИПОВ ---
// важная особенность JS: проверки типов делаются на этапе выполнения!
// не на этапе компилляции (это одновременно упрощение и усложнение)

const isStudent = (user: User): user is Student => (
  typeof (user as Student).rating === 'number'
)

if (isStudent(user)) {
  user.rating = 8 // ошибки нету
}

console.log(
  'typeof user', typeof user, // object
  'typeof null', typeof null, // object
)

// Способы проверок:
// typeof(user) === 'undefined'
// user === null

const isUser = (value: unknown): value is User => (
  typeof value === 'object'
  && value !== null // !!value
  && typeof (value as User).name === 'string'
  && typeof (value as User).age === 'number'
)

let smth = 'not user'
if (isUser(smth)) { // проверять можем абсолютно любые значения
  smth.name // здесь мы проверили, что это User, иначе сюда мы не зайдём
}




// вариативные типы

type Client = {
  company: true
  representative: User 
} | { 
  company: false
  name: string 
}

const entity: Client = {
  company: true,
  representative: user,
}

const individual: Client = {
  company: false,
  name: 'Tom',
}

const greetClient = (client: Client) => {
  if (client.company) {
    print(`Здравствуйте, ${client.representative.name}!`)
  } else {
    print(`Приветствуем, ${client.name}.`)
  }
}

greetClient(entity) // `Здравствуйте, Vit!`
greetClient(individual) // `Приветствуем, Tom.`


type Email = {
  title?: string
  message: string
}

const email: Email = {
  message: ''
}

print(`${email?.title}`) // "undefined"
print(`${email ? email.title : undefined}`) // "undefined"
print(email?.title ?? 'no title') // "no title"
