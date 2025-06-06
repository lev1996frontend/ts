function generateUser(id: number) {
  return {
    id,
    name: `User_${id}`,
    createdAt: new Date().toISOString(),
  };
}

describe('generateUser', () => {
  it('should generate a user object matching snapshot', () => {
    const user = generateUser(1);
    // чтобы snapshot не менялся из-за даты, фиксируем её
    user.createdAt = '2023-01-01T00:00:00.000Z';
    // файл = snapshot.test.ts
    expect(user).toMatchSnapshot(); // __snapshots__/файл.snap
  });
});

// Jest Snapshot v1

// exports[`generateUser should generate a user object matching snapshot 1`] = `
// Object {
//   "createdAt": "2023-01-01T00:00:00.000Z",
//   "id": 1,
//   "name": "User_1",
// }
// `;
