import type { Locale } from '@/composables/useLocale'

/**
 * Textos de interfaz. El contenido del portafolio (proyectos, experiencia,
 * habilidades) vive en los JSON de datos con la forma { es, en }.
 */
const es = {
  // Navegación
  'nav.inicio': 'Inicio',
  'nav.trayectoria': 'Trayectoria',
  'nav.proyectos': 'Proyectos',
  'nav.habilidades': 'Habilidades',
  'nav.sobreMi': 'Sobre Mí',
  'nav.contacto': 'Contacto',
  'nav.temaOscuro': 'Modo Oscuro',
  'nav.temaClaro': 'Modo Claro',
  'nav.menu': 'Menú',
  'nav.idioma': 'English',
  'nav.idiomaTitulo': 'Switch to English',

  // Hero
  'hero.soy': 'Soy',
  'hero.descargarCV': 'Descargar CV',
  'hero.verProyectos': 'Ver Proyectos',

  // Trayectoria
  'trayectoria.titulo': 'Trayectoria',
  'trayectoria.descripcion': 'Mi recorrido profesional y formación académica.',
  'trayectoria.experiencia': 'Experiencia',
  'trayectoria.educacion': 'Educación',
  'trayectoria.verCertificado': 'Ver certificado',

  // Proyectos
  'proyectos.titulo': 'Proyectos Destacados',
  'proyectos.destacado': 'Destacado',
  'proyectos.verDetalles': 'Ver Detalles',
  'proyectos.verSitio': 'Visitar Sitio →',
  'proyectos.verGithub': 'Ver en GitHub →',

  // Habilidades
  'habilidades.titulo': 'Habilidades Técnicas',
  'habilidades.descripcion':
    'Stack tecnológico con el que he trabajado. Siempre aprendiendo nuevas herramientas.',
  'habilidades.ayuda': 'Toca una tarjeta para ver más detalles',

  // Sobre mí
  'sobreMi.titulo': 'Sobre Mí',
  'sobreMi.p1':
    'Soy un desarrollador web con más de 5 años de experiencia construyendo aplicaciones completas, desde el frontend hasta el backend. Empecé con curiosidad por entender cómo funcionaban las cosas y terminé convirtiendo esa curiosidad en mi profesión.',
  'sobreMi.p2':
    'He trabajado con equipos de diferentes tamaños, enfrentando retos que me han obligado a aprender rápido y adaptarme constantemente. Cada proyecto ha sido una oportunidad para mejorar y entregar soluciones que realmente funcionan.',
  'sobreMi.p3':
    'Me apasiona mantenerme al día con las tecnologías, buscar siempre la mejor manera de resolver problemas y crear software que haga la diferencia.',

  // Contacto
  'contacto.titulo': 'Contacto',
  'contacto.descripcion':
    'Gracias por visitar mi portafolio. Si te interesa trabajar juntos, no dudes en contactarme.',
  'footer.derechos': 'Todos los derechos reservados',

  // Modales
  'modal.rapidRidersTitulo': 'RapidRiders - Subproyectos',
  'modal.rapidRidersDesc': 'Selecciona un módulo para ver más detalles',
  'modal.comerciaTitulo': 'ComerciaHN - Módulos del Sistema',
  'modal.comerciaDesc': 'Explora los diferentes componentes de la plataforma',
  'modal.cvTitulo': 'Curriculum Vitae',
  'modal.cerrar': 'Cerrar',

  // Easter eggs
  'egg.panelTitulo': 'Panel Secreto',
  'egg.contador': 'Easter Eggs',
  'egg.desbloqueado': 'Easter Egg Desbloqueado',
  'egg.yaDesbloqueado': 'Ya desbloqueado',
  'egg.yaLoEncontraste': 'ya lo encontraste',
  'egg.oculto': '???',
  'egg.flip.nombre': 'Flip Secreto',
  'egg.flip.desc': 'Haz click en una skill card',
  'egg.flip.hint': 'Las cartas siempre tienen dos caras...',
  'egg.konami.nombre': 'Konami Code',
  'egg.konami.desc': '↑↑↓↓←→←→BA',
  'egg.konami.hint': '30 vidas extra, si sabes el código',
  'egg.logo.nombre': '¡Sal de ahí, Shenlong!',
  'egg.logo.desc': 'Toca el logo MH varias veces',
  'egg.logo.hint': 'Invoca a Shenlong tocando 7 veces donde empieza todo',
  'egg.zelda.nombre': "It's Dangerous to Go Alone",
  'egg.zelda.desc': 'La Trifuerza se invoca: escribe "zelda" en PC o traza la Z en móvil',
  'egg.zelda.hint': 'Nombra a la princesa con el teclado, o dibuja su inicial con el dedo',
  'egg.profile.nombre': 'Sobre Mí',
  'egg.profile.desc': 'Descubre la sección Sobre Mí',
  'egg.profile.hint': 'A veces hay que bajar para encontrar algo',
  'egg.sphere.nombre': 'Hasta la Vista',
  'egg.sphere.desc': 'Lanza una esfera fuera del canvas',
  'egg.sphere.hint': 'Algunas cosas se rompen si las empujas fuerte...',
}

