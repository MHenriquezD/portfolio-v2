<template>
  <div class="main-view" :class="{ 'light-theme': isLightTheme }" @click="closeFlip">
    <!-- Partículas de fondo -->
    <div class="particles-bg"></div>

    <!-- Sección Hero/Inicio -->
    <section id="inicio" class="hero-section">
      <div class="hero-content">
        <h2 class="hero-subtitle animate-text">Soy</h2>
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
            <i class="fas fa-file-pdf"></i> Descargar CV
          </button>
          <a href="#proyectos" class="btn-secondary">Ver Proyectos</a>
        </div>
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
                  <p class="timeline-period"><i class="fas fa-calendar-alt"></i> {{ exp.periodo }}</p>
                  <ul class="timeline-responsibilities">
                    <li v-for="(resp, i) in exp.responsabilidades" :key="i">{{ resp }}</li>
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

        <!-- Proyectos Featured -->
        <div
          v-for="fp in featuredProjects"
          :key="fp.id"
          class="featured-project scroll-reveal"
        >
          <div class="featured-image">
            <img :src="resolveImg(fp.img)" :alt="fp.titulo" />
            <div class="featured-badge">Destacado</div>
            <div class="project-overlay">
              <button v-if="fp.titulo === 'ComerciaHN'" @click="openModalComercia" class="overlay-btn">Ver Detalles</button>
              <a v-else-if="fp.url" :href="fp.url" target="_blank" class="overlay-btn">Visitar Sitio →</a>
            </div>
          </div>
          <div class="featured-content">
            <h3>{{ fp.titulo }}</h3>
            <p>{{ fp.descripcion }}</p>
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
            <div class="project-image" :class="{ 'has-screenshot': proyecto.img.startsWith('img/proyectos/') }">
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

    <!-- Sección Habilidades -->
    <section id="habilidades" class="skills-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">Habilidades Técnicas</h2>
        <p class="section-description scroll-reveal">
          Stack tecnológico con el que he trabajado. Siempre aprendiendo nuevas herramientas.
        </p>
        <p class="skills-hint scroll-reveal">
          <i class="fas fa-hand-pointer"></i> Toca una tarjeta para ver más detalles
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
              class="skill-card-wrapper"
              :class="{ flipped: flippedSkill === skill.titulo }"
              :data-skill="skill.titulo"
              @click="toggleFlip(skill.titulo, $event)"
            >
              <div class="skill-card-inner">
                <div class="skill-card-front">
                  <div class="skill-glow"></div>
                  <div class="skill-image">
                    <img :src="resolveImg(skill.img)" :alt="skill.titulo" />
                  </div>
                  <h3>{{ skill.titulo }}</h3>
                </div>
                <div class="skill-card-back">
                  <div class="skill-image skill-image-small">
                    <img :src="resolveImg(skill.img)" :alt="skill.titulo" />
                  </div>
                  <h3>{{ skill.titulo }}</h3>
                  <p>{{ skillDescriptions[skill.titulo] }}</p>
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
        />
      </div>
    </section>

    <!-- Sección Sobre Mí -->
    <section id="sobre-mi" class="about-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">Sobre Mí</h2>
        <div class="about-content scroll-reveal">
          <div class="about-image">
            <div class="image-wrapper">
              <img :src="resolveImg('img/mhenriquez.jpg')" alt="Manuel Henriquez" />
            </div>
          </div>
          <div class="about-text">
            <p>
              Soy un desarrollador web con más de 5 años de experiencia construyendo aplicaciones completas,
              desde el frontend hasta el backend. Empecé con curiosidad por entender cómo funcionaban las cosas
              y terminé convirtiendo esa curiosidad en mi profesión.
            </p>
            <p>
              He trabajado con equipos de diferentes tamaños, enfrentando retos que me han obligado a aprender
              rápido y adaptarme constantemente. Cada proyecto ha sido una oportunidad para mejorar y entregar
              soluciones que realmente funcionan.
            </p>
            <p>
              Me apasiona mantenerme al día con las tecnologías, buscar siempre la mejor manera de resolver
              problemas y crear software que haga la diferencia.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Contacto -->
    <section id="contacto" class="contact-section">
      <div class="container">
        <h2 class="section-title scroll-reveal">Contacto</h2>
        <p class="section-description scroll-reveal">
          Gracias por visitar mi portafolio. Si te interesa trabajar juntos, no dudes en contactarme.
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
              <div class="subproject-screenshot">
                <img :src="resolveImg(modulo.img)" :alt="modulo.titulo" />
              </div>
              <div class="subproject-body">
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
      </div>
    </Transition>

    <!-- Modal CV PDF -->
    <Transition name="modal">
      <div v-if="showModalCV" class="modal-overlay" @click="closeModalCV">
        <div class="modal-container modal-cv" @click.stop>
          <div class="modal-header">
            <h2>Curriculum Vitae</h2>
            <button @click="downloadCV" class="btn-download">
              <i class="fas fa-download"></i> Descargar CV
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

const skillDescriptions: Record<string, string> = {
  'JavaScript': 'Lenguaje principal para desarrollo web interactivo y dinámico',
  'TypeScript': 'Tipado estático sobre JavaScript para código más robusto',
  'Python': 'Automatización, scripting y desarrollo backend',
  'Java': 'Desarrollo de aplicaciones empresariales y multiplataforma',
  'C#': 'Desarrollo de aplicaciones .NET y videojuegos con Unity',
  'C++': 'Programación de sistemas y aplicaciones de alto rendimiento',
  'PHP': 'Desarrollo web backend y sistemas CMS',
  'React': 'Interfaces de usuario con componentes reutilizables',
  'VueJS': 'Framework progresivo para construir SPAs reactivas',
  'HTML': 'Estructura y semántica de páginas web',
  'CSS': 'Estilos, animaciones y diseño responsive',
  'TailwindCSS': 'Framework de utilidades CSS para diseño rápido',
  'Bootstrap': 'Componentes UI y grid system responsive',
  'JQuery': 'Manipulación del DOM y peticiones AJAX simplificadas',
  'NodeJS': 'JavaScript en el servidor para APIs y microservicios',
  'NestJS': 'Framework backend con arquitectura modular y escalable',
  'Express': 'Framework minimalista para APIs REST en Node.js',
  'Spring Boot': 'Framework Java para aplicaciones empresariales',
  'Laravel': 'Framework PHP con ORM Eloquent y Blade templates',
  'Prisma': 'ORM moderno con tipado automático para bases de datos',
  'PostgreSQL': 'Base de datos relacional robusta y escalable',
  'MySQL': 'Base de datos relacional ampliamente utilizada',
  'MongoDB': 'Base de datos NoSQL orientada a documentos JSON',
  'SQLite': 'Base de datos ligera embebida en la aplicación',
  'Git': 'Control de versiones y colaboración en equipo',
  'Docker': 'Contenedores para despliegue consistente de aplicaciones',
  'AWS': 'Servicios cloud: EC2, S3, Lambda y más',
  'Linux': 'Administración de servidores y entornos de desarrollo',
  'Ubuntu': 'Distribución Linux para servidores y desarrollo',
}

const activeSkillTooltip = ref<string | null>(null)
const flippedSkill = ref<string | null>(null)

const toggleFlip = (titulo: string, event: Event) => {
  event.stopPropagation()
  flippedSkill.value = flippedSkill.value === titulo ? null : titulo
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
