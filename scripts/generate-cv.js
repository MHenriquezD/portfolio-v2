import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

pdfMake.vfs = pdfFonts;

const cvData = JSON.parse(readFileSync(resolve(__dirname, '../src/app/data/cv.json'), 'utf-8'));

const separator = () => ({
  canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 0.5, lineColor: '#cccccc' }],
  margin: [0, 8, 0, 8]
});

const docDefinition = {
  pageSize: 'LETTER',
  pageMargins: [40, 40, 40, 40],
  info: {
    title: 'CV - Manuel Henriquez',
    author: 'Manuel Henriquez',
    subject: 'Curriculum Vitae'
  },
  content: [
    { text: cvData.title, style: 'name' },
    { text: 'Manuel Henriquez', style: 'subtitle' },
    {
      text: `${cvData.contact.email}  |  ${cvData.contact.phone}  |  ${cvData.contact.website}`,
      style: 'contactLine',
      margin: [0, 4, 0, 0]
    },

    separator(),

    { text: 'PERFIL', style: 'sectionHeader' },
    { text: cvData.profile, style: 'body', alignment: 'justify', margin: [0, 4, 0, 0] },

    separator(),

    { text: 'EXPERIENCIA PROFESIONAL', style: 'sectionHeader' },
    ...cvData.experience.flatMap((exp, i) => [
      {
        columns: [
          { text: exp.position, style: 'itemTitle', width: '*' },
          { text: exp.duration, style: 'itemDate', width: 'auto', alignment: 'right' }
        ],
        margin: [0, i === 0 ? 4 : 10, 0, 1]
      },
      { text: exp.company, style: 'itemSubtitle', margin: [0, 0, 0, 3] },
      { ul: exp.responsibilities, style: 'body', margin: [10, 0, 0, 0] }
    ]),

    separator(),

    { text: 'HABILIDADES TÉCNICAS', style: 'sectionHeader' },
    { text: cvData.skills.join('  •  '), style: 'body', margin: [0, 4, 0, 0] },

    separator(),

    { text: 'EDUCACIÓN', style: 'sectionHeader' },
    ...cvData.education.flatMap((edu, i) => [
      {
        columns: [
          { text: edu.degree, style: 'itemTitle', width: '*' },
          { text: edu.duration, style: 'itemDate', width: 'auto', alignment: 'right' }
        ],
        margin: [0, i === 0 ? 4 : 8, 0, 1]
      },
      { text: edu.institution, style: 'itemSubtitle' }
    ]),

    separator(),

    { text: 'PROYECTOS DESTACADOS', style: 'sectionHeader' },
    ...cvData.projects.slice(0, 3).flatMap((project, i) => [
      { text: project.name, style: 'itemTitle', margin: [0, i === 0 ? 4 : 8, 0, 1] },
      { text: project.description, style: 'body', alignment: 'justify' },
      ...(project.technologies ? [{
        text: `Tecnologías: ${project.technologies}`,
        style: 'techLine',
        margin: [0, 2, 0, 0]
      }] : [])
    ]),

    separator(),

    { text: 'IDIOMAS', style: 'sectionHeader' },
    { text: cvData.languages.map(l => `${l.language} (${l.level})`).join('  •  '), style: 'body', margin: [0, 4, 0, 0] },

    separator(),

    { text: 'REFERENCIAS', style: 'sectionHeader' },
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

const pdfDoc = pdfMake.createPdf(docDefinition);

pdfDoc.getBuffer((buffer) => {
  const outPath = resolve(__dirname, '../public/CV_Manuel_Henriquez.pdf');
  writeFileSync(outPath, buffer);
  console.log(`PDF generado: ${outPath}`);
});
