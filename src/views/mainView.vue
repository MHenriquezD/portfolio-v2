<template>
  <div class="main-view" :class="{ 'light-theme': isLightTheme }">
    <!-- Partículas de fondo -->
    <div class="particles-bg"></div>

    <!-- Sección Hero/Inicio -->
    <section id="inicio" class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">👋 Hola, Bienvenido</div>
        <h2 class="hero-subtitle animate-text">Soy</h2>
        <h1 class="hero-title animate-text">Manuel Henriquez</h1>
        <p class="hero-role animate-text">
          <span class="typing-effect">Desarrollador Full Stack</span>
        </p>
        <div class="hero-cta">
          <a href="#proyectos" class="btn-primary">Ver Proyectos</a>
          <button @click="openCvModal" class="btn-cv">
            <i class="fas fa-file-pdf"></i> Ver CV
          </button>
          <a href="#contacto" class="btn-secondary">Contactar</a>
        </div>
      </div>
      <div class="scroll-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>

    <!-- Sección Sobre Mí -->
    <section id="sobre-mi" class="about-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Acerca de Mí</h2>
        <div class="about-content">
          <div class="about-image" data-aos="fade-right">
            <div class="image-wrapper">
              <img src="/img/mhenriquez.png" alt="Perfil" />
              <div class="image-overlay"></div>
            </div>
          </div>
          <div class="about-text" data-aos="fade-left">
            <p class="about-intro">
              Soy un desarrollador Full Stack apasionado por crear soluciones tecnológicas robustas
              y escalables. Mi enfoque está en el <span class="highlight">"Desarrollo WEB"</span>,
              donde combino creatividad y lógica para construir aplicaciones completas y eficientes.
            </p>
            <p>
              Con experiencia en proyectos reales y una sólida formación técnica, he desarrollado
              habilidades que abarcan todo el ciclo de desarrollo de software. Mi experiencia
              incluye:
            </p>
            <div class="achievements">
              <div class="achievement-item">
                <span class="achievement-icon">🎯</span>
                <p>Desarrollo Full Stack con dominio de front-end y back-end</p>
              </div>
              <div class="achievement-item">
                <span class="achievement-icon">🗄️</span>
                <p>Diseño y gestión de bases de datos relacionales y NoSQL</p>
              </div>
              <div class="achievement-item">
                <span class="achievement-icon">🎨</span>
                <p>Implementación de principios UI/UX en interfaces modernas</p>
              </div>
              <div class="achievement-item">
                <span class="achievement-icon">⚡</span>
                <p>Optimización de rendimiento y arquitecturas escalables</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Habilidades -->
    <section id="habilidades" class="skills-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Habilidades Técnicas</h2>
        <p class="section-description" data-aos="fade-up">
          Stack tecnológico con el que he trabajado. Siempre aprendiendo nuevas herramientas.
        </p>
        <div class="skills-grid">
          <div
            v-for="(skill, index) in habilidades"
            :key="skill.id"
            class="skill-card"
            :data-aos="'zoom-in'"
            :data-aos-delay="index * 50"
          >
            <div class="skill-glow"></div>
            <div class="skill-image">
              <img :src="skill.img" :alt="skill.titulo" />
            </div>
            <h3>{{ skill.titulo }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Educación -->
    <section id="educacion" class="education-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Educación y Certificaciones</h2>
        <p class="section-description" data-aos="fade-up">
          Mi formación académica y certificaciones profesionales que respaldan mi experiencia.
        </p>
        <div class="education-grid">
          <div
            v-for="(edu, index) in educacion"
            :key="edu.id"
            class="education-card"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <div class="education-icon">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <div class="education-content">
              <h3 class="education-title">{{ edu.titulo }}</h3>
              <p class="education-period">{{ edu.periodo }}</p>
              <p class="education-description">{{ edu.descripcion }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Experiencia -->
    <section id="experiencia" class="experience-section">
      <div class="container">
        <h2 class="section-title">Experiencia</h2>
        <p class="section-description">
          A lo largo de los años, he alcanzado ciertos logros y aprendido algunas habilidades.
          Siempre dispuesto a aprender mucho más.
        </p>
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
    </section>

    <!-- Sección Proyectos -->
    <section id="proyectos" class="projects-section">
      <div class="container">
        <h2 class="section-title" data-aos="fade-up">Proyectos Destacados</h2>
        <p class="section-description" data-aos="fade-up">
          Una selección de mis trabajos más recientes y relevantes.
        </p>
        <div class="projects-grid">
          <div
            v-for="(proyecto, index) in proyectos"
            :key="proyecto.id"
            class="project-card"
            :data-aos="'fade-up'"
            :data-aos-delay="index * 100"
          >
            <div class="project-image">
              <img :src="proyecto.img" :alt="proyecto.titulo" />
              <div class="project-overlay">
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
                <button
                  v-else-if="proyecto.id === 4"
                  @click="openModalComercia"
                  class="overlay-btn"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
            <div class="project-content">
              <h3>{{ proyecto.titulo }}</h3>
              <p>{{ proyecto.descripcion }}</p>
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
            <iframe v-if="pdfUrl" :src="pdfUrl" class="pdf-iframe"></iframe>
            <div v-else class="loading-pdf">
              <i class="fas fa-spinner fa-spin"></i>
              <p>Generando PDF...</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <footer class="footer">
      <p>Copyright © 2025. All Rights Reserved</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import data from '../app/data/portfolio-data.json'
import { useCreatePdf } from '@/composables/createPdf'

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

const showModalRapidRiders = ref(false)
const showModalComercia = ref(false)
const showModalCV = ref(false)
const pdfUrl = ref<string>('')

const { generateCV, getPdfUrl } = useCreatePdf()

const openCvModal = async () => {
  showModalCV.value = true
  document.body.style.overflow = 'hidden'
  pdfUrl.value = '' // Reset URL
  try {
    pdfUrl.value = await getPdfUrl()
  } catch (error) {
    console.error('Error generando PDF:', error)
  }
}

const closeModalCV = () => {
  showModalCV.value = false
  document.body.style.overflow = 'auto'
  pdfUrl.value = ''
}

const downloadCV = () => {
  generateCV()
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
