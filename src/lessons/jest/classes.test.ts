class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }
}

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('adds two numbers correctly', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });

  test('subtracts two numbers correctly', () => {
    expect(calculator.subtract(5, 2)).toBe(3);
  });
});


// Пример 2

interface User {
  id: number;
  name: string;
}

class UserRepository {
  findById(id: number): User | null {
    // В реальности — обращение к БД
    return null;
  }
}

class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserName(userId: number): string {
    const user = this.userRepository.findById(userId);
    return user ? user.name : 'Unknown';
  }
}

describe('UserService', () => {
  it('returns user name when user exists', () => {
    const mockRepository: Partial<UserRepository> = {
      findById: jest.fn().mockReturnValue({ id: 1, name: 'Alice' })
      // findById: () => ({ id: 1, name: 'Alice' })
    };


    const service = new UserService(mockRepository as UserRepository);
    expect(service.getUserName(1)).toBe('Alice');
    // expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('returns "Unknown" when user does not exist', () => {
    const mockRepository: Partial<UserRepository> = {
      findById: jest.fn().mockReturnValue(null)
    };

    const service = new UserService(mockRepository as UserRepository);
    expect(service.getUserName(999)).toBe('Unknown');
  });
});

// Пример 3

// jest.mock('../src/Database');
// import { Database } from '../src/Database';
// const MockedDatabase = Database as jest.MockedClass<typeof Database>;

// describe('UserService with mocked Database constructor', () => {
//   beforeEach(() => {
//     MockedDatabase.mockClear();
//   });

//   it('calls Database constructor and query method', () => {
//     // Подменим реализацию метода query
//     MockedDatabase.prototype.query = jest.fn().mockReturnValue('mocked result');

//     const service = new UserService();
//     const result = service.getUser();

//     expect(MockedDatabase).toHaveBeenCalledTimes(1); // конструктор был вызван
//     expect(MockedDatabase.prototype.query).toHaveBeenCalledWith('SELECT * FROM users');
//     expect(result).toBe('mocked result');
//   });
// });
