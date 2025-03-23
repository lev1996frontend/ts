export {}

type Password = number | string

const inputPassword = (): Password => {
	const keyPassword = input('Введите пароль: ')

  if (isFinite(+keyPassword)) {
		return +keyPassword
	} else {
		return keyPassword
	}
}

const passwordResult = inputPassword()

print(typeof passwordResult)

