// myClass.test.ts
import { MyClass } from './myClass';

jest.mock('./myClass', () => {
  return {
    MyClass: jest.fn().mockImplementation(() => {
      console.log('МОК-КОНСТРУКТОР!'); // подменили поведение
      return {
        sayHi: jest.fn(() => 'Заменённый привет!'),
      };
    }),
  };
});

test('заменённый конструктор вызывается', () => {
  const instance = new MyClass();

  expect(MyClass).toHaveBeenCalled(); // проверка вызова конструктора
  expect(instance.sayHi()).toBe('Заменённый привет!');
});
