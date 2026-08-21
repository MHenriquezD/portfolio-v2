// Migración: agrega traducciones al inglés en cv.json.
// Se ejecuta una sola vez; queda versionado por si hay que repetirlo.
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ruta = resolve(__dirname, '../src/app/data/cv.json')
const d = JSON.parse(readFileSync(ruta, 'utf-8'))

const par = (es, en) => ({ es, en })
const faltantes = []

const CARGOS = {
  'Desarrollador Semi Senior': 'Semi-Senior Developer',
  'Desarrollador Back-End': 'Back-End Developer',
  'Consultoría Tecnológica': 'Technology Consulting',
  'Web Developer': 'Web Developer',
}

const PERIODOS = {
  'Marzo 2026 - Actualidad': 'March 2026 - Present',
  'Enero 2025 - Febrero 2026': 'January 2025 - February 2026',
  'Jul 2024 - Dic 2024': 'Jul 2024 - Dec 2024',
  'Nov 2023 - Jun 2024': 'Nov 2023 - Jun 2024',
  '2021 - 2022': '2021 - 2022',
  '2026 - Actualidad': '2026 - Present',
  '2015 - 2023': '2015 - 2023',
  '2022 - 2022': '2022 - 2022',
  '2021 - 2021': '2021 - 2021',
  '2020 - 2020': '2020 - 2020',
  '2011 - 2014': '2011 - 2014',
}

const RESP = {
  'Refactorización y mejora de aplicación heredada en React, implementando buenas prácticas UX/UI y patrones escalables.':
    'Refactored and improved a legacy React application, applying UX/UI best practices and scalable patterns.',
  'Tecnologías: React, TypeScript, PostgreSQL, AWS':
    'Technologies: React, TypeScript, PostgreSQL, AWS',
  'Optimización backend de ComerciaHN, MIEL, SSE y SIS con NestJS. Crecimiento de ~300 a más de 1,000 emprendedores registrados en ComerciaHN.':
    'Backend optimization of ComerciaHN, MIEL, SSE and SIS with NestJS. Growth from ~300 to over 1,000 registered entrepreneurs on ComerciaHN.',
  'Tecnologías: NestJS, TypeScript, PostgreSQL, MongoDB, Prisma':
    'Technologies: NestJS, TypeScript, PostgreSQL, MongoDB, Prisma',
  'Desarrollo backend de MIEL 3.0, plataforma pública para constitución gratuita de pymes. Crecimiento de ~100 a más de 3,000 usuarios activos.':
    'Backend development of MIEL 3.0, a public platform for free SME incorporation. Growth from ~100 to over 3,000 active users.',
  'Tecnologías: NestJS, TypeScript, PostgreSQL': 'Technologies: NestJS, TypeScript, PostgreSQL',
  'Desarrollo backend centrado en el SIS (Sistema Integral de Servicios), gestión de bases de datos y migración a TypeScript.':
    'Backend development focused on SIS (Comprehensive Services System), database management and migration to TypeScript.',
  'Tecnologías: NestJS, TypeScript, PostgreSQL, MongoDB':
    'Technologies: NestJS, TypeScript, PostgreSQL, MongoDB',
  'Desarrollo y mejoramiento de ATKi POS, sistema punto de venta con cálculo de ISV y contabilidad integrada.':
    'Development and improvement of ATKi POS, a point-of-sale system with sales-tax calculation and built-in accounting.',
  'Tecnologías: PHP, jQuery, CSS, HTML': 'Technologies: PHP, jQuery, CSS, HTML',
}

const TITULOS = {
  'Ingeniería Informática': 'Computer Engineering',
  'Ingeniería en Sistemas': 'Systems Engineering',
  'NestJS de Cero a Experto': 'NestJS from Zero to Expert',
  'PCAP - Programming Essentials in Python': 'PCAP - Programming Essentials in Python',
  'Introduction to Cybersecurity': 'Introduction to Cybersecurity',
  'NDG Linux Unhatched': 'NDG Linux Unhatched',
  'Técnico en Computación': 'Computer Technician',
}

