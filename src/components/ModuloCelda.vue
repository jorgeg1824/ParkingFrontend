<script setup lang="ts">

</script>

<template>
  <div>
    <h1 class="title d-flex justify-content-center fst-italic --bs-primary">Bienvenido al Módulo de Celdas</h1>
  </div>
    <div class="d-grid gap-2 col-6 mx-auto botones mt-2">
        <button class="btn btn-primary w-100" type="button">Crear Tipo de Celda</button>
        <button class="btn btn-primary w-100" type="button">Modificar Tipo de Celda</button>
        <router-link to="/registro-celda" class="btn btn-primary w-100" type="button" style="align-content: center;">Crear Celda</router-link>
        <button class="btn btn-primary w-100" type="button">Consultar Celdas</button>
        <button class="btn btn-primary w-100" type="button">Modificar Celda</button>
    </div>
</template>

<style scoped>
    .botones{
        margin-top: 30px;
        min-height: calc(100vh - 390px);
    }
</style>
