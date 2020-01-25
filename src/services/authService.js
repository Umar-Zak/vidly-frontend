import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  const jwt = localStorage.getItem(tokenKey);
  try {
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function storeToken(input) {
  localStorage.setItem(tokenKey, input);
}

export function logOut() {
  localStorage.removeItem(tokenKey);
}

export function getJWt() {
  return localStorage.getItem("token");
}

http.setJwt(getJWt());
