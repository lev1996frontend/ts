export {}
// Телефонный справочник (ЧЕРЕЗ СОПОСТАВЛЕНИЯ)
// Написать программу, которая позволяет сохранять контакты, включая имя, телефон и комментарий.
// Нужно добавить возможность:
// - добавлять, редактировать и удалять контакты
// - просматривать список контактов (сортировать по имени)
// - просматривать контакты по одному (проличтывать вперёд и назад)
// - искать контакт по имени или телефону

type Contact = {
	name: string
	phone: number
	comment?: string
}

type ContactsList = Record<string, Contact>

const contacts: ContactsList = {
  '793131123': {
    name: 'Petya',
    phone: 793131123,
    comment: 'friend',
  },
  '793131456': {
    name: 'Vasya',
    phone: 793131456,
    comment: 'colleague',
  },
  '793131789': {
    name: 'Masha',
    phone: 793131789,
    comment: 'sister',
  },
  '793131012': {
    name: 'Ivan',
    phone: 793131012,
    comment: 'neighbor',
  },
  '793131345': {
    name: 'Oleg',
    phone: 793131345,
    comment: 'teacher',
  },
}

const addContacts = (contacts: ContactsList) => {
	const phone = +input('Телефон: ')
	
	if (contacts[phone]) {
		return print(`${phone} уже существует`)
	}

	const name = input('Имя: ')
	
	const comment = input('Комментарий: ') || undefined
	
	contacts[phone] = {
		name,
		phone,
		comment,
	}
}

const printContact = (contact: Contact) => {
	// const contactArr = Object.fromEntries(contact)
	
	print(`Контакт: ${contact.name}`)
	print(`Телефон: ${contact.phone}`)
	if (contact.comment) {
		print(`Комментарий: ${contact.comment}`)
	} 
}

/*
	Контакт
	- редактировать (имя, телефон, комментарий)
	- удалить
	- назад

	имя: Петя
	телефон: 123
	комментарий: (если есть)
*/
const contactMenu = (contact: Contact, contactsList: ContactsList) => {
	while(true) {
		console.clear()
		printContact(contact)
		print()
		print('Редактировать (1 Имя, 2 Телефон, 3 Комментарий)')
		print('4. Удалить')
		print('5. Назад')
		const commandContact = +input('Введите команду: ')
		if(commandContact === 1) {
			const newName = input('Напишите новое имя: ')
			if(newName !== '') {
				contact.name = newName
			} else {
				print(`Имя не может быть пустым`)
			}
		} else if (commandContact === 2) {
			const newPhone = +input('Напишите новый номер: ')
			if (contactsList[newPhone]) {
				print(`${contact.phone} уже есть в контактах`)
			} else {
				contact.phone = newPhone
			}
		} else if(commandContact === 3) {
			const newComment = input('Напишите новый комментарий: ')
			contact.comment = newComment || undefined
		} else if (commandContact === 4) {
			const inputDeleteContact = +input('Удалить контакт (1 - подтвердить): ')
			if (inputDeleteContact === 1) {
				delete contactsList[contact.phone]
			}
		} else {
			return
		}
	}
}

const findContacts = (contacts: ContactsList) => {
	const inputFindNumber = +input('Введите номер телефона, по которому можно найти контакт: ')
	const foundContact = contacts[inputFindNumber]
	if (foundContact) {
		contactMenu(foundContact, contacts)
	} else {
		print('Такого контакта нет')
		const inputName = input('Введите имя контакта: ')
		const foundInputContact = Object.values(contacts)
				.filter((person) => person.name.includes(inputName))
		if(foundInputContact.length > 0) {
			print(`Найденные контакты с именем ${inputName}: `)
			foundInputContact.forEach((name, i) => {
				print(`${i + 1}. ${name}, телефон: ${name.phone}`)
			})
			const choiseIndex = +input('Ведите цифру контакта, чтобы его посмотреть: ') - 1
			if(choiseIndex > 0 && choiseIndex < foundInputContact.length) {
				const choiseContact = foundInputContact[choiseIndex]
				if(choiseContact){
					contactMenu(choiseContact, contacts)
				}
			} else {
				print('Введите ещё раз')
			}
		} else {
			print('Такого контакта нет!')
		}
	}
}

const listContacts = (contacts: ContactsList) => {
	console.clear()
	let viewContactIndex = 0
	const objContacts = Object.values(contacts)
	while(true) {
		let viewContact = contacts[viewContactIndex]!
		printContact(viewContact)
		const inputList = +input('menu: 1. выбрать 2. следующий 3. предыдущий 0. главное меню: ')
		if(inputList === 1) {
			contactMenu(viewContact, contacts)
		} else if (inputList === 2) {
			if(viewContactIndex < objContacts.length - 1) {
				console.clear()
				viewContactIndex++
				printContact(viewContact)
			} else {
				print('Это последний контакт')
			}
		} else if (inputList === 3) {
			console.clear()
			if(viewContactIndex > 0) {
				viewContactIndex--
				printContact(viewContact)
			} else {
				print('Это самый первый контакт')
			}
		} else if (inputList === 0){
			return
		}
	}
}

/*
	Главное менюывфайуцк
	- новый контакт
	- просмотреть контакты -> Контакт
	- список контактов -> Контакт
	- поиск -> Контакт
	- выйти
*/
const mainMenu = (contacts: ContactsList) => {
	while(true) {
		console.clear()
		print('Главное меню')
		print('1. новый контакт')
		print('2. просмотреть контакты')
		print('3. найти контакт')
		print('0. выйти')

		const command = +input()
		
		if (command === 1) {
			addContacts(contacts)
		} else if(command === 2) {
			listContacts(contacts)
		} else if (command === 3) {
			findContacts(contacts)
		}
		else if (command === 0) {
			return
		}
	}
}

mainMenu(contacts)
