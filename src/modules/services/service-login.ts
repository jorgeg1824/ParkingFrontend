import { postRequest } from "./services-http"
import type { login } from "../interfaces/login"

const LOGIN_ENDPOINT = "/auth/login" // Ajusta según tu backend

function validateDataCell(data: login): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const emailValid = data.email.length >= 10 && data.email.length <= 70 && emailRegex.test(data.email)
  const passwordValid = data.password.length >= 6 && data.password.length <= 15
  return emailValid && passwordValid
}

export async function loginService(data: login) {
  if (!validateDataCell(data)) {
    return { error: "Datos inválidos. Revisa el correo y la contraseña." }
  }

  const result = await postRequest<{ token: string }>(LOGIN_ENDPOINT, data)

  return result
}
