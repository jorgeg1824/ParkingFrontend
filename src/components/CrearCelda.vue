<script setup lang="ts">
import { reactive, ref, onMounted } from "vue"
import type { Cell } from "../modules/interfaces/celda"
import type { CellType } from "../modules/interfaces/cell-type"
import type { Zone } from "../modules/interfaces/zone"

import { createCelda } from "../modules/services/service-celda"
import { getAllCellTypes } from "../modules/services/service-type-celda"
import { getAllZones } from "../modules/services/service-zone"

const formRef = ref<HTMLFormElement | null>(null)

const form: Cell = reactive({
  cellType: "",
  zone: "",
  name: "",
  isActive: true,
})

// Errores
const errors = reactive({
  tipoCelda: "",
  zona: "",
  numeroCelda: "",
})

// Datos dinámicos del backend
const tiposCelda = ref<CellType[]>([])
const zonas = ref<Zone[]>([])

// 🔹 Cargar tipos de celda y zonas cuando se monta el componente
onMounted(async () => {
  const [cellTypeResponse, zoneResponse] = await Promise.all([
    getAllCellTypes(),
    getAllZones(),
  ])

  if (cellTypeResponse.success) tiposCelda.value = cellTypeResponse.success
  else alert("Error al obtener los tipos de celda.")

  if (zoneResponse.success) zonas.value = zoneResponse.success
  else alert("Error al obtener las zonas.")
})

// 🔹 Enviar formulario
const sendForm = async () => {
  if (!form.cellType) errors.tipoCelda = "Seleccione el tipo de celda"
  else errors.tipoCelda = ""

  if (!form.zone) errors.zona = "Seleccione una zona"
  else errors.zona = ""

  if (!form.name) errors.numeroCelda = "Ingrese un número de celda"
  else errors.numeroCelda = ""

  const formValid = !errors.tipoCelda && !errors.zona && !errors.numeroCelda
  if (!formValid) {
    alert("Formulario inválido, por favor revise los campos.")
    return
  }

  const response = await createCelda(form)
  if (response?.error) {
    alert(` Error: ${response.error}`)
  } else {
    alert(` Celda registrada correctamente`)
    Object.assign(form, { cellType: "", zone: "", name: "", isActive: true })
  }
}
</script>

<template>
  <form ref="formRef" @submit.prevent="sendForm">
    <div>
      <h1 class="title d-flex justify-content-center fst-italic">
        Registro de una nueva Celda
      </h1>
    </div>

    <!-- Tipo de Celda -->
    <select
      class="form-select"
      v-model="form.cellType"
      :class="{
        'is-invalid': errors.tipoCelda,
        'is-valid': !errors.tipoCelda && form.cellType !== '',
      }"
>
      <option value="" disabled selected>Tipo de Celda</option>
      <option
        v-for="tipo in tiposCelda"
        :key="tipo.id"
        :value="tipo.name"
      >
        {{ tipo.name }}
      </option>
    </select>

<!-- Zona -->
    <select
      class="form-select"
      v-model="form.zone"
      :class="{
        'is-invalid': errors.zona,
        'is-valid': !errors.zona && form.zone !== '',
    }"
>
    <option value="" disabled selected>Zona donde se ubicará</option>
    <option
      v-for="zona in zonas"
      :key="zona.id"
      :value="zona.name"
    >
      {{ zona.name }}
    </option>
  </select>

    <!-- Número de Celda -->
    <div class="d-flex col-2 gap-2 justify-content-center mx-auto w-50 form-floating mt-2 fst-italic flex-column">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        placeholder="Número de la Celda"
        min="1"
        max="500"
        required
        v-model="form.name"
        :class="{
          'is-invalid': errors.numeroCelda,
          'is-valid': !errors.numeroCelda && form.name !== '',
        }"
      />
      <label class="text fst-italic" for="floatingInput">Número de la Celda</label>
    </div>
    <div
      v-if="errors.numeroCelda"
      class="invalid-feedback d-flex justify-content-center mx-auto w-50 mt-1"
      style="display: block !important;"
    >
      {{ errors.numeroCelda }}
    </div>

    <!-- Estado -->
    <div class="d-flex gap-2 col-6 justify-content-center mx-auto state mt-2 fst-italic">
      <h4>Estado:</h4>
      <input class="form-control" type="text" v-model="form.isActive" disabled />
    </div>

    <!-- Botones -->
    <div class="d-flex justify-content-center gap-2 col-6 mx-auto confirm mt-3 w-100">
      <button type="submit" class="btn btn-outline-success">
        Registrar
      </button>
      <button
        type="button"
        class="btn btn-outline-danger"
        @click="Object.assign(form, { cellType: '', zone: '', name: '', isActive: true })"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<style scoped>
.invalid-feedback {
  font-size: 0.9rem;
  color: #dc3545;
}
</style>
