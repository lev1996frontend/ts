import { 
	Animal,
	Cat, 
	Dog,
} from './animal'

import { 
	Choice,
	inputAnimal,
	inputCommand,  
} from './input'

export const startGame = () => {
	const myCat = new Cat({	name: 'Мурка'	})
	const myDog = new Dog({	name: 'Шарик'	})

	const choicedAnimal = (choice: Choice): Animal => {
		switch (choice) {
			case 'cat': return myCat
			case 'dog': return myDog
		}
	}
	
	while(true) {
		const animaleChoice = inputAnimal()
		const animal = choicedAnimal(animaleChoice)

		const command = inputCommand()
		if (command === 'eat') {
			animal.eat()
		}
		else if (command === 'voice') {
			animal.voice()
		}
		else if (command === 'sleep') {
			animal.sleep()
			if (myCat.isSleeping && myDog.isSleeping) {
				return print('Все питомцы спят')
			}
		}
		else {
			print('Такой команды не существует')
		}
	}
}
