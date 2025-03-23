/*
- создать 2 животных (кот и собака), придумать им клички, научить команде "голос"
- создать функцию, которая принимает животное и даёт ему кманду "голос"
(показывать на экране - кто и что сказал)
*/ 

export type Choice = 'cat' | 'dog'

export type Command = 'eat' | 'voice' | 'sleep'

export const inputAnimal = (): Choice => {
	while(true) {
		const animals = input('Выберите кошку или собаку(cat/dog): ')
		if (animals === 'cat') {
			return 'cat'
		} else if (animals === 'dog') {
			return 'dog'
		} else {
			print('Введите правильно значение')
		}
	}
}

export const inputCommand = (): Command => {
	while(true) {
		const commanded = input('Введите команду покормить/голос/спать(eat/voice/sleep): ')

		if (
			commanded === 'eat'
			|| commanded === 'voice'
			|| commanded === 'sleep'
		) {
			return commanded
		}
		
		print('введите правильно команду!')
	}
}
