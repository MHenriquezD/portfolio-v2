<template>
  <div class="main-view" :class="{ 'light-theme': isLightTheme }">
    <!-- Partículas de fondo -->
    <div class="particles-bg"></div>

    <!-- Sección Hero/Inicio con About integrado -->
    <section id="inicio" class="hero-section">
      <div class="hero-content">
        <div class="hero-top">
          <div class="hero-info">
            <div class="hero-badge">
              <svg class="badge-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              Hola, Bienvenido
            </div>
            <h2 class="hero-subtitle animate-text">Soy</h2>
            <h1 class="hero-title animate-text">Manuel Henriquez</h1>
            <p class="hero-role animate-text">
              <span class="typing-effect" ref="typingEl"></span>
            </p>
            <p class="hero-description">
              Desarrollador Full Stack apasionado por crear soluciones tecnológicas robustas
              y escalables. Combino creatividad y lógica para construir aplicaciones
              <span class="highlight">WEB</span> completas y eficientes.
            </p>
            <div class="hero-cta">
              <a href="#proyectos" class="btn-primary">Ver Proyectos</a>
              <button @click="openCvModal" class="btn-cv">
                <i class="fas fa-file-pdf"></i> Ver CV
              </button>
              <a href="#contacto" class="btn-secondary">Contactar</a>
            </div>
          </div>
          <div class="hero-image">
            <div class="image-wrapper">
              <img :src="resolveImg('img/mhenriquez.png')" alt="Manuel Henriquez" />
              <div class="image-overlay"></div>
            </div>
          </div>
        </div>
        <div class="hero-highlights">
          <div class="highlight-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <span>Full Stack</span>
          </div>
          <div class="highlight-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
            <span>Bases de Datos</span>
          </div>
          <div class="highlight-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
            <span>UI/UX</span>
          </div>
          <div class="highlight-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span>Arquitecturas Escalables</span>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <!-- Sección Habilidades -->
    <section id="habilidades" class="skills-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">Habilidades Técnicas</h2>
        <p class="section-description scroll-reveal">
          Stack tecnológico con el que he trabajado. Siempre aprendiendo nuevas herramientas.
        </p>
        <div
          v-for="categoria in skillCategories"
          :key="categoria"
          class="skills-category scroll-reveal"
        >
          <h3 class="category-title">{{ categoria }}</h3>
          <div class="skills-grid">
            <div
              v-for="skill in habilidades.filter((s) => s.categoria === categoria)"
              :key="skill.id"
              class="skill-card"
            >
              <div class="skill-glow"></div>
              <div class="skill-image">
                <img :src="resolveImg(skill.img)" :alt="skill.titulo" />
              </div>
              <h3>{{ skill.titulo }}</h3>
            </div>
          </div>
        </div>
        <SkillsPhysics
          :skills="habilidades"
          :resolveImg="resolveImg"
          :isLightTheme="isLightTheme"
        />
      </div>
    </section>

    <!-- Sección Trayectoria (Experiencia + Educación) -->
    <section id="trayectoria" class="trajectory-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">Trayectoria</h2>
        <p class="section-description scroll-reveal">
          Mi recorrido profesional y formación académica.
        </p>
        <div class="trajectory-tabs">
          <button
            class="tab-btn"
            :class="{ 'tab-active': activeTab === 'experiencia' }"
            @click="activeTab = 'experiencia'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            Experiencia
          </button>
          <button
            class="tab-btn"
            :class="{ 'tab-active': activeTab === 'educacion' }"
            @click="activeTab = 'educacion'"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>
            Educación
          </button>
        </div>

        <Transition name="tab-fade" mode="out-in">
          <div v-if="activeTab === 'experiencia'" key="experiencia" class="tab-content">
            <div class="timeline">
              <div v-for="exp in experiencia" :key="exp.id" class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h3 class="timeline-title">{{ exp.titulo }}</h3>
                  <p class="timeline-period">{{ exp.periodo }}</p>
                  <p class="timeline-description" v-html="exp.descripcion"></p>
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
                  <h3 class="education-title">{{ edu.titulo }}</h3>
                  <p class="education-period">{{ edu.periodo }}</p>
                  <p class="education-description">{{ edu.descripcion }}</p>
                  <span v-if="edu.certificado" class="ver-certificado">
                    <i class="fas fa-certificate"></i> Ver certificado
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
        <h2 class="section-title scroll-reveal">Proyectos Destacados</h2>
        <p class="section-description scroll-reveal">
          Una selección de mis trabajos más recientes y relevantes.
        </p>

        <!-- Proyecto Featured -->
        <div
          v-if="featuredProject"
          class="featured-project scroll-reveal"
        >
          <div class="featured-image">
            <img :src="resolveImg(featuredProject.img)" :alt="featuredProject.titulo" />
            <div class="featured-badge">Destacado</div>
            <div class="project-overlay">
              <button @click="openModalComercia" class="overlay-btn">Ver Detalles</button>
            </div>
          </div>
          <div class="featured-content">
            <h3>{{ featuredProject.titulo }}</h3>
            <p>{{ featuredProject.descripcion }}</p>
            <div class="project-tags">
              <span v-for="tag in featuredProject.tags" :key="tag" class="project-tag">{{ tag }}</span>
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
            <div class="project-image">
              <img :src="resolveImg(proyecto.img)" :alt="proyecto.titulo" />
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
                  Ver Detalles
                </button>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ proyecto.titulo }}</h3>
              <p>{{ proyecto.descripcion }}</p>
              <div v-if="proyecto.tags" class="project-tags">
                <span v-for="tag in proyecto.tags" :key="tag" class="project-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Contacto -->
    <section id="contacto" class="contact-section">
      <div class="container">
        <h2 class="section-title">Contacto</h2>
        <p class="section-description">
          Mi información de contacto es la siguiente. Pueden encontrarme de las siguientes formas.
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
            {{ social.tipo.charAt(0).toUpperCase() + social.tipo.slice(1) }}
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
            <h2>RapidRiders - Subproyectos</h2>
            <p>Selecciona un módulo para ver más detalles</p>
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
                <p>{{ subproyecto.descripcion }}</p>
                <a :href="subproyecto.url" target="_blank" class="subproject-link">
                  Ver en GitHub →
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
            <h2>ComerciaHN - Módulos del Sistema</h2>
            <p>Explora los diferentes componentes de la plataforma</p>
          </div>
          <div class="modal-content">
            <div v-for="modulo in comerciaHNProyectos" :key="modulo.id" class="subproject-card">
              <div class="subproject-icon">
                <i :class="modulo.icon"></i>
              </div>
              <div class="subproject-info">
                <h3>{{ modulo.titulo }}</h3>
                <p>{{ modulo.descripcion }}</p>
                <a :href="modulo.url" target="_blank" class="subproject-link"> Visitar Sitio → </a>
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
          <button class="modal-close" @click="closeModalCV">
            <i class="fas fa-times"></i>
          </button>
          <div class="modal-header">
            <h2>Curriculum Vitae</h2>
            <button @click="downloadCV" class="btn-download">
              <i class="fas fa-download"></i> Descargar CV
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
          <img :src="resolveImg(certificadoImg)" :alt="certificadoTitle" class="modal-certificado-img" />
        </div>
      </div>
    </Transition>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Manuel Henriquez. All Rights Reserved</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import data from '../app/data/portfolio-data.json'
import SkillsPhysics from '@/components/SkillsPhysics.vue'

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

const skillCategories = computed(() =>
  [...new Set(habilidades.map((s: { categoria: string }) => s.categoria))]
)

const featuredProject = computed(() =>
  proyectos.find((p: { featured?: boolean }) => p.featured)
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
const typingPhrases = ['Desarrollador Full Stack', 'Backend Developer', 'Frontend Developer']
let typingTimeout: ReturnType<typeof setTimeout> | null = null

const startTypingEffect = () => {
  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false

  const type = () => {
    const current = typingPhrases[phraseIndex]!
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
        phraseIndex = (phraseIndex + 1) % typingPhrases.length
        typingTimeout = setTimeout(type, 500)
        return
      }
      typingTimeout = setTimeout(type, 40)
    }
  }
  type()
}

let scrollObserver: IntersectionObserver | null = null

onMounted(() => {
  startTypingEffect()

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
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
  scrollObserver?.disconnect()
})

const activeTab = ref('experiencia')

const showCertificado = ref(false)
const certificadoImg = ref('')
const certificadoTitle = ref('')

const openCertificado = (edu: { titulo: string; certificado?: string }) => {
  if (!edu.certificado) return
  certificadoImg.value = edu.certificado
  certificadoTitle.value = edu.titulo
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
const pdfUrl = resolveImg('CV_Manuel_Henriquez.pdf')

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
  link.href = pdfUrl
  link.download = 'CV_Manuel_Henriquez.pdf'
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