const EDU_DESC = {
  'Pasante universitario de la carrera Ingeniería Informática en la UNIMETRO.':
    'Undergraduate student of Computer Engineering at UNIMETRO.',
  'Pasante universitario de la carrera Ingeniería en Sistemas en la UNAH.':
    'Undergraduate student of Systems Engineering at UNAH.',
  'Curso de desarrollo back-end con NestJS, de Fernando Herrera en DevTalles.':
    'Back-end development course with NestJS, by Fernando Herrera at DevTalles.',
  'Curso de desarrollo en Python, de CISCO Networking Academy.':
    'Python development course, by CISCO Networking Academy.',
  'Curso de introducción a la cyber seguridad de CISCO Networking Academy.':
    'Introduction to cybersecurity course by CISCO Networking Academy.',
  'Curso de introduccion LINUX de CISCO Networking Academy.':
    'Introduction to Linux course by CISCO Networking Academy.',
  'Bachillerato técnico en computación.': 'Technical high school diploma in computing.',
}

const INSTITUCIONES = { Bachillerato: 'High School' }

const PROY_DESC = {
  ComerciaHN:
    'E-commerce platform built for SENPRENDE, connecting over 900 Honduran entrepreneurs with buyers. It offers 100% local products with national and international visibility, and free registration for sellers.',
  'ATKi Software':
    'System designed to manage a company’s daily operations in real time, efficiently, securely and simply. A solution for micro, small and medium businesses.',
  RapidRiders:
    'University full-stack project for monitoring drivers, customers and administrators. Includes every instance, route and endpoint built from scratch.',
  'Salón Azul FFAA':
    'Support provided at the computing hall (development) of the Honduran Air Force.',
  'POS para Restaurantes':
    'Restaurant point-of-sale designed to make things easier for both customers and staff. A complete order and payment management system.',
}

const IDIOMAS = { Español: 'Spanish', Inglés: 'English' }
const NIVELES = { Nativo: 'Native', Básico: 'Basic' }
const HOBBIES = {
  Programación: 'Programming',
  Videojuegos: 'Video games',
  Tecnología: 'Technology',
  Cine: 'Film',
}

const trad = (mapa, valor, etiqueta) => {
  if (valor in mapa) return par(valor, mapa[valor])
  faltantes.push(`${etiqueta}: ${String(valor).slice(0, 70)}`)
  return valor
}

d.title = par('Desarrollador Web Full Stack', 'Full Stack Web Developer')
d.profile = par(
  d.profile,
  'Web developer with over 5 years of experience building modern web applications, both front-end and back-end. Experienced in PHP, Node.js, JavaScript and TypeScript, working with frameworks such as Next.js, NestJS and Vue.js. Passionate about software development, continuous learning and professional growth, with the constant goal of sharpening my skills and building solutions that are more efficient, scalable and higher quality.',
)

for (const e of d.experience) {
  e.position = trad(CARGOS, e.position, 'cargo')
  e.duration = trad(PERIODOS, e.duration, 'periodo')
  for (const r of e.responsibilities) {
    if (!(r in RESP)) faltantes.push(`responsabilidad: ${r.slice(0, 70)}`)
  }
  e.responsibilities = par(
    e.responsibilities,
    e.responsibilities.map((r) => RESP[r] ?? r),
  )
}

for (const e of d.education) {
  e.degree = trad(TITULOS, e.degree, 'titulo')
  e.duration = trad(PERIODOS, e.duration, 'periodo')
  e.description = trad(EDU_DESC, e.description, 'descripcion')
  if (e.institution in INSTITUCIONES) {
    e.institution = par(e.institution, INSTITUCIONES[e.institution])
  }
}

for (const p of d.projects) {
  if (p.name in PROY_DESC) p.description = par(p.description, PROY_DESC[p.name])
  else faltantes.push(`proyecto: ${p.name}`)
  if (p.technologies) {
    p.technologies = par(p.technologies, p.technologies)
  }
}

d.languages = d.languages.map((l) => ({
  language: trad(IDIOMAS, l.language, 'idioma'),
  level: trad(NIVELES, l.level, 'nivel'),
}))

d.hobbies = par(
  d.hobbies,
  d.hobbies.map((h) => HOBBIES[h] ?? h),
)

writeFileSync(ruta, JSON.stringify(d, null, 2) + '\n', 'utf-8')
console.log(`Sin traducir: ${faltantes.length}`)
faltantes.forEach((f) => console.log('  -', f))
