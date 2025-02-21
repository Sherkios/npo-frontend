export function saveJwt(token: string) {
  localStorage.setItem("jwt", token);
}

export function getJwt() {
  return localStorage.getItem("jwt");
}
