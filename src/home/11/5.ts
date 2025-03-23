export {}
/*
5. Поиск HTML-тегов
Создать функцию, которая возвращает список HTML-тегов
<тег> - открывающий тег
</тег> - закрывающий тег
<тег/> - одиночный тег
<тег атрибут1=значение  атрибут2=значение > - тег с атрибутами (после названия тега могут быть пробелы)
<тег>СОДЕРЖИМОЕ</тег> - содержимое тега внутри открывающей и закрывающей части
Пример:
'<div><a href="link">next</a></div><br/><p>1+x<y</p>'
-> ["div", "a", "br", "p"]
*/
const strFind = '<div><a href="link">next</a></div><br/><p>1+x<y </p>'
// const findHTMLTags = (str: string) => str.match(/(?<=<)[a-z]+(?=\/>)|(?<=<)[a-z]+(?=>)|(?<=<)[a-z]+(?=\s)/g)
// const findHTMLTags = (str: string) => str.match(/(?<=<)(?<name>[a-z]+)(?=(?<single>\/)>)|(?<=<)[a-z]+(?=>)|(?<=<)[a-z]+(?=\s)/g)
const findHTMLTags = (str: string) => str.match(/(?<=<)[a-z]+(?=[^<>]*>)/g)
console.log(findHTMLTags(strFind))
