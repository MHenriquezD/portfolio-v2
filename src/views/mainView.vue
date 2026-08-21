<template>
  <div class="main-view" :class="{ 'light-theme': isLightTheme }" @click="closeFlip">
    <!-- Partículas de fondo -->
    <div class="particles-bg"></div>

    <!-- Sección Hero/Inicio -->
    <section id="inicio" class="hero-section">
      <div class="hero-content">
        <h2 class="hero-subtitle animate-text">{{ t('hero.soy') }}</h2>
        <h1 class="hero-title animate-text">Manuel Henriquez</h1>
        <p class="hero-role animate-text">
          <span class="typing-effect" ref="typingEl"></span>
        </p>
        <div class="hero-contact-info">
          <a href="mailto:mdhenriquez16@gmail.com" class="hero-contact-link">
            <i class="fas fa-envelope"></i> mdhenriquez16@gmail.com
          </a>
          <a href="https://wa.me/50492370288" target="_blank" class="hero-contact-link">
            <i class="fas fa-phone"></i> +504 9237-0288
          </a>
          <a href="https://www.linkedin.com/in/manuel-henriquez-a8541423a/" target="_blank" class="hero-contact-link">
            <i class="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="https://github.com/MHenriquezD" target="_blank" class="hero-contact-link">
            <i class="fab fa-github"></i> GitHub
          </a>
        </div>
        <div class="hero-cta">
          <button @click="openCvModal" class="btn-primary">
            <i class="fas fa-file-pdf"></i> {{ t('hero.descargarCV') }}
          </button>
          <a href="#proyectos" class="btn-secondary">{{ t('hero.verProyectos') }}</a>
        </div>
      </div>
    </section>

    <!-- Sección Trayectoria (Experiencia + Educación) -->
    <section id="trayectoria" class="trajectory-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">{{ t('trayectoria.titulo') }}</h2>
        <p class="section-description scroll-reveal">
          {{ t('trayectoria.descripcion') }}
        </p>
        <div class="trajectory-tabs">
          <button
            class="tab-btn"
            :class="{ 'tab-active': activeTab === 'experiencia' }"
            @click="activeTab = 'experiencia'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            {{ t('trayectoria.experiencia') }}
          </button>
          <button
            class="tab-btn"
            :class="{ 'tab-active': activeTab === 'educacion' }"
            @click="activeTab = 'educacion'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>
            {{ t('trayectoria.educacion') }}
          </button>
        </div>

        <Transition name="tab-fade" mode="out-in">
          <div v-if="activeTab === 'experiencia'" key="experiencia" class="tab-content">
            <div class="timeline">
              <div v-for="exp in experiencia" :key="exp.id" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="timeline-title">{{ tr(exp.titulo) }}</h3>
                  <p v-if="exp.empresa" class="timeline-company"><i class="fas fa-building"></i> {{ exp.empresa }}</p>
                  <p class="timeline-period"><i class="fas fa-calendar-alt"></i> {{ tr(exp.periodo) }}</p>
                  <ul class="timeline-responsibilities">
                    <li v-for="(resp, i) in trList(exp.responsabilidades)" :key="i">{{ resp }}</li>
                  </ul>
                  <div class="timeline-techs">
                    <span v-for="tech in exp.tecnologias" :key="tech" class="tech-chip">{{ tech }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else key="educacion" class="tab-content">
            <div class="education-grid">
              <div
                v-for="edu in educacion"
                :key="edu.id"
                class="education-card"
                :class="{ 'education-clickable': edu.certificado }"
                @click="edu.certificado && openCertificado(edu)"
              >
                <div class="education-icon">
                  <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="education-content">
                  <h3 class="education-title">{{ tr(edu.titulo) }}</h3>
                  <p class="education-period">{{ tr(edu.periodo) }}</p>
                  <p class="education-description">{{ tr(edu.descripcion) }}</p>
                  <span v-if="edu.certificado" class="ver-certificado">
                    <i class="fas fa-certificate"></i> {{ t('trayectoria.verCertificado') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Sección Proyectos -->
    <section id="proyectos" class="projects-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">{{ t('proyectos.titulo') }}</h2>
        <p class="section-description scroll-reveal">
          Una selección de mis trabajos más recientes y relevantes.
        </p>

        <!-- Proyectos Featured -->
        <div
          v-for="fp in featuredProjects"
          :key="fp.id"
          class="featured-project scroll-reveal"
        >
          <div class="featured-image">
            <img :src="resolveImg(fp.img)" :alt="fp.titulo" loading="lazy" />
            <div class="featured-badge">{{ t('proyectos.destacado') }}</div>
            <div class="project-overlay">
              <button v-if="fp.titulo === 'ComerciaHN'" @click="openModalComercia" class="overlay-btn">{{ t('proyectos.verDetalles') }}</button>
              <a v-else-if="fp.url" :href="fp.url" target="_blank" class="overlay-btn">{{ t('proyectos.verSitio') }}</a>
            </div>
          </div>
          <div class="featured-content">
            <h3>{{ fp.titulo }}</h3>
            <p>{{ tr(fp.descripcion) }}</p>
            <div class="project-tags">
              <span v-for="tag in fp.tags" :key="tag" class="project-tag">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- Grid de proyectos -->
        <div class="projects-grid">
          <div
            v-for="proyecto in regularProjects"
            :key="proyecto.id"
            class="project-card scroll-reveal"
          >
            <div class="project-image" :class="{ 'has-screenshot': !proyecto.isLogo }">
              <img :src="resolveImg(proyecto.img)" :alt="proyecto.titulo" loading="lazy" />
              <div
                v-if="proyecto.url || proyecto.id === 2"
                class="project-overlay"
              >
                <a v-if="proyecto.url" :href="proyecto.url" target="_blank" class="overlay-btn">
                  Ver Proyecto
                </a>
                <button
                  v-else-if="proyecto.id === 2"
                  @click="openModalRapidRiders"
                  class="overlay-btn"
                >
                  {{ t('proyectos.verDetalles') }}
                </button>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ proyecto.titulo }}</h3>
              <p>{{ tr(proyecto.descripcion) }}</p>
              <div v-if="proyecto.tags" class="project-tags">
                <span v-for="tag in proyecto.tags" :key="tag" class="project-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Habilidades -->
    <section id="habilidades" class="skills-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">{{ t('habilidades.titulo') }}</h2>
        <p class="section-description scroll-reveal">
          {{ t('habilidades.descripcion') }}
        </p>
        <p class="skills-hint scroll-reveal">
          <i class="fas fa-hand-pointer"></i> {{ t('habilidades.ayuda') }}
        </p>
        <div
          v-for="categoria in skillCategories"
          :key="categoria.clave"
          class="skills-category scroll-reveal"
        >
          <h3 class="category-title">{{ tr(categoria.valor) }}</h3>
          <div class="skills-grid">
            <div
              v-for="skill in habilidades.filter((s) => catKey(s.categoria) === categoria.clave)"
              :key="skill.id"
              class="skill-card-wrapper"
              :class="{ flipped: flippedSkill === skill.titulo }"
              :data-skill="skill.titulo"
              @click="toggleFlip(skill.titulo, $event)"
            >
              <div class="skill-card-inner">
                <div class="skill-card-front">
                  <div class="skill-glow"></div>
                  <div class="skill-image">
                    <img :src="resolveImg(skill.img)" :alt="skill.titulo" loading="lazy" />
                  </div>
                  <h3>{{ skill.titulo }}</h3>
                </div>
                <div class="skill-card-back">
                  <div class="skill-image skill-image-small">
                    <img :src="resolveImg(skill.img)" :alt="skill.titulo" loading="lazy" />
                  </div>
                  <h3>{{ skill.titulo }}</h3>
                  <p>{{ skillDescriptions[locale][skill.titulo] }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="physics-hint scroll-reveal">
          <i class="fas fa-arrows-alt"></i> Arrastra las esferas &middot; toca una para ir a su tarjeta
        </p>
        <SkillsPhysics
          :skills="habilidades"
          :resolveImg="resolveImg"
          :isLightTheme="isLightTheme"
          @skill-click="scrollToSkill"
          @sphere-escaped="triggerEasterEgg('easter-egg-sphere')"
        />
      </div>
    </section>

    <!-- Sección Sobre Mí -->
    <section id="sobre-mi" class="about-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">{{ t('sobreMi.titulo') }}</h2>
        <div class="about-content scroll-reveal">
          <div class="about-image" ref="profileImageRef">
            <div class="image-wrapper">
              <img :src="resolveImg('img/perfil/mhenriquez-profile.webp')" alt="Manuel Henriquez" loading="lazy" />
            </div>
          </div>
          <div class="about-text">
            <p>{{ t('sobreMi.p1') }}</p>
            <p>{{ t('sobreMi.p2') }}</p>
            <p>{{ t('sobreMi.p3') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Contacto -->
    <section id="contacto" class="contact-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">{{ t('contacto.titulo') }}</h2>
        <p class="section-description scroll-reveal">
          {{ t('contacto.descripcion') }}
        </p>
        <div class="contact-info">
          <a
            v-for="contact in contacto.filter((c) => c.texto)"
            :key="contact.tipo"
            :href="contact.url"
            class="contact-item"
            target="_blank"
          >
            <span class="contact-icon">
              <i :class="contact.icon"></i>
            </span>
            <span>{{ contact.texto }}</span>
          </a>
        </div>
        <div class="social-links">
          <a
            v-for="social in contacto.filter((c) => !c.texto)"
            :key="social.tipo"
            :href="social.url"
            target="_blank"
            class="social-link"
          >
            <i :class="social.icon"></i>
            <span>{{ social.tipo.charAt(0).toUpperCase() + social.tipo.slice(1) }}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Modal RapidRiders -->
    <Transition name="modal">
      <div v-if="showModalRapidRiders" class="modal-overlay" @click="closeModalRapidRiders">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModalRapidRiders">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-header">
            <h2>{{ t('modal.rapidRidersTitulo') }}</h2>
            <p>{{ t('modal.rapidRidersDesc') }}</p>
          </div>
          <div class="modal-content">
            <div
              v-for="subproyecto in rapidRidersProyectos"
              :key="subproyecto.id"
              class="subproject-card"
            >
              <div class="subproject-icon">
                <i :class="subproyecto.icon"></i>
              </div>
              <div class="subproject-info">
                <h3>{{ subproyecto.titulo }}</h3>
                <p>{{ tr(subproyecto.descripcion) }}</p>
                <a :href="subproyecto.url" target="_blank" class="subproject-link">
                  {{ t('proyectos.verGithub') }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal ComerciaHN -->
    <Transition name="modal">
      <div v-if="showModalComercia" class="modal-overlay" @click="closeModalComercia">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModalComercia">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-header">
            <h2>{{ t('modal.comerciaTitulo') }}</h2>
            <p>{{ t('modal.comerciaDesc') }}</p>
          </div>
          <div class="modal-content">
            <div v-for="modulo in comerciaHNProyectos" :key="modulo.id" class="subproject-card">
              <div class="subproject-screenshot">
                <img :src="resolveImg(modulo.img)" :alt="modulo.titulo" loading="lazy" />
              </div>
              <div class="subproject-body">
                <div class="subproject-icon">
                  <i :class="modulo.icon"></i>
                </div>
                <div class="subproject-info">
                  <h3>{{ modulo.titulo }}</h3>
                  <p>{{ tr(modulo.descripcion) }}</p>
                  <a :href="modulo.url" target="_blank" class="subproject-link"> {{ t('proyectos.verSitio') }} </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal CV PDF -->
    <Transition name="modal">
      <div v-if="showModalCV" class="modal-overlay" @click="closeModalCV">
        <div class="modal-container modal-cv" @click.stop>
          <div class="modal-header">
            <h2>{{ t('modal.cvTitulo') }}</h2>
            <button @click="downloadCV" class="btn-download">
              <i class="fas fa-download"></i> {{ t('hero.descargarCV') }}
            </button>
            <button class="modal-close" @click="closeModalCV">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content pdf-viewer">
            <iframe :src="pdfUrl" class="pdf-iframe"></iframe>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Certificado -->
    <Transition name="modal">
      <div v-if="showCertificado" class="modal-overlay" @click="closeCertificado">
        <div class="modal-certificado" @click.stop>
          <button class="modal-close" @click="closeCertificado">
            <i class="fas fa-times"></i>
          </button>
          <h3 class="modal-certificado-title">{{ certificadoTitle }}</h3>
          <div class="modal-certificado-figure" :class="{ loaded: certificadoLoaded }">
            <img
              :src="resolveImg(certificadoImg)"
              :alt="certificadoTitle"
              class="modal-certificado-img"
              @load="certificadoLoaded = true"
            />
          </div>
        </div>
      </div>
    </Transition>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Manuel Henriquez. {{ t('footer.derechos') }}</p>
      <div class="footer-links">
        <a
          v-for="social in contacto.filter((c) => !c.texto)"
          :key="social.tipo"
          :href="social.url"
          target="_blank"
          class="footer-social"
        >
          <i :class="social.icon"></i>
        </a>
      </div>
    </footer>

    <!-- Easter Egg Toast -->
    <Transition name="achievement">
      <div v-if="showAchievement" class="achievement-toast">
        <div class="achievement-icon">
          <Icon :icon="achievementIcon" width="28" />
        </div>
        <div class="achievement-text">
          <span class="achievement-title">{{ achievementTitle }}</span>
          <span class="achievement-desc">{{ achievementDesc }}</span>
        </div>
      </div>
    </Transition>

    <!-- Panel Secreto -->
    <Transition name="secret-panel">
      <div v-show="showSecretPanel" class="secret-panel-overlay" @click.self="showSecretPanel = false">
        <div class="secret-panel">
          <button class="secret-panel-close" @click="showSecretPanel = false">&times;</button>
          <h3 class="secret-panel-title"><Icon icon="mdi:gamepad-variant" width="24" /> {{ t('egg.panelTitulo') }}</h3>
          <p class="secret-panel-subtitle">{{ t('egg.contador') }}: {{ easterEggCount }}/{{ easterEggs.length }}</p>
          <div class="secret-panel-list">
            <div v-for="egg in easterEggs" :key="egg.key" class="secret-panel-item" :class="{ 'discovered': discoveredKeys.has(egg.key) }" @click="discoveredKeys.has(egg.key) && replayEasterEgg(egg)">
              <span class="secret-panel-icon">
                <span v-if="discoveredKeys.has(egg.key) && egg.mark" class="logo-mark secret-panel-mark"><span class="logo-angle">&lt;</span>MH<span class="logo-angle">/&gt;</span></span>
                <img v-else-if="discoveredKeys.has(egg.key) && egg.img && secretPanelSeen" :src="resolveImg(egg.img)" :alt="eggName(egg)" class="secret-panel-img" :class="egg.key" />
                <Icon v-else :icon="discoveredKeys.has(egg.key) && egg.icon ? egg.icon : 'mdi:help-circle-outline'" :width="28" :color="discoveredKeys.has(egg.key) ? egg.color : undefined" />
              </span>
              <div class="secret-panel-info">
                <span class="secret-panel-name">{{ discoveredKeys.has(egg.key) ? eggName(egg) : t('egg.oculto') }}</span>
                <span class="secret-panel-desc">{{ discoveredKeys.has(egg.key) ? eggDesc(egg) : eggHint(egg) }}</span>
              </div>
              <Icon v-if="discoveredKeys.has(egg.key)" icon="mdi:check-circle" width="22" color="#4caf50" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import data from '../app/data/portfolio-data.json'
import SkillsPhysics from '@/components/SkillsPhysics.vue'
import { useLocale, type Translatable } from '@/composables/useLocale'
import { skillDescriptions, typingPhrases } from '@/i18n/skills'
import type { UiKey } from '@/i18n/ui'

const { t, tr, trList, locale } = useLocale()

defineProps<{
  isLightTheme: boolean
}>()

const {
  contacto,
  habilidades,
  educacion,
  experiencia,
  proyectos,
  rapidRidersProyectos,
  ComerciaHN,
} = data
const comerciaHNProyectos = ComerciaHN

/** Clave estable de categoría: el texto en español, que no cambia con el idioma. */
const catKey = (c: Translatable): string => (typeof c === 'string' ? c : (c.es ?? ''))

const skillCategories = computed(() => {
  const vistas = new Map<string, Translatable>()
  for (const s of habilidades as { categoria: Translatable }[]) {
    const clave = catKey(s.categoria)
    if (!vistas.has(clave)) vistas.set(clave, s.categoria)
  }
  return [...vistas].map(([clave, valor]) => ({ clave, valor }))
})


const activeSkillTooltip = ref<string | null>(null)
const flippedSkill = ref<string | null>(null)
const showAchievement = ref(false)
const achievementTitle = ref('')
const achievementDesc = ref('')
const achievementIcon = ref('mdi:trophy')
const showSecretPanel = ref(false)
// El panel usa v-show para no recrear su DOM en cada apertura, pero eso haría
// que sus imágenes se descargaran al cargar la página. Se difiere el src hasta
// que se abre por primera vez; después quedan en el DOM y no se vuelven a pedir.
const secretPanelSeen = ref(false)
watch(showSecretPanel, (open) => {
  if (open) secretPanelSeen.value = true
})
const profileImageVisible = ref(false)
const profileImageRef = ref<HTMLElement | null>(null)

interface EasterEgg {
  key: string
  /** Prefijo de las claves de i18n: egg.<id>.nombre / .desc / .hint */
  id: string
  icon: string
  img?: string
  color?: string
  mark?: boolean
}

const easterEggs: EasterEgg[] = [
  { key: 'easter-egg-flip', id: 'flip', icon: 'mdi:rotate-3d-variant' },
  { key: 'easter-egg-konami', id: 'konami', icon: '', img: 'img/games/contra-logo.png' },
  { key: 'easter-egg-logo', id: 'logo', icon: '', img: 'img/games/dragon-ball.svg' },
  { key: 'easter-egg-zelda', id: 'zelda', icon: 'mdi:zelda', color: '#ffd700' },
  { key: 'easter-egg-profile', id: 'profile', icon: '', mark: true },
  { key: 'easter-egg-sphere', id: 'sphere', icon: 'mdi:orbit' },
]

// Los textos se resuelven en cada render para que cambien con el idioma.
const eggName = (e: EasterEgg) => t(`egg.${e.id}.nombre` as UiKey)
const eggDesc = (e: EasterEgg) => t(`egg.${e.id}.desc` as UiKey)
const eggHint = (e: EasterEgg) => t(`egg.${e.id}.hint` as UiKey)

const discoveredKeys = ref(new Set(easterEggs.filter(e => localStorage.getItem(e.key)).map(e => e.key)))
const easterEggCount = computed(() => discoveredKeys.value.size)

const emitEggUpdate = () => {
  window.dispatchEvent(new CustomEvent('easter-egg-update', { detail: { count: easterEggCount.value, total: easterEggs.length } }))
}
watch(easterEggCount, emitEggUpdate)

const supportsHover = window.matchMedia('(hover: hover)').matches

const achievementSound = new Audio(`${import.meta.env.BASE_URL}sounds/achievement-mp3-sound.mp3`)
const zeldaSound = new Audio(`${import.meta.env.BASE_URL}sounds/zelda-secret.mp3`)
const naviSound = new Audio(`${import.meta.env.BASE_URL}sounds/zelda-navi-watch-out.mp3`)
const dragonBallSound = new Audio(`${import.meta.env.BASE_URL}sounds/dragon_ball_radar.mp3`)
const oneUpSound = new Audio(`${import.meta.env.BASE_URL}sounds/1-up.mp3`)
const pauseSound = new Audio(`${import.meta.env.BASE_URL}sounds/pause.mp3`)

const eggSounds: Record<string, HTMLAudioElement> = {
  'easter-egg-flip': pauseSound,
  'easter-egg-zelda': zeldaSound,
  'easter-egg-profile': naviSound,
  'easter-egg-logo': dragonBallSound,
  'easter-egg-konami': oneUpSound,
}

const showToast = (icon: string, title: string, desc: string, sound?: HTMLAudioElement) => {
  achievementIcon.value = icon
  achievementTitle.value = title
  achievementDesc.value = desc
  showAchievement.value = true
  ;(sound || achievementSound).play().catch(() => {})
  setTimeout(() => { showAchievement.value = false }, 4000)
}

const triggerEasterEgg = (key: string) => {
  const egg = easterEggs.find(e => e.key === key)
  if (!egg) return
  if (localStorage.getItem(key)) return
  localStorage.setItem(key, '1')
  discoveredKeys.value = new Set([...discoveredKeys.value, key])
  showToast('mdi:trophy', t('egg.desbloqueado'), eggName(egg), eggSounds[key])
}

const replayEasterEgg = (egg: typeof easterEggs[number]) => {
  showToast(egg.icon || 'mdi:trophy', t('egg.yaDesbloqueado'), `"${eggName(egg)}" — ${t('egg.yaLoEncontraste')}`, eggSounds[egg.key])
}

const toggleFlip = (titulo: string, event: Event) => {
  event.stopPropagation()
  flippedSkill.value = flippedSkill.value === titulo ? null : titulo
  triggerEasterEgg('easter-egg-flip')
}

const closeFlip = () => {
  flippedSkill.value = null
}

const featuredProjects = computed(() =>
  proyectos.filter((p: { featured?: boolean }) => p.featured)
)

const regularProjects = computed(() =>
  proyectos.filter((p: { featured?: boolean }) => !p.featured)
)

// Resuelve rutas de imágenes locales respetando el "base" configurado en Vite
// (necesario porque en GitHub Pages el sitio se sirve desde una subruta, ej. /portfolio-v2/)
const resolveImg = (path: string): string => {
  if (!path) return path
  if (/^https?:\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

const typingEl = ref<HTMLElement | null>(null)

let typingTimeout: ReturnType<typeof setTimeout> | null = null

const startTypingEffect = () => {
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  const type = () => {
    const current = typingPhrases[locale.value][phraseIndex]!
    if (!typingEl.value) return

    if (!isDeleting) {
      typingEl.value.textContent = current.slice(0, charIndex + 1)
      charIndex++
      if (charIndex === current.length) {
        isDeleting = true
        typingTimeout = setTimeout(type, 2000)
        return
      }
      typingTimeout = setTimeout(type, 80)
    } else {
      typingEl.value.textContent = current.slice(0, charIndex - 1)
      charIndex--
      if (charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % typingPhrases[locale.value].length
        typingTimeout = setTimeout(type, 500)
        return
      }
      typingTimeout = setTimeout(type, 40)
    }
  }
  type()
}

let scrollObserver: IntersectionObserver | null = null

const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
let konamiIndex = 0
const zeldaWord = 'zelda'
let zeldaIndex = 0

let logoClickCount = 0
let logoClickTimer: ReturnType<typeof setTimeout> | null = null

const handleLogoClick = () => {
  logoClickCount++
  if (logoClickTimer) clearTimeout(logoClickTimer)
  logoClickTimer = setTimeout(() => { logoClickCount = 0 }, 1000)
  if (logoClickCount >= 7) {
    logoClickCount = 0
    triggerEasterEgg('easter-egg-logo')
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === konamiSequence[konamiIndex]) {
    konamiIndex++
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0
      triggerEasterEgg('easter-egg-konami')
      flipGravity()
    }
  } else {
    konamiIndex = 0
  }

  const key = e.key.toLowerCase()
  if (key === zeldaWord[zeldaIndex]) {
    zeldaIndex++
    if (zeldaIndex === zeldaWord.length) {
      zeldaIndex = 0
      triggerEasterEgg('easter-egg-zelda')
    }
  } else {
    zeldaIndex = key === zeldaWord[0] ? 1 : 0
  }
}

// Mobile Konami: swipe ↑↑↓↓←→←→ then tap B(right) A(left) within 2s
const mobileKonamiSwipes = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right']
let mSwipeIndex = 0
let mTouchStartX = 0
let mTouchStartY = 0
let mWaitingBA = false
let mBaTimer: ReturnType<typeof setTimeout> | null = null
let mBPressed = false

const handleMobileTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0]!
  mTouchStartX = touch.clientX
  mTouchStartY = touch.clientY
}

const handleMobileTouchEnd = (e: Event) => {
  const touch = (e as TouchEvent).changedTouches[0]!
  const dx = touch.clientX - mTouchStartX
  const dy = touch.clientY - mTouchStartY
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)

  if (mWaitingBA) {
    const isTap = absDx < 15 && absDy < 15
    if (!isTap) return
    const midX = window.innerWidth / 2
    if (!mBPressed && touch.clientX > midX) {
      mBPressed = true
    } else if (mBPressed && touch.clientX <= midX) {
      mBPressed = false
      mWaitingBA = false
      if (mBaTimer) clearTimeout(mBaTimer)
      triggerEasterEgg('easter-egg-konami')
      flipGravity()
    }
    return
  }

  if (absDx < 40 && absDy < 40) return
  let dir: string
  if (absDx > absDy) dir = dx > 0 ? 'right' : 'left'
  else dir = dy > 0 ? 'down' : 'up'

  if (dir === mobileKonamiSwipes[mSwipeIndex]) {
    mSwipeIndex++
    if (mSwipeIndex === mobileKonamiSwipes.length) {
      mSwipeIndex = 0
      mWaitingBA = true
      mBPressed = false
      mBaTimer = setTimeout(() => { mWaitingBA = false; mBPressed = false }, 2000)
    }
  } else {
    mSwipeIndex = 0
  }
}

const flipGravity = () => {
  const section = document.querySelector('.physics-container')
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'center' })
  setTimeout(() => window.dispatchEvent(new Event('flip-gravity')), 600)
}

// Z gesture: right → diagonal down-left → right
let zStrokes: string[] = []
let zGestureStart: { x: number; y: number } | null = null
let zLastStrokeTime = 0

const handleZTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0]
  if (!touch) return
  zGestureStart = { x: touch.clientX, y: touch.clientY }
}

