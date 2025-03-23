export {}
/*
+ попробуй на этом api сделать следующее:
1. вводишь текст
2. если есть такая категория, ищешь шутку в этой категории
3. если такой категории нет, ищешь шутку по текстовому поиску
*/

const api = async <R>(action: string, data?: Record<string, string>): Promise<R> => {
	const url = new URL(action, `https://api.chucknorris.io/jokes/`)
	url.search = new URLSearchParams(data).toString()
	// console.log('url', url.toString())
	const response = await fetch(url)
	if (response.ok) {
		const json = await response.json()
		return json as R
	} else {
		throw new Error(`HTTP Error ${response.status}: ${url}`)
	}
}

// let categories: string[] | undefined
// const categoryExists = async (category: string): Promise<boolean> => {
// 	categories = categories ?? await api<string[]>('categories')
// 	return categories.includes(category)
// }
const categoryExists = async (category: string): Promise<boolean> => {
	const categories = await api<string[]>('categories')
	return categories.includes(category)
}
const loadJokeByCategory = async (category: string): Promise<string> => {
	const searchJokes = await api<{ value: string	}>('random', {category})
	return searchJokes.value
}
const loadJokeByQuery = async (query: string): Promise<string> => {
	const joke = await api<{ value: string	}>('search', {query})
	return joke.value
}

const start = async (): Promise<void> => {
	const inputText = input('Введите текст: ')
	await categoryExists(inputText)

	if (await categoryExists(inputText)) {
		print(await loadJokeByCategory(inputText))
	} else {
		print(await loadJokeByQuery(inputText))
	}
}

start().catch(error => print(
	error instanceof Error
		? error.message
		: error
))
// .then(() => {
// 	console.log('Конец программы')
// })
