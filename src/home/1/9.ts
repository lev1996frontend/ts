export {}

const isUserLoggedIn: boolean = input(`Необходимо ответ от сервера: `) === 'true'
const userRole: string = input(`Введите свою роль: `)
const isPaidUser: boolean = input(`Пользователья является платным: `) === 'true'

if (
	isUserLoggedIn
	&& (userRole === 'admin' || userRole === 'moderator' )
	&& isPaidUser
) {
	print(`Доступ разрешён`)
} else {
	print(`Доступ запрещён`)
}
