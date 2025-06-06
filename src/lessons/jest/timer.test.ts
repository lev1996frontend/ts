jest.useFakeTimers();

// Пример 1

test("delayedHello вызывает callback через указанное время", () => {
  const mockCallback = jest.fn();

  setTimeout(mockCallback, 3000);

  // Убеждаемся, что callback еще не вызван
  expect(mockCallback).not.toHaveBeenCalled();

  // Проматываем время на 3 секунды
  jest.advanceTimersByTime(3000);

  // Теперь callback должен быть вызван
  expect(mockCallback).toHaveBeenCalledTimes(1);
});

// test("delayedHello вызывает callback через указанное время", (done) => {
//   const mockCallback = jest.fn();

//   setTimeout(mockCallback, 3000);

//   // Убеждаемся, что callback еще не вызван
//   expect(mockCallback).not.toHaveBeenCalled();

//   setTimeout(() => {
//     // Теперь callback должен быть вызван
//     expect(mockCallback).toHaveBeenCalledTimes(1);
//     done(); // <- признак успешного завершения тестов
//   }, 3000)
// });

// Пример 2

export function scheduleTasks(callback: () => void): void {
  setTimeout(() => callback(), 1000);
  setTimeout(() => callback(), 2000);
  setTimeout(() => callback(), 3000);
}

test("scheduleTasks вызывает callback трижды", () => {
  const mockCallback = jest.fn();

  scheduleTasks(mockCallback);

  expect(mockCallback).not.toHaveBeenCalled();

  jest.runAllTimers(); // <- запускает обработчики всех таймеров

  expect(mockCallback).toHaveBeenCalledTimes(3);
});
