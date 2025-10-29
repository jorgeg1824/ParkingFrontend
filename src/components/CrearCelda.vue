<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Cell } from '../modules/interfaces/celda'

const formRef = ref<HTMLFormElement | null>(null)

// Datos del formulario (reactivo)
const form: Cell = reactive({
  cellType: '',
  zone: '',
  name: '',
  isActive: true,
})

// Errores del formulario
const errors = reactive({
  tipoCelda: '',
  zona: '',
  numeroCelda: '',
})

const sendForm = () => {
    if (formRef.value?.checkValidity()) {
        formRef.value?.reportValidity()
        return alert(`✅ Celda registrada correctamente:\n- Tipo: ${form.cellType}\n- Zona: ${form.zone}\n- Número: ${form.name}\n- Estado: ${form.isActive}`);
    }
  // Si es válido, realiza el registro (puedes cambiar alert por lógica de envío)
  alert('Formulario inválido, por favor revise los campos.')

}

const formularioTipoCelda = [
    'Carro', 'Moto', 'Otro'
]

const formularioZona = [
    'Zona Carros', 'Zona Motos', 'Otra'
]
</script>

<template>
    <form ref="formRef" @submit.prevent="sendForm">
        <div>
            <h1 class="title d-flex justify-content-center fst-italic">
            Registro de una nueva Celda
            </h1>
        </div>

        <!-- Tipo de Celda -->
        <div class="d-flex col-2 gap-2 justify-content-center mx-auto w-50 mt-3 fst-italic flex-column">
            <select
            class="form-select"
            v-model="form.cellType"
            :class="{
                'is-invalid': errors.tipoCelda,
                'is-valid': !errors.tipoCelda && form.cellType !== ''
            }"
            >
            <option value="" disabled selected>Tipo de Celda</option>
            <option v-for="tipo in formularioTipoCelda" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
            <div v-if="errors.tipoCelda" class="invalid-feedback" style="display:block;">
            {{ errors.tipoCelda }}
            </div>
        </div>

  <!-- Zona -->
        <div class="d-flex col-2 gap-2 justify-content-center mx-auto w-50 mt-3 fst-italic flex-column">
            <select
            class="form-select"
            v-model="form.zone"
            :class="{
                'is-invalid': errors.zona,
                'is-valid': !errors.zona && form.zone !== ''
            }"
            >
            <option value="" disabled selected>Zona Donde se Ubicará</option>
            <option v-for="zona in formularioZona" :key="zona" :value="zona">{{ zona }}</option>
            </select>
            <div v-if="errors.zona" class="invalid-feedback" style="display:block;">
            {{ errors.zona }}
            </div>
        </div>

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
            pattern="^[0-9]+$"
            v-model="form.name"
            :class="{
                'is-invalid': errors.numeroCelda,
                'is-valid': !errors.numeroCelda && form.name !== ''
            }"
            />
         <label class="text fst-italic" for="floatingInput">Número de la Celda</label>
        </div>

        <!-- Mensaje debajo del campo -->
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
            <input
            class="form-control"
            type="text"
            v-model="form.isActive"
            disabled
            />
        </div>

  <!-- Botones -->
  <div class="d-flex justify-content-center gap-2 col-6 mx-auto confirm mt-3 w-100">
    <button
      type="submit"
      class="btn btn-outline-success"
    >
      Registrar
    </button>
    <button
      type="button"
      class="btn btn-outline-danger"
      @click="Object.assign(form, { tipoCelda: '', zona: '', numeroCelda: '' })"
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
