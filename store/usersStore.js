const users = [];

export function getAllUsers() {
  return users;
}

export function addUsers(newUsers) {
  users.push(...newUsers);
}
