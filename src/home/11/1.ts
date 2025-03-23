export {}
/*
  1. Проверки
  Написать проверки для:
  - никнейм (содержит латинские буквы, цифры, символы _ и -)
  - ссылка
  - email (a-Z.)
  - надёжный пароль (от 8 символов, есть заглавные, строчные и цифровые символы)
  - номер телефона (может начинаться с +, кроме цивр имеет скобки, пробелы и дефисы)
*/

// nickName 'User_Name1200'
// email 'asda12as.sda@subdomain.mail2000.ru'
// link 'http://subdomain.example.com/page/12?q=search&limit=10&page=12'

const emailStr = 'asda12as.sda.sd0@mail2000.ru'
const emailPattern = /^[a-z\d]+(\.[a-z\d]+)*@[a-z\d]+\.[a-z]{2,}$/
// console.log(emailPattern.test(emailStr))

const nickName = /^[a-zA-Z]\w{3,}$/
// console.log(nickName.test('name10w'))

// const telphoneNumber = /^[\+7|8]9(\-\s\()?([0-9]{3})([\)\-\s])?([0-9]{3})([\-\s])?([0-9]{3})/
const link = /^https?:\/\/(?<domain>[a-z\d]+(\.?[a-z\d]+)*)\.(?<dns>[a-z]{2,})(\/(?<page>[a-z0-9]*))*(?<props>\?[a-z][\w]*=[\w]+(&[a-z][\w]*=[\w]+)*)$/
const lk = 'http://subdomain.example.com/page/12?q=search&limit=10&s=12'// 
console.log(link.test(lk))

// +
const password = 'aA12345678'
const passwordPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/g

const telphoneNumber = /^(\+7|8)9[\s-]?(\d{3})[\s-]?(\d{3})[\s-]?(\d{3})$/
const th = '+79-121-345-678'
// \D
