export {} // !

const getGreetingMessage = (dayTime: number): string => {
	if (dayTime >= 6 && dayTime < 12) {
	  return 'Доброе утро'
	}
	if (dayTime >= 12 && dayTime < 18) {
	  return 'Добрый день'
	}
	if (dayTime >= 18 && dayTime < 24) {
	  return 'Добрый вечер'
	}
	return 'Здравствуйте'
}

function greet(dayTime: number = 0, name: string = ''): void {
	if (dayTime < 0 || dayTime > 24) {
		return print('Введите корректное число в 24 форммате(0-24)')
	}

	const greeting = getGreetingMessage(dayTime)
	// const greeting = (
	// 	(dayTime >= 6 && dayTime < 12) ? 'Доброе утро' :
	// 	(dayTime >= 12 && dayTime < 18) ? 'Добрый день' :
	// 	(dayTime >= 18 && dayTime < 24) ? 'Добрый вечер' :
	// 	'Здравствуйте'
	// )
	
	if (name !== '') {
    print(`${greeting}, ${name}!`)
  } else {
    print(`${greeting}!`)
  }
}

const dayTime = +input('Введите время суток: ')
const name = input('Введите имя или нажмите Enter для пустого имени: ')

greet(dayTime)
