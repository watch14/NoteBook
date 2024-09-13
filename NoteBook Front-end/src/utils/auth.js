export function saveUserToLocalStorage(userId, token) {
  localStorage.setItem("userId", userId);
  localStorage.setItem("token", token);
}

export function getUserFromLocalStorage() {
  return {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  };
}

export function clearUserFromLocalStorage() {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
}

export function isUserLoggedIn() {
  const { userId, token } = getUserFromLocalStorage();
  return !!userId && !!token;
}
