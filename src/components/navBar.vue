<template>
  <nav class="navbar" :class="{ 'light-navbar': isLightTheme, 'navbar-scrolled': isScrolled }">
    <div class="navbar-container">
      <div class="navbar-logo">
        <a href="#inicio" class="logo-link">Mi Portafolio</a>
      </div>

      <button
        class="hamburger"
        :class="{ 'hamburger-active': menuOpen }"
        @click="menuOpen = !menuOpen"
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="navbar-menu" :class="{ 'menu-open': menuOpen }">
        <li v-for="item in navItems" :key="item.id">
          <a
            :href="'#' + item.id"
            class="nav-link"
            :class="{ 'nav-link-active': activeSection === item.id }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </a>
        </li>
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
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  isLightTheme: boolean
  activeSection: string
}>()

defineEmits<{
  toggleTheme: []
}>()

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'sobre-mi', label: 'Sobre Mí' },
  { id: 'contacto', label: 'Contacto' },
]

const menuOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped src="../assets/navBar.css"></style>
