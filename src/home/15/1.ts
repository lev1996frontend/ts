/*
  Задание 2: журнал

Нужно создать систему для хранения оценок студентов с Map, где ключами будут объекты студентов (например, { name: string }), а значениями - их оценки по предметам. Нужны функции:
 -   добавить/обновить оценку для студента
 -   получить оценки студента по имени
 -   получить всех студентов, у которых средняя оценка больше 4
*/

type Student = {
	name: string
}

type Grades = {
	[predmet: string]: number
}

class MagazineGrades {
	// readonly #list: Map<Student, Grades>
	// constructor() {
	// 	this.#list = new Map()
	// }
	readonly #list = new Map<Student, Grades>

	addGrade(student: Student, predmet: string, grade: number): void {
		const settingValue = this.#list.get(student) ?? {}
		settingValue[predmet] = grade
		if (!this.#list.has(student)) {
			this.#list.set(student, settingValue)
		}
	}
	
	getGradeName(studentName: string): Grades | null {
		for (const [student, grades] of this.#list) {
			if (student.name === studentName) {
				return grades
			}
		}
		return null
	}

	getBestStudents(): Set<Student> {
		const bestStudents = new Set<Student>()

		for (const [student, grades] of this.#list) {
			const gradesList = Object.values(grades)
			const sum = gradesList.reduce((acc, current) => acc + current, 0)
			const average = sum / gradesList.length
			if (average >= 4) {
				bestStudents.add(student)
			}
		}

		return bestStudents
	}
}
const student1 = { name: 'Alice' }
const student2 = { name: 'Bob' }

const studentsGrades = new MagazineGrades()
studentsGrades.addGrade(student1, 'math', 5)
studentsGrades.getGradeName('Alice')
studentsGrades.getBestStudents()
console.log(studentsGrades)
// studentsGrades.list.set(student1, { math: 5, english: 4 })
// studentsGrades.list.set(student2, { math: 3, english: 4 })
