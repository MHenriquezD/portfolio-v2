<template>
  <nav class="navbar" :class="{ 'light-navbar': isLightTheme }">
    <div class="navbar-container">
      <div class="navbar-logo">
        <a href="#inicio" class="logo-link">Mi Portafolio</a>
      </div>
      <ul class="navbar-menu">
        <li><a href="#inicio" class="nav-link">Inicio</a></li>
        <li><a href="#sobre-mi" class="nav-link">Sobre mí</a></li>
        <li><a href="#habilidades" class="nav-link">Habilidades</a></li>
        <li><a href="#educacion" class="nav-link">Educación</a></li>
        <li><a href="#experiencia" class="nav-link">Experiencia</a></li>
        <li><a href="#proyectos" class="nav-link">Proyectos</a></li>
        <li><a href="#contacto" class="nav-link">Contacto</a></li>
      </ul>
      <button
        class="theme-toggle"
        @click="$emit('toggleTheme')"
        :title="isLightTheme ? 'Modo Oscuro' : 'Modo Claro'"
      >
        <i :class="isLightTheme ? 'fas fa-moon' : 'fas fa-sun'"></i>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  isLightTheme: boolean
}>()

defineEmits<{
  toggleTheme: []
}>()
</script>

<style scoped src="../assets/navBar.css"></style>
