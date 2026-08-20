<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/navBar.vue'
import MainView from './views/mainView.vue'

const isLightTheme = ref(false)
const activeSection = ref('inicio')
const easterEggCount = ref(0)
const easterEggTotal = ref(0)

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark')
}

const sectionIds: string[] = ['inicio', 'trayectoria', 'proyectos', 'habilidades', 'sobre-mi', 'contacto']

const updateActiveSection = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop

  if (scrollTop < 300) {
    activeSection.value = 'inicio'
    return
  }

  const windowBottom = scrollTop + window.innerHeight
  const docHeight = document.documentElement.scrollHeight

  if (windowBottom >= docHeight - 100) {
    activeSection.value = sectionIds[sectionIds.length - 1]!
    return
  }

  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const id = sectionIds[i]!
    const el = document.getElementById(id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= window.innerHeight * 0.4) {
      activeSection.value = id
      return
    }
  }

  activeSection.value = 'inicio'
}

const openSecretPanel = () => {
  window.dispatchEvent(new Event('open-secret-panel'))
}

const handleEggUpdate = (e: Event) => {
  const detail = (e as CustomEvent).detail
  easterEggCount.value = detail.count
  easterEggTotal.value = detail.total
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isLightTheme.value = savedTheme === 'light'

  window.addEventListener('scroll', updateActiveSection, { passive: true })
  window.addEventListener('easter-egg-update', handleEggUpdate)
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
  window.removeEventListener('easter-egg-update', handleEggUpdate)
})
</script>

<template>
  <NavBar :isLightTheme="isLightTheme" :activeSection="activeSection" :easterEggCount="easterEggCount" :easterEggTotal="easterEggTotal" @toggleTheme="toggleTheme" @openSecretPanel="openSecretPanel" />
  <MainView :isLightTheme="isLightTheme" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Reserva el canal del scrollbar siempre, para que abrir un modal
   (que pone overflow:hidden en el body) no ensanche la página. */
html {
  scrollbar-gutter: stable;
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
