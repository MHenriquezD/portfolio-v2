// Script de migración: agrega traducciones al inglés en portfolio-data.json,
// convirtiendo los campos de texto a la forma { es, en }.
// Se ejecuta una sola vez; queda versionado por si hay que repetirlo.
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ruta = resolve(__dirname, '../src/app/data/portfolio-data.json')
const d = JSON.parse(readFileSync(ruta, 'utf-8'))

const par = (es, en) => ({ es, en })
const faltantes = []

const CATEGORIAS = {
  Lenguajes: 'Languages',
  Frontend: 'Frontend',
  Backend: 'Backend',
  'Bases de Datos': 'Databases',
  'DevOps y Herramientas': 'DevOps & Tools',
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

const CARGOS = {
  'Desarrollador Semi-Senior': 'Semi-Senior Developer',
  'Desarrollador Back-End': 'Back-End Developer',
  'Consultoría Tecnológica': 'Technology Consulting',
  'Web Developer': 'Web Developer',
}

const RESP = {
  'Refactorización y mejora continua de una aplicación heredada en React':
    'Refactoring and continuous improvement of a legacy React application',
  'Implementación de animaciones, buenas prácticas UX/UI y patrones escalables':
    'Implemented animations, UX/UI best practices and scalable patterns',
  'Incremento significativo en la productividad del equipo y la mantenibilidad del código':
    'Significant increase in team productivity and code maintainability',
  'Optimización y desarrollo backend con NestJS para múltiples plataformas: SSE, SIS, ComerciaHN y MIEL':
    'Backend development and optimization with NestJS across several platforms: SSE, SIS, ComerciaHN and MIEL',
  'Lideré la migración a versiones actualizadas, mejorando legibilidad y rendimiento':
    'Led the migration to updated versions, improving readability and performance',
  'Contribuí al crecimiento de ~300 a más de 1,000 emprendedores registrados en ComerciaHN':
    'Contributed to growth from ~300 to over 1,000 registered entrepreneurs on ComerciaHN',
  'Frontend con Nuxt (clientes) y Angular (admin)':
    'Frontend with Nuxt (customers) and Angular (admin)',
  'Desarrollo backend y soporte de Mi Empresa en Línea (MIEL 3.0)':
    'Backend development and support for Mi Empresa en Línea (MIEL 3.0)',
  'Plataforma pública que ayuda a pymes a constituirse de forma gratuita con asesoría legal completa':
    'Public platform that helps SMEs incorporate free of charge with full legal guidance',
  'Contribuí al crecimiento de ~100 a más de 3,000 usuarios activos':
    'Contributed to growth from ~100 to over 3,000 active users',
  'Desarrollo backend centrado en el SIS (Sistema Integral de Servicios)':
    'Backend development focused on SIS (Comprehensive Services System)',
  'Gestión de bases de datos y migración a TypeScript':
    'Database management and migration to TypeScript',
  'Optimización de consultas y estabilización de la arquitectura del proyecto':
    'Query optimization and stabilization of the project architecture',
  'Desarrollo y mejoramiento de ATKi POS, sistema punto de venta':
    'Development and improvement of ATKi POS, a point-of-sale system',
  'Sistema con cálculo de ISV y contabilidad integrada':
    'System with sales-tax calculation and built-in accounting',
  'Primer trabajo profesional: aprendizaje de trabajo en equipo y comunicación efectiva':
    'First professional role: learning teamwork and effective communication',
}

const EDU_TITULO = {
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

const PROY_DESC = {
  ComerciaHN:
    "Honduras' national government marketplace, connecting over 1,000 Honduran entrepreneurs with local and international consumers. The system includes a product catalog, shopping cart, payment gateways, inventory management, an admin panel with analytics and a CRM for sellers. It grew from ~300 to over 1,000 registered entrepreneurs during my time on the project. Backend with NestJS and TypeScript, PostgreSQL with Prisma as ORM, and frontend with Nuxt (customers) and Angular (administration).",
  'Mi Empresa en Línea (MIEL)':
    'Honduran government digital platform that lets businesses be created and incorporated 100% online, free of charge and available 24/7, in line with the Employment Generation Act. The system guides users step by step from registration to obtaining legal documents, integrating validations with government institutions. Over 3,000 active users, with hundreds of companies incorporated monthly. Robust backend architecture with NestJS and TypeScript, PostgreSQL for persistence, and Prisma as ORM.',
  RapidRiders:
    'Full-stack web application built as a university project for managing delivery services. It implements a complete architecture with three specialized interfaces: an admin panel for supervision and reporting, a customer app for placing orders, and a driver system that handles deliveries in real time. Built from scratch with a RESTful architecture, it includes JWT authentication, real-time geolocation, notifications and order-state management. Tech stack: Node.js, TypeScript, Express and MongoDB on the backend, with a frontend in Bootstrap and JavaScript.',
  'ATKi Software':
    'SaaS business platform designed for end-to-end management of daily operations in real time. It provides complete modules for financial management, inventory control, electronic invoicing, human resources and data analysis through interactive dashboards. Aimed specifically at micro, small and medium businesses, it combines solid security, scalability and a friendly interface that lets users run their business efficiently without advanced technical knowledge.',
  'POS para Restaurantes':
    'Comprehensive point-of-sale (POS) system built specifically for restaurant management. It implements full table management, real-time orders, inventory control, electronic invoicing and sales reports. The architecture streamlines communication between waiters, kitchen and checkout, optimizing workflow and improving the customer experience. Built with JavaScript, PHP and MySQL, integrating frontend technologies such as jQuery and Bootstrap for a responsive, intuitive interface.',
  'Salón Azul FFAA':
    'Technical collaboration at the Salón Azul Computacional of the Honduran Air Force, providing support in software development and institutional systems. The work included requirements analysis, development of tailored technology solutions, maintenance of critical systems and technical training for staff. Experience in a government environment with high security standards and institutional protocol compliance.',
}

const SUB_DESC = {
  'RapidRiders Admins':
    'Front-end of the RapidRiders project, designed so administrators can carry out their role without friction.',
  'RapidRiders Clientes':
    'Front-end of the RapidRiders project, designed so customers can place their orders without trouble.',
  'RapidRiders Motoristas':
    'Front-end of the RapidRiders project, designed so drivers can view and complete their deliveries without trouble.',
  'RapidRiders Back-End (server)':
    'Back-end of the RapidRiders project: the core of the application, holding routes, connections, schemas, models and endpoints. Built to keep the application running as efficiently as possible.',
  'ComerciaHN Clientes':
    'Public marketplace with over 465 products from 981+ Honduran entrepreneurs across 15 departments. Catalog with search, shopping cart, payment gateways and a virtual storefront system. Built with Nuxt 3.',
  'ComerciaHN Admin':
    'Admin panel for entrepreneurs and administrators. Management of stores, products, orders, inventory, analytics and reports. Over 162 active stores. Built with Angular.',
}

const trad = (mapa, valor, etiqueta) => {
  if (valor in mapa) return par(valor, mapa[valor])
  faltantes.push(`${etiqueta}: ${valor.slice(0, 70)}`)
  return valor
}

for (const h of d.habilidades) {
  h.categoria = trad(CATEGORIAS, h.categoria, 'categoria')
}

for (const e of d.experiencia) {
  e.titulo = trad(CARGOS, e.titulo, 'cargo')
  e.periodo = trad(PERIODOS, e.periodo, 'periodo')
  for (const r of e.responsabilidades) {
    if (!(r in RESP)) faltantes.push(`responsabilidad: ${r.slice(0, 70)}`)
  }
  e.responsabilidades = par(
    e.responsabilidades,
    e.responsabilidades.map((r) => RESP[r] ?? r),
  )
}

for (const e of d.educacion) {
  e.titulo = trad(EDU_TITULO, e.titulo, 'edu.titulo')
  e.periodo = trad(PERIODOS, e.periodo, 'edu.periodo')
  e.descripcion = trad(EDU_DESC, e.descripcion, 'edu.descripcion')
}

for (const p of d.proyectos) {
  if (p.titulo in PROY_DESC) p.descripcion = par(p.descripcion, PROY_DESC[p.titulo])
  else faltantes.push(`proyecto: ${p.titulo}`)
}

for (const lista of ['rapidRidersProyectos', 'ComerciaHN']) {
  for (const sp of d[lista]) {
    if (sp.titulo in SUB_DESC) sp.descripcion = par(sp.descripcion, SUB_DESC[sp.titulo])
    else faltantes.push(`subproyecto: ${sp.titulo}`)
  }
}

writeFileSync(ruta, JSON.stringify(d, null, 2) + '\n', 'utf-8')
console.log(`Sin traducir: ${faltantes.length}`)
faltantes.forEach((f) => console.log('  -', f))
