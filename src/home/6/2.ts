export {}

type User = {
	name: string
	age: number
} 

type File = {
	name: string
	size: number
}

type NamedEntity = {
	name: string
}

const loudSpeakerTwo = (entity: NamedEntity) => {
  print(`${entity.name}!`)
}



const userObject: User = {
	name: 'User',
	age: 21
}

const userObject2: File = {
  name: 'User2',
  size: 1.5
}

loudSpeakerTwo(userObject)
loudSpeakerTwo(userObject2)
