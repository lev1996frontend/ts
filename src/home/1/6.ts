export {}

const userAge = +input(`Введите свой возраст: `)

const adultWebsite = (
	userAge < 18 ? 'Доступ закрыт' :
	(userAge >= 18 && userAge <= 60) ? ':)' :
	'Кажется, что вы жульник!'
)
print(adultWebsite)
