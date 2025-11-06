<script setup lang="ts">
import { ref, computed } from 'vue'
import { loginService } from '../modules/services/service-login'

const email = ref('')
const password = ref('')
const touched = ref({ email: false, password: false })

// Validación básica
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailValid = computed(() => {
  const v = email.value.trim()
  if (v.length < 10) return false // Mínimo 10 caracteres
  if (v.length > 70) return false // Máximo 70 caracteres
  return emailRegex.test(v)
})

// Contraseña: mínimo 6, máximo 15
const passwordValid = computed(() => {
  const len = password.value.length
  return len >= 6 && len <= 15
})

const formValid = computed(() => emailValid.value && passwordValid.value)

function onBlur(field: 'email' | 'password') {
  touched.value[field] = true
}

async function submit() {
  touched.value.email = true
  touched.value.password = true
  if (!formValid.value) return

  const raw = email.value.trim()
  const parts = raw.split('@')
  const normalizedEmail = parts.length === 2 && parts[1]
    ? `${parts[0]}@${parts[1].toLowerCase()}`
    : raw

  const loginData = { email: normalizedEmail, password: password.value }

  const response = await loginService(loginData)

  if (response.error) {
    console.error(response.error)
    alert(response.error)
  } else {
    console.log("Login exitoso:", response.success)
    alert("Inicio de sesión exitoso 🎉")
  }
}
</script>

<template>
  <div class="container py-4">
    <form @submit.prevent="submit">
      <!-- Email -->
      <div class="form-floating mb-3 input">
        <input
          v-model="email"
          @blur="onBlur('email')"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          required
          :aria-invalid="touched.email && !emailValid ? 'true' : 'false'"
          aria-describedby="emailHelp"
          minlength="10"
          maxlength="70"
        />
        <label for="floatingInput">Correo Electrónico</label>
        <div id="emailHelp" class="form-text text-danger" v-if="touched.email && !emailValid">
          Ingresa un correo válido (ej. usuario@dominio.com). Mínimo 10 y máximo 70 caracteres.
        </div>
      </div>

      <!-- Contraseña -->
      <div class="form-floating input">
        <input
          v-model="password"
          @blur="onBlur('password')"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          required
          minlength="6"
          maxlength="15"
        />
        <label for="floatingPassword">Contraseña</label>
        <div class="form-text text-danger" v-if="touched.password && !passwordValid">
          La contraseña debe tener entre 6 y 15 caracteres.
        </div>
      </div>

      <button type="submit" class="btn btn-success mt-4" :disabled="!formValid">
        Ingresar
      </button>
    </form>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  max-width: 400px;
  margin: auto;
}
</style>

