export {}

const multiplicationTable = +input('введите число от 2 до 10: ')

if (multiplicationTable >= 2 && multiplicationTable <= 10) {
  let headerCalculate = '  |'
  for (let j = 1; j <= multiplicationTable; j++) {
    headerCalculate += `${j < 10 ? `  ${j}` : ` ${j}`}`
  }
  print(headerCalculate)

	let headerString = '   '
	for (let i = 1; i <= multiplicationTable; i++) {
		headerString += '---'
	}
  print(headerString)

  for (let i = 1; i <= multiplicationTable; i++) { 
    let headerNumber = ''
    for (let j = 1; j <= multiplicationTable; j++) {
      const product = i * j
      headerNumber += (product < 10 ? `  ${product}`: ` ${product}`);
    }
    print(`${i < 10 ? ` ${i}` : `${i}`}|${headerNumber}`)
  }
  
} else {
  print('Вы ввели число не в диапазоне от 2 до 10')
}