const handleZTouchEnd = (e: TouchEvent) => {
  if (!zGestureStart) return
  const touch = e.changedTouches[0]
  if (!touch) return
  const dx = touch.clientX - zGestureStart.x
  const dy = touch.clientY - zGestureStart.y
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  if (absDx < 40 && absDy < 40) return

  const now = Date.now()
  if (now - zLastStrokeTime > 2000) zStrokes = []
  zLastStrokeTime = now

  let dir = ''
  if (absDx > absDy * 2 && dx > 0) dir = 'right'
  else if (absDy > absDx * 0.5 && dy > 0 && dx < 0) dir = 'down-left'

  const expected = ['right', 'down-left', 'right']
  if (dir === expected[zStrokes.length]) {
    zStrokes.push(dir)
    if (zStrokes.length === 3) {
      zStrokes = []
      triggerEasterEgg('easter-egg-zelda')
    }
  } else {
    zStrokes = dir === 'right' ? ['right'] : []
  }
  zGestureStart = null
}

const openSecretPanel = () => {
  showSecretPanel.value = true
}

onMounted(() => {
  startTypingEffect()
  setTimeout(emitEggUpdate, 100)
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('logo-click', handleLogoClick)
  window.addEventListener('open-secret-panel', openSecretPanel)
  window.addEventListener('touchstart', handleMobileTouchStart, { passive: true })
  window.addEventListener('touchend', handleMobileTouchEnd, { passive: true })
  window.addEventListener('touchstart', handleZTouchStart, { passive: true })
  window.addEventListener('touchend', handleZTouchEnd, { passive: true })

  scrollObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          scrollObserver?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    scrollObserver?.observe(el)
  })

  if (profileImageRef.value) {
    const profileObserver = new IntersectionObserver(
      ([entry]) => {
        profileImageVisible.value = entry!.isIntersecting
        if (entry!.isIntersecting) {
          triggerEasterEgg('easter-egg-profile')
        }
      },
      { threshold: 0.5 }
    )
    profileObserver.observe(profileImageRef.value)
  }
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  scrollObserver?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('logo-click', handleLogoClick)
  window.removeEventListener('open-secret-panel', openSecretPanel)
  window.removeEventListener('touchstart', handleMobileTouchStart)
  window.removeEventListener('touchend', handleMobileTouchEnd)
  window.removeEventListener('touchstart', handleZTouchStart)
  window.removeEventListener('touchend', handleZTouchEnd)
  if (mBaTimer) clearTimeout(mBaTimer)
})

const activeTab = ref('experiencia')

const showCertificado = ref(false)
const certificadoImg = ref('')
const certificadoTitle = ref('')
const certificadoLoaded = ref(false)

const openCertificado = (edu: { titulo: Translatable; certificado?: string }) => {
  if (!edu.certificado) return
  certificadoLoaded.value = false
  certificadoImg.value = edu.certificado
  certificadoTitle.value = tr(edu.titulo)
  showCertificado.value = true
  document.body.style.overflow = 'hidden'
}

const closeCertificado = () => {
  showCertificado.value = false
  document.body.style.overflow = 'auto'
}

const showModalRapidRiders = ref(false)
const showModalComercia = ref(false)
const showModalCV = ref(false)
// Hay un PDF por idioma, generado en build por scripts/generate-cv.js.
const pdfNombre = computed(() => `CV_Manuel_Henriquez_${locale.value.toUpperCase()}.pdf`)
const pdfUrl = computed(() => resolveImg(pdfNombre.value))

const openCvModal = () => {
  showModalCV.value = true
  document.body.style.overflow = 'hidden'
}

const closeModalCV = () => {
  showModalCV.value = false
  document.body.style.overflow = 'auto'
}

const downloadCV = () => {
  const link = document.createElement('a')
  link.href = pdfUrl.value
  link.download = pdfNombre.value
  link.click()
}

const openModalRapidRiders = () => {
  showModalRapidRiders.value = true
  document.body.style.overflow = 'hidden'
}

const closeModalRapidRiders = () => {
  showModalRapidRiders.value = false
  document.body.style.overflow = 'auto'
}

let tooltipTimeout: ReturnType<typeof setTimeout> | null = null

const animateSkill = (skill: { titulo: string }, event: MouseEvent) => {
  const card = (event.currentTarget as HTMLElement)
  card.classList.remove('skill-clicked')
  void card.offsetWidth
  card.classList.add('skill-clicked')
  card.addEventListener('animationend', () => card.classList.remove('skill-clicked'), { once: true })

  if (activeSkillTooltip.value === skill.titulo) {
    activeSkillTooltip.value = null
    return
  }
  activeSkillTooltip.value = skill.titulo
  if (tooltipTimeout) clearTimeout(tooltipTimeout)
  tooltipTimeout = setTimeout(() => { activeSkillTooltip.value = null }, 5000)
}

const scrollToSkill = (titulo: string) => {
  const el = document.querySelector(`[data-skill="${titulo}"]`) as HTMLElement | null
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.classList.add('skill-highlight')
    setTimeout(() => el.classList.remove('skill-highlight'), 1500)

    setTimeout(() => {
      activeSkillTooltip.value = titulo
      if (tooltipTimeout) clearTimeout(tooltipTimeout)
      tooltipTimeout = setTimeout(() => { activeSkillTooltip.value = null }, 5000)
    }, 600)
  }
}

const openModalComercia = () => {
  showModalComercia.value = true
  document.body.style.overflow = 'hidden'
}

const closeModalComercia = () => {
  showModalComercia.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped src="../assets/mainView.css"></style>
