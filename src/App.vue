<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/navBar.vue'
import MainView from './views/mainView.vue'

const isLightTheme = ref(false)
const activeSection = ref('inicio')

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark')
}

const sectionIds = ['inicio', 'habilidades', 'trayectoria', 'proyectos', 'contacto']

const updateActiveSection = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  if (scrollTop < 300) {
    activeSection.value = 'inicio'
    return
  }

  const windowBottom = scrollTop + window.innerHeight
  const docHeight = document.documentElement.scrollHeight

  if (windowBottom >= docHeight - 100) {
    activeSection.value = sectionIds[sectionIds.length - 1]
    return
  }

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const el = document.getElementById(sectionIds[i])
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= window.innerHeight * 0.4) {
      activeSection.value = sectionIds[i]
      return
    }
  }

  activeSection.value = 'inicio'
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isLightTheme.value = savedTheme === 'light'

  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<template>
  <NavBar :isLightTheme="isLightTheme" :activeSection="activeSection" @toggleTheme="toggleTheme" />
  <MainView :isLightTheme="isLightTheme" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #0f0f0f;
  overflow-x: hidden;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
