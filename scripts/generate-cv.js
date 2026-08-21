import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

pdfMake.vfs = pdfFonts;

const cvData = JSON.parse(readFileSync(resolve(__dirname, '../src/app/data/cv.json'), 'utf-8'));

const LOCALES = ['es', 'en'];

/** Campos que pueden venir como { es, en } o como texto suelto sin traducir. */
const tr = (valor, locale) => {
  if (valor == null) return '';
  if (typeof valor === 'string') return valor;
  if (Array.isArray(valor)) return valor;
  return valor[locale] ?? valor.es ?? valor.en ?? '';
};

const ETIQUETAS = {
  es: {
    perfil: 'PERFIL',
    experiencia: 'EXPERIENCIA PROFESIONAL',
    habilidades: 'HABILIDADES TÉCNICAS',
    educacion: 'EDUCACIÓN',
    proyectos: 'PROYECTOS DESTACADOS',
    idiomas: 'IDIOMAS',
    referencias: 'REFERENCIAS',
    tecnologias: 'Tecnologías',
    asunto: 'Currículum Vitae',
  },
  en: {
    perfil: 'PROFILE',
    experiencia: 'PROFESSIONAL EXPERIENCE',
    habilidades: 'TECHNICAL SKILLS',
    educacion: 'EDUCATION',
    proyectos: 'FEATURED PROJECTS',
    idiomas: 'LANGUAGES',
    referencias: 'REFERENCES',
    tecnologias: 'Technologies',
    asunto: 'Curriculum Vitae',
  },
};

const separator = () => ({
  canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }],
  margin: [0, 8, 0, 8]
});

const construirDoc = (locale) => {
  const L = ETIQUETAS[locale];

  return {
    pageSize: 'LETTER',
    pageMargins: [40, 40, 40, 40],
    info: {
      title: `CV - Manuel Henriquez`,
      author: 'Manuel Henriquez',
      subject: L.asunto
    },
    content: [
      { text: tr(cvData.title, locale), style: 'name' },
      { text: 'Manuel Henriquez', style: 'subtitle' },
      {
        text: `${cvData.contact.email}  |  ${cvData.contact.phone}  |  ${cvData.contact.website}`,
        style: 'contactLine',
        margin: [0, 4, 0, 0]
      },

      separator(),

      { text: L.perfil, style: 'sectionHeader' },
      { text: tr(cvData.profile, locale), style: 'body', alignment: 'justify', margin: [0, 4, 0, 0] },

      separator(),

      { text: L.experiencia, style: 'sectionHeader' },
      ...cvData.experience.flatMap((exp, i) => [
        {
          columns: [
            { text: tr(exp.position, locale), style: 'itemTitle', width: '*' },
            { text: tr(exp.duration, locale), style: 'itemDate', width: 'auto', alignment: 'right' }
          ],
          margin: [0, i === 0 ? 4 : 10, 0, 1]
        },
        { text: exp.company, style: 'itemSubtitle', margin: [0, 0, 0, 3] },
        { ul: tr(exp.responsibilities, locale), style: 'body', margin: [10, 0, 0, 0] }
      ]),

      separator(),

      { text: L.habilidades, style: 'sectionHeader' },
      { text: cvData.skills.join('  •  '), style: 'body', margin: [0, 4, 0, 0] },

      separator(),

      { text: L.educacion, style: 'sectionHeader' },
      ...cvData.education.flatMap((edu, i) => [
        {
          columns: [
            { text: tr(edu.degree, locale), style: 'itemTitle', width: '*' },
            { text: tr(edu.duration, locale), style: 'itemDate', width: 'auto', alignment: 'right' }
          ],
          margin: [0, i === 0 ? 4 : 8, 0, 1]
        },
        { text: tr(edu.institution, locale), style: 'itemSubtitle' }
      ]),

      separator(),

      { text: L.proyectos, style: 'sectionHeader' },
      ...cvData.projects.slice(0, 3).flatMap((project, i) => [
        { text: project.name, style: 'itemTitle', margin: [0, i === 0 ? 4 : 8, 0, 1] },
        { text: tr(project.description, locale), style: 'body', alignment: 'justify' },
        ...(project.technologies ? [{
          text: `${L.tecnologias}: ${tr(project.technologies, locale)}`,
          style: 'techLine',
          margin: [0, 2, 0, 0]
        }] : [])
      ]),

      separator(),

      { text: L.idiomas, style: 'sectionHeader' },
      {
        text: cvData.languages
          .map((l) => `${tr(l.language, locale)} (${tr(l.level, locale)})`)
          .join('  •  '),
        style: 'body',
        margin: [0, 4, 0, 0]
      },

      separator(),

      { text: L.referencias, style: 'sectionHeader' },
      {
        columns: cvData.references.map(ref => ({
          stack: [
            { text: ref.name, style: 'refName' },
            { text: ref.tel, style: 'refPhone' }
          ]
        })),
        margin: [0, 4, 0, 0]
      }
    ],
    styles: {
      name: { fontSize: 22, bold: true, color: '#1a1a1a' },
      subtitle: { fontSize: 12, color: '#555555', margin: [0, 2, 0, 0] },
      contactLine: { fontSize: 9, color: '#666666' },
      sectionHeader: { fontSize: 11, bold: true, color: '#1a1a1a', characterSpacing: 1.5 },
      body: { fontSize: 9.5, color: '#333333', lineHeight: 1.4 },
      itemTitle: { fontSize: 10, bold: true, color: '#1a1a1a' },
      itemSubtitle: { fontSize: 9.5, italics: true, color: '#666666' },
      itemDate: { fontSize: 9, color: '#888888' },
      techLine: { fontSize: 9, italics: true, color: '#888888' },
      refName: { fontSize: 9, bold: true, color: '#333333' },
      refPhone: { fontSize: 8.5, color: '#888888' }
    },
    defaultStyle: { font: 'Roboto' }
  };
};

const generar = (locale) =>
  new Promise((resolveP) => {
    pdfMake.createPdf(construirDoc(locale)).getBuffer((buffer) => {
      const outPath = resolve(__dirname, `../public/CV_Manuel_Henriquez_${locale.toUpperCase()}.pdf`);
      writeFileSync(outPath, buffer);
      console.log(`PDF generado: ${outPath}`);
      resolveP();
    });
  });

for (const locale of LOCALES) {
  await generar(locale);
}
