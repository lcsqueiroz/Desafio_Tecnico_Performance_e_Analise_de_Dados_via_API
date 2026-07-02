export function getSuperUsers(users) {
  return users.filter((user) => user.score >= 900 && user.active);
}

export function getTimestamp() {
  return new Date().toISOString();
}
