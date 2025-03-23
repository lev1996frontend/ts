export {}
// Задание 9.

const isUserLoggedIn: boolean = input('isUserLoggedIn = ') === 'true';
const userRole: string = input('userRole = ');
const isPaidUser: boolean = input('isPaidUser = ') === 'true';

if (
  isUserLoggedIn && (
    userRole === 'admin' || 
    (userRole === 'moderator' && isPaidUser)
  )
) {
  print('Доступ разрешен');
} else {
  print('Доступ в секретный сервер запрещен');
}

