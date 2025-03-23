export {}

const token = process.env['TOKEN'] ?? '7715677899:AAEB432MXJ2c38SEBXb8G8NjZAWxdwzZOjo'
const id = process.env['ID'] ?? '5057813537'

const sendMessage = async (message: string) => {
	const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`, 
    {
			method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: id,
				text: message,
      }),
    }
  )
  if (response.ok) {
    print('Сообщение доставлено')
  } else {
    print(`Ошибка ${response.status} "${response.statusText}"`)
  }
}

sendMessage('от тебя говном воняет, может ещё мочёй')
