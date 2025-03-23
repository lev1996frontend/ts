import {
	printStartMessage,
	inputStartBalance,
	inputPlayerColor,
	inputBet,
	generateRandomColor,
	changeBalance,
	printMessageBalance,
	playerWantContinue,
	printFinishMessage,
} from './input'

export const startGame = () => {
	printStartMessage()
  
	const startBalance = inputStartBalance()
	let balance = startBalance

  while (true) {
		const playerColor = inputPlayerColor()
		const playerBet = inputBet(balance)
		const randomColor = generateRandomColor()
		
		balance += changeBalance(playerBet, playerColor, randomColor)
		printMessageBalance(balance)

    if (balance <= 0 || !playerWantContinue()) {
      break
    }
  }
	
	printFinishMessage(balance, startBalance)
}