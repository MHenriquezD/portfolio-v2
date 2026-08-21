<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import NavBar from './components/navBar.vue'
import MainView from './views/mainView.vue'

const isLightTheme = ref(false)
const activeSection = ref('inicio')
const easterEggCount = ref(0)
const easterEggTotal = ref(0)

const applyTheme = () => {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('theme', isLightTheme.value ? 'light' : 'dark')
}

// El nuevo tema se revela con un círculo que crece desde el botón, como si
// amaneciera desde ahí. Si el navegador no soporta View Transitions o el
// usuario pidió menos movimiento, el cambio es instantáneo.
const toggleTheme = async (event?: MouseEvent) => {
  const startViewTransition = (
    document as Document & {
      startViewTransition?: (cb: () => Promise<void>) => { ready: Promise<void> }
    }
  ).startViewTransition

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!startViewTransition || reduceMotion) {
    applyTheme()
    return
  }

  const target = event?.currentTarget as HTMLElement | undefined
  const rect = target?.getBoundingClientRect()
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
  const y = rect ? rect.top + rect.height / 2 : 0
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  const transition = startViewTransition.call(document, async () => {
    applyTheme()
    await nextTick()
  })

  await transition.ready
  document.documentElement.animate(
    {
      clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
    },
    {
      duration: 650,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: '::view-transition-new(root)',
    },
  )
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

/* El crossfade por defecto se desactiva: el tema nuevo se dibuja encima y
   se revela con el círculo que anima toggleTheme. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
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
