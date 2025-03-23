export {}
/*
+ попробуй на этом api сделать следующее:
1. вводишь текст
2. если есть такая категория, ищешь шутку в этой категории
3. если такой категории нет, ищешь шутку по текстовому поиску
*/

const findCategoryJoke = async (category: string): Promise<string>  => {
	const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
	const json = await response.json()
	const { value } = json as { value: string}
	return value
}

const chuckNorrisJokes = async (input: string): Promise<string> => {
	const searchCategory = await findCategoryJoke(input)
	if (searchCategory.includes(input)) {
		return findCategoryJoke(input)
	} else {
		throw Error("такой категории нет, попытайтесь ввести другую")
	}
}

chuckNorrisJokes('animal')
	.then( joke => console.log("🚀 ~ joke:", joke))
	.catch( error => console.log("🚀 ~ error:", error))