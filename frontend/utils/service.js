import axios from 'axios';

const baseUrl = 'http://192.168.9.31:8080';

export async function login({email, password}) {
  const response = await axios.post(`${baseUrl}/api/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function register({email, password, name}) {
  const response = await axios.post(`${baseUrl}/api/auth/register`, {
    email,
    password,
    name,
  });
  return response.data;
}