const en: Record<keyof typeof es, string> = {
  // Navigation
  'nav.inicio': 'Home',
  'nav.trayectoria': 'Career',
  'nav.proyectos': 'Projects',
  'nav.habilidades': 'Skills',
  'nav.sobreMi': 'About Me',
  'nav.contacto': 'Contact',
  'nav.temaOscuro': 'Dark Mode',
  'nav.temaClaro': 'Light Mode',
  'nav.menu': 'Menu',
  'nav.idioma': 'Español',
  'nav.idiomaTitulo': 'Cambiar a Español',

  // Hero
  'hero.soy': "I'm",
  'hero.descargarCV': 'Download CV',
  'hero.verProyectos': 'View Projects',

  // Career
  'trayectoria.titulo': 'Career',
  'trayectoria.descripcion': 'My professional journey and academic background.',
  'trayectoria.experiencia': 'Experience',
  'trayectoria.educacion': 'Education',
  'trayectoria.verCertificado': 'View certificate',

  // Projects
  'proyectos.titulo': 'Featured Projects',
  'proyectos.destacado': 'Featured',
  'proyectos.verDetalles': 'View Details',
  'proyectos.verSitio': 'Visit Site →',
  'proyectos.verGithub': 'View on GitHub →',

  // Skills
  'habilidades.titulo': 'Technical Skills',
  'habilidades.descripcion':
    "The tech stack I've worked with. Always learning new tools.",
  'habilidades.ayuda': 'Tap a card to see more details',

  // About me
  'sobreMi.titulo': 'About Me',
  'sobreMi.p1':
    "I'm a web developer with over 5 years of experience building complete applications, from frontend to backend. I started out curious about how things worked and ended up turning that curiosity into my profession.",
  'sobreMi.p2':
    "I've worked with teams of different sizes, facing challenges that pushed me to learn fast and adapt constantly. Every project has been a chance to improve and deliver solutions that actually work.",
  'sobreMi.p3':
    'I love keeping up with new technologies, always looking for the best way to solve problems and build software that makes a difference.',

  // Contact
  'contacto.titulo': 'Contact',
  'contacto.descripcion':
    "Thanks for visiting my portfolio. If you'd like to work together, feel free to reach out.",
  'footer.derechos': 'All rights reserved',

  // Modals
  'modal.rapidRidersTitulo': 'RapidRiders - Subprojects',
  'modal.rapidRidersDesc': 'Select a module to see more details',
  'modal.comerciaTitulo': 'ComerciaHN - System Modules',
  'modal.comerciaDesc': 'Explore the different components of the platform',
  'modal.cvTitulo': 'Curriculum Vitae',
  'modal.cerrar': 'Close',

  // Easter eggs
  'egg.panelTitulo': 'Secret Panel',
  'egg.contador': 'Easter Eggs',
  'egg.desbloqueado': 'Easter Egg Unlocked',
  'egg.yaDesbloqueado': 'Already unlocked',
  'egg.yaLoEncontraste': 'you already found it',
  'egg.oculto': '???',
  'egg.flip.nombre': 'Secret Flip',
  'egg.flip.desc': 'Click on a skill card',
  'egg.flip.hint': 'Cards always have two sides...',
  'egg.konami.nombre': 'Konami Code',
  'egg.konami.desc': '↑↑↓↓←→←→BA',
  'egg.konami.hint': '30 extra lives, if you know the code',
  'egg.logo.nombre': 'Come Forth, Shenron!',
  'egg.logo.desc': 'Tap the MH logo several times',
  'egg.logo.hint': 'Summon Shenron by tapping 7 times where it all begins',
  'egg.zelda.nombre': "It's Dangerous to Go Alone",
  'egg.zelda.desc': 'Summon the Triforce: type "zelda" on desktop or draw a Z on mobile',
  'egg.zelda.hint': 'Name the princess with your keyboard, or draw her initial with your finger',
  'egg.profile.nombre': 'About Me',
  'egg.profile.desc': 'Discover the About Me section',
  'egg.profile.hint': 'Sometimes you have to scroll down to find something',
  'egg.sphere.nombre': 'Hasta la Vista',
  'egg.sphere.desc': 'Throw a sphere out of the canvas',
  'egg.sphere.hint': 'Some things break if you push them too hard...',
}

export type UiKey = keyof typeof es

export const ui: Record<Locale, Record<UiKey, string>> = { es, en }
