<script setup lang="ts">

</script>

<template>
        <div>
            <h1 class="title d-flex justify-content-center fst-italic">Inicio de Sesión</h1>
        </div>
    <div class="row d-flex justify-content-center mt-5">
        <form class="col-4">
        <div class="form-floating mb-3 input">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Correo Electrónico</label>
        </div>
        <div class="form-floating input">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Contraseña</label>
        </div>
        <button type="button" class="btn btn-success mt-4">Ingresar</button>
    </form>
    </div>
</template>

<style scoped>

</style>
