export {}

const fullMany = +input(`Введите сумму, которую не жалко: `)
const fullMonth = +input(`Введите, через сколько месяцев вы хотите их вернуть: `)

if (isFinite(fullMany) && isFinite(fullMonth) && fullMany > 0 && fullMonth > 0) {
  if (fullMonth <= 6) {
		const cashAtm = 0.1
		const result = fullMany * (fullMonth * cashAtm)
		print(`Вы получите прибыль с фиксированным процентом (10%) в размере: ${result}`)
	} 
	if (fullMonth <= 12) {
		const randomPercent = random(1, 10)
		const result = fullMany * (fullMonth * randomPercent) / 100
		print(`Вы получите прибыль со случайным процентом (${randomPercent}%), она составит: ${result}`)
	}
}