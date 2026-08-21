<template>
  <div>
    <!-- Desktop navbar -->
    <nav class="navbar" :class="{ 'light-navbar': isLightTheme, 'navbar-scrolled': isScrolled }">
      <div class="navbar-container">
        <div class="navbar-logo">
          <a href="#inicio" class="logo-link" aria-label="MH" @click="onLogoClick">
            <span class="logo-mark"><span class="logo-angle">&lt;</span>MH<span class="logo-angle">/&gt;</span></span>
          </a>
          <span v-if="easterEggCount && easterEggCount > 0" class="navbar-badge" @click.stop="$emit('openSecretPanel')">
            <Icon icon="mdi:trophy" width="14" /> {{ easterEggCount }}/{{ easterEggTotal }}
          </span>
        </div>

        <ul class="navbar-menu">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="'#' + item.id"
              class="nav-link"
              :class="{ 'nav-link-active': activeSection === item.id }"
            >
              {{ t(item.label) }}
            </a>
          </li>
        </ul>

        <div class="navbar-actions">
          <button class="lang-toggle" @click="toggleLocale" :title="t('nav.idiomaTitulo')">
            <span :class="{ 'lang-active': locale === 'es' }">ES</span>
            <span class="lang-sep">/</span>
            <span :class="{ 'lang-active': locale === 'en' }">EN</span>
          </button>
          <button
            class="theme-toggle"
            @click="$emit('toggleTheme', $event)"
            :title="isLightTheme ? t('nav.temaOscuro') : t('nav.temaClaro')"
          >
            <i :class="isLightTheme ? 'fas fa-moon' : 'fas fa-sun'"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile floating menu -->
    <div class="mobile-fab" :class="{ 'light-fab': isLightTheme }">
      <div class="mobile-fab-bar">
        <a href="#inicio" class="fab-logo-link" aria-label="MH" @click="onLogoClick">
          <span class="logo-mark"><span class="logo-angle">&lt;</span>MH<span class="logo-angle">/&gt;</span></span>
        </a>
        <span v-if="easterEggCount && easterEggCount > 0" class="navbar-badge" @click.stop="$emit('openSecretPanel')">
          <Icon icon="mdi:trophy" width="14" /> {{ easterEggCount }}/{{ easterEggTotal }}
        </span>
        <div class="mobile-fab-spacer"></div>
        <button class="fab-hamburger" @click.stop="menuOpen = !menuOpen" aria-label="Menú">
          <span class="hamburger-line" :class="{ 'open': menuOpen }"></span>
          <span class="hamburger-line" :class="{ 'open': menuOpen }"></span>
          <span class="hamburger-line" :class="{ 'open': menuOpen }"></span>
        </button>
      </div>
    </div>

    <Transition name="fab-menu">
      <div v-if="menuOpen" class="fab-dropdown" :class="{ 'light-fab-dropdown': isLightTheme }" @click.self="menuOpen = false">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="'#' + item.id"
          class="fab-link"
          :class="{ 'fab-link-active': activeSection === item.id }"
          @click="menuOpen = false"
        >
          {{ t(item.label) }}
        </a>
        <button class="fab-theme-toggle" @click="$emit('toggleTheme', $event)">
          <i :class="isLightTheme ? 'fas fa-moon' : 'fas fa-sun'"></i>
          <span>{{ isLightTheme ? t('nav.temaOscuro') : t('nav.temaClaro') }}</span>
        </button>
        <button class="fab-theme-toggle" @click="toggleLocale">
          <Icon icon="mdi:translate" width="18" />
          <span class="lang-toggle-inline">
            <span :class="{ 'lang-active': locale === 'es' }">ES</span>
            <span class="lang-sep">/</span>
            <span :class="{ 'lang-active': locale === 'en' }">EN</span>
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useLocale } from '@/composables/useLocale'
import type { UiKey } from '@/i18n/ui'

const { t, toggleLocale, locale } = useLocale()

defineProps<{
  isLightTheme: boolean
  activeSection: string
  easterEggCount?: number
  easterEggTotal?: number
}>()

defineEmits<{
  toggleTheme: [event: MouseEvent]
  openSecretPanel: []
}>()

const navItems: { id: string; label: UiKey }[] = [
  { id: 'inicio', label: 'nav.inicio' },
  { id: 'trayectoria', label: 'nav.trayectoria' },
  { id: 'proyectos', label: 'nav.proyectos' },
  { id: 'habilidades', label: 'nav.habilidades' },
  { id: 'sobre-mi', label: 'nav.sobreMi' },
  { id: 'contacto', label: 'nav.contacto' },
]


const onLogoClick = () => {
  window.dispatchEvent(new Event('logo-click'))
}

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
