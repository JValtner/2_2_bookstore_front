import AxiosConfig from "../config/axios.config";

const AUTH_RESOURCE = "api/auth";
const TOKEN_KEY = "token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    AxiosConfig.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  delete AxiosConfig.defaults.headers.common["Authorization"];
}

export async function login(data) {
  const res = await AxiosConfig.post(`${AUTH_RESOURCE}/login`, data);

  const token = typeof res.data === "string" ? res.data : res.data.token || res.data.accessToken;

  if (token) {
    setToken(token);
  } else {
    console.warn("No token found in login response:", res.data);
  }

  return res.data;
}

export async function register(data) {
  const res = await AxiosConfig.post(`${AUTH_RESOURCE}/register`, data);
  return res.data;
}

export async function getCurrentProfile() {
  const res = await AxiosConfig.get(`${AUTH_RESOURCE}/profile`);
  return res.data;
}
export function getUserRolesFromToken(token) {
  if (!token) return [];
  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    // If only one role, convert to array
    return Array.isArray(payload?.role) ? payload.role : payload?.role ? [payload.role] : [];
  } catch (e) {
    console.error("Failed to parse token", e);
    return [];
  }
}

export function logout() {
  removeToken();
}
