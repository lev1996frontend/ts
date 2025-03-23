/*Задание 3: множества

const set1 = new Set([1, 2, 3])
const set2 = new Set([1, 2, 3, 4, 5])

Для этих множеств нужно написать функции:
- проверка на подмножество (является ли одно множество подмножеством другого)
- объединение двух множеств
- разность двух множеств
- симметрическая разность двух множеств (элементы, которые присутствуют только в одном из множеств)
*/

// const emptySubset = (mainArray: Set<number>, subset: Set<number>) => {
// 	if (mainArray.size === 0 || subset.size === 0) {
// 		throw new Error('в множестве или подмножестве нет значений')
// 	}
// }

const checkSubset = (mainArray: ReadonlySet<number>, subset: ReadonlySet<number>): boolean => {
	for (const key of subset) {
		if (!mainArray.has(key)) {
			return false
		}
	}
	return true
	// return mainArray.isSubsetOf(subset)
}

const union = (mainArray: ReadonlySet<number>, subset: ReadonlySet<number>): Set<number> => {
	// const newSubset = new Set<number>()
	// for (const key of mainArray) {
	// 	newSubset.add(key)
	// }
	// for (const key of subset) {
	// 	newSubset.add(key)
	// }
	// return newSubset
	return new Set<number>([...mainArray, ...subset])
	// return subset.union(mainArray)
} 

const differenceSubset = (mainArray: ReadonlySet<number>, subset: ReadonlySet<number>): Set<number> => {
	const newSubset = new Set<number>()
	for (const key of mainArray) {
		if (!subset.has(key)) {
			newSubset.add(key)
		}
	}
	return newSubset
	// return mainArray.difference(subset)
}

const symmetricDifference = (mainArray: ReadonlySet<number>, subset: ReadonlySet<number>): Set<number> => {
	const newSubset = new Set<number>()

	for(const key of mainArray) {
		if(!subset.has(key)) {
			newSubset.add(key)
		}
	}

	for(const key of subset) {
		if(!mainArray.has(key)) {
			newSubset.add(key)
		}
	}

	return newSubset
	// return mainArray.symmetricDifference(subset)
}

const set1 = new Set([1,2,3,4,5])
const set2 = new Set([4,5,6,7])

const checkingSubset = differenceSubset(set1,set2)
console.log(checkingSubset)
