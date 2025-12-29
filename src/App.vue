<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from './components/navBar.vue'
import MainView from './views/mainView.vue'

const isLightTheme = ref(false)

const toggleTheme = () => {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isLightTheme.value = savedTheme === 'light'
})
</script>

<template>
  <NavBar :isLightTheme="isLightTheme" @toggleTheme="toggleTheme" />
  <MainView :isLightTheme="isLightTheme" />
</template>

<style>
/* Estilos globales */
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
