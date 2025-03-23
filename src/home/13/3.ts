export {}

/*
3. магическая дуэль
Создать функцию "cast", которая принимает текст. Этот текст нужно передавать из другой функции "battle", которая спрашивает текст у пользователя в цикле. Вызов обеих функций нужно обернуть в try/catch. 

+ На самом верхнем уровне все ошибки функции "battle" перехватываются, пишется текст "Кажется я умер..." и ошибка бросается снова. 
+ Если это была авада, даже этот текст напечататься не успеет.
+ Если в тексте написано "avada kedavra", "titillando" или "rictusempra", бросается ошибка, которая убивает программу.
+ Если написано "imperio", бросается ошибка, которую перехватит функция "battle" и ответит словом "cancel".
+ Если написано "expelliarmus", функция "cast" ответит заклинанием "fuck".
+ Если написан любой другой текст, функция "cast" повторит капсом.*/

class ForbiddenSpell extends Error {
	readonly spell: string
	constructor(spell: string) {
		super(`Запрещённое заклинание: "${spell}"`)
		this.spell = spell
	}
}

const cast = (text:string): string => {
	switch(text) {
		case 'avada kedavra': 
			throw new ForbiddenSpell('avada kedavra')
		case 'titillando': 
			throw new ForbiddenSpell('titillando')
		case 'rictusempra': 
			throw new ForbiddenSpell('rictusempra')
		case 'imperio': 
			throw new ForbiddenSpell('imperio')
		case 'expelliarmus': 
			return 'fuck'
		default: 
			return text.toUpperCase()
	}
}

const battle = () => {
	while (true) {
		try {
			const inputText = input('Ваше заклинание: ')
			const response = cast(inputText)
			print(response)
		} catch (error) {
			if (error instanceof ForbiddenSpell && error.spell === 'imperio') {
				print(error.message)
				print('Заклинание отменено!')
			} else {
				throw error
			}
		}
	}
}

const main = () => {
	try {
		battle()
	} 
	catch(error) {
		if (error instanceof ForbiddenSpell) {
			print(error.message)
			if (error.spell !== 'avada kedavra') {
				print('Кажется я умер...')
			}
		} else {
			throw error
		}
	}
}

main()
