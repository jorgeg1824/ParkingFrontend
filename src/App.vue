<script setup lang="ts">
import Navegador from './components/Navbar.vue';

</script>

<template>
  <Navegador/>
  <div class="page-content flex-grow-1 overflow-auto">
    <router-view/>
  </div>
</template>

<style scoped>
  .page-content{
    min-height: calc(100vh - 112px);
  }
</style>
