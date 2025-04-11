import { testScript } from '../../tests'

testScript(__dirname, '9.ts', [
  {
    description: 'не авторизован',
    input: ['false', 'admin', 'false'],
    print: ['Доступ запрещён'],
  },
  {
    description: 'разрешённый доступ для администратора',
    input: ['true', 'admin', 'true'],
    print: ['Доступ разрешён'],
  },
  {
    description: 'разрешённый доступ для модератора',
    input: ['true', 'moderator', 'true'],
    print: ['Доступ разрешён'],
  },
  {
    description: 'нет доступа для пользователя с неправильной ролью',
    input: ['true', 'guest', 'true'],
    print: ['Доступ запрещён'],
  },
  {
    description: 'нет доступа при отсутствии платного статуса',
    input: ['true', 'moderator', 'false'],
    print: ['Доступ запрещён'],
  },
])
