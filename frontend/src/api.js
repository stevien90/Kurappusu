const BASE_URL = "http://localhost:8000";

export async function register(username, password) {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const res = await fetch(`${BASE_URL}/register`, { method: "POST", body: form });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function login(username, password) {
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  const res = await fetch(`${BASE_URL}/login`, { method: "POST", body: form });
  if (!res.ok) throw await res.json();
  return res.json(); // { token }
}

export async function rollDice(token, value) {
  const form = new FormData();
  form.append("token", token);
  form.append("value", value);
  const res = await fetch(`${BASE_URL}/roll`, { method: "POST", body: form });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function fetchStats(token) {
  const res = await fetch(`${BASE_URL}/stats?token=${token}`);
  if (!res.ok) throw await res.json();
  return res.json(); // { total, frequencies, probabilities, deltas }
}

export async function clearSession(token) {
  const form = new FormData();
  form.append("token", token);
  const res = await fetch(`${BASE_URL}/clear`, { method: "POST", body: form });
  if (!res.ok) throw await res.json();
  return res.json();
}
