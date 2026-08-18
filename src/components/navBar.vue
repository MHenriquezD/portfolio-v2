<template>
  <div>
    <!-- Desktop navbar -->
    <nav class="navbar" :class="{ 'light-navbar': isLightTheme, 'navbar-scrolled': isScrolled }">
      <div class="navbar-container">
        <div class="navbar-logo">
          <a href="#inicio" class="logo-link">
            <img :src="logoOpen" alt="MH" class="logo-img" />
          </a>
        </div>

        <ul class="navbar-menu">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="'#' + item.id"
              class="nav-link"
              :class="{ 'nav-link-active': activeSection === item.id }"
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

    <!-- Mobile floating menu -->
    <div class="mobile-fab" :class="{ 'light-fab': isLightTheme }">
      <button class="fab-btn" @click.stop="menuOpen = !menuOpen" aria-label="Menú">
        <img :src="menuOpen ? logoClose : logoOpen" alt="MH" class="fab-logo" :class="{ 'fab-logo-close': menuOpen }" />
      </button>

      <Transition name="fab-menu">
        <div v-if="menuOpen" class="fab-dropdown" @click.stop>
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="'#' + item.id"
            class="fab-link"
            :class="{ 'fab-link-active': activeSection === item.id }"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </a>
          <button class="fab-theme-toggle" @click="$emit('toggleTheme')">
            <i :class="isLightTheme ? 'fas fa-moon' : 'fas fa-sun'"></i>
            <span>{{ isLightTheme ? 'Modo Oscuro' : 'Modo Claro' }}</span>
          </button>
        </div>
      </Transition>
    </div>
  </div>
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

const base = import.meta.env.BASE_URL
const logoOpen = `${base}img/logo/png/4A_mh-code-blue_transparent_512.png`
const logoClose = `${base}img/logo/png/5A_angles-blue_transparent_512.png`

const menuOpen = ref(false)
const isScrolled = ref(false)

const closeMenuOnOutsideClick = () => {
  if (menuOpen.value) menuOpen.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', closeMenuOnOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', closeMenuOnOutsideClick)
})
</script>

<style scoped src="../assets/navBar.css"></style>
