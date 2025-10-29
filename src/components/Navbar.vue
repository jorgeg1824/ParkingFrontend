<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid fst-italic">
    <a class="navbar-brand" href="#" color="#2563EB;">ParKing</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/"> </router-link>
          <a class="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ¿Qué Necesitas?
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/modulo-zona" class="dropdown-item">Módulo Zonas</router-link>
            </li>
            <li>
              <router-link to="/modulo-celda" class="dropdown-item">Módulo Celdas</router-link>
            </li>
          </ul>
        </li>
      </ul>
      <router-link to="/login" class="btn btn-outline-success" type="submit">Iniciar Sesión</router-link>
    </div>
  </div>
</nav>
</template>

<style scoped>

</style>