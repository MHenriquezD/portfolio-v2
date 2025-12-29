import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import cvData from '@/app/data/cv.json';

// Configurar las fuentes
(pdfMake as any).vfs = pdfFonts;

// Función para convertir imagen a base64
const getImageBase64 = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error loading image:', error);
        // Retornar imagen placeholder en caso de error
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    }
};

export const useCreatePdf = () => {
    // Función centralizada para generar la definición del documento
    const getDocDefinition = async () => {
        const photoBase64 = await getImageBase64('/img/mhenriquez_rounded.png');
        const backgroundImage = await getImageBase64('/img/bg_cv3.jpeg');
        // Generar QR code desde API pública
        const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://mhenriquezdev.com/';
        const qrCodeBase64 = await getImageBase64(qrUrl);
        return {
            pageSize: 'LETTER',
            pageMargins: [35, 60, 50, 40],
            info: {
                title: cvData.name,
                author: cvData.subtitle,
                subject: 'Curriculum Vitae'
            },
            // Background personalizado (puedes modificar esto)
            background: function(currentPage: number, pageSize: any) {
                return {
                    canvas: [
                        // Imagen de fondo
                        {
                            type: 'rect',
                            x: 0,
                            y: 0,
                            w: pageSize.width,
                            h: pageSize.height,
                            color: '#ffffff'
                        }
                    ],
                    image: backgroundImage,
                    width: pageSize.width+35,
                    height: pageSize.height,
                    absolutePosition: { x: -7, y: 0 },
                    opacity: 0.7
                };
            },
            content: [
                // Layout de dos columnas
                {
                    columns: [
                        // COLUMNA IZQUIERDA - Información Personal (35%)
                        {
                            width: '35%',
                            stack: [
                                // Foto de perfil con borde circular
                                {
                                    stack: [
                                        {
                                            canvas: [
                                                {
                                                    type: 'ellipse',
                                                    x: 59,
                                                    y: 93,
                                                    r1: 65,
                                                    r2: 65,
                                                    color: '#ffffff',
                                                    lineWidth: 4,
                                                    lineColor: '#436780'
                                                }
                                            ],
                                            absolutePosition: { x: 65, y: 30 }
                                        },
                                        {
                                            image: photoBase64,
                                            width: 127,
                                            height: 127,
                                            r1: 65,
                                            r2: 65,
                                            alignment: 'center'
                                        }
                                    ],
                                    margin: [0, 0, 0, 13]
                                },
                                // Nombre
                                {
                                    text: cvData.subtitle.split(' - ')[1] || 'Manuel Henriquez',
                                    style: 'nameLeft',
                                    alignment: 'center',
                                    margin: [0, 0, 0, 5]
                                },
                                {
                                    text: cvData.title,
                                    style: 'titleLeft',
                                    alignment: 'center',
                                    margin: [0, 0, 0, 15]
                                },
                                // Línea separadora
                                {
                                    canvas: [
                                        {
                                            type: 'line',
                                            x1: 0,
                                            y1: 0,
                                            x2: 170,
                                            y2: 0,
                                            lineWidth: 1,
                                            lineColor: '#3498db'
                                        }
                                    ],
                                    margin: [0, 0, 0, 15]
                                },
                                // Contacto
                                {
                                    text: 'CONTACTO',
                                    style: 'sectionHeaderLeft',
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    stack: [
                                        {
                                            text: [
                                                { text: 'Email: ', bold: true },
                                                { text: cvData.contact.email, style: 'contactText' }
                                            ],
                                            style: 'contactText',
                                            margin: [0, 0, 0, 6]
                                        },
                                        {
                                            text: [
                                                { text: 'Tel: ', bold: true },
                                                { text: cvData.contact.phone, style: 'contactText' }
                                            ],
                                            style: 'contactText',
                                            margin: [0, 0, 0, 6]
                                        },
                                        {
                                            text: [
                                                { text: 'Web: ', bold: true },
                                                { text: 'mhenriquezdev.com', style: 'contactText', link: cvData.contact.website }
                                            ],
                                            style: 'contactText',
                                            margin: [0, 0, 0, 6]
                                        },
                                        {
                                            text: [
                                                { text: 'LinkedIn: ', bold: true },
                                                { text: 'Ver perfil', style: 'contactText', link: cvData.contact.linkedin }
                                            ],
                                            style: 'contactText',
                                            margin: [0, 0, 0, 0]
                                        }
                                    ],
                                    margin: [0, 0, 0, 15]
                                },
                                // Idiomas
                                {
                                    text: 'IDIOMAS',
                                    style: 'sectionHeaderLeft',
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    stack: cvData.languages.map(lang => ({
                                        text: `${lang.language}: ${lang.level}`,
                                        style: 'contactText',
                                        margin: [0, 0, 0, 5]
                                    })),
                                    margin: [0, 0, 0, 15]
                                },
                                // Intereses
                                {
                                    text: 'INTERESES',
                                    style: 'sectionHeaderLeft',
                                    margin: [0, 0, 0, 10],
                                    pageBreak: 'before'
                                },
                                {
                                    ul: cvData.hobbies,
                                    style: 'contactText',
                                    margin: [0, 0, 0, 15]
                                },
                                // Referencias
                                {
                                    text: 'REFERENCIAS',
                                    style: 'sectionHeaderLeft',
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    stack: cvData.references.map(ref => ({
                                        stack: [
                                            { text: ref.name, style: 'referenceName', margin: [0, 0, 0, 2] },
                                            { text: ref.tel, style: 'referencePhone', margin: [0, 0, 0, 8] }
                                        ]
                                    })),
                                    margin: [0, 0, 0, 15]
                                },
                                // Código QR
                                {
                                    text: 'VISITA MI PORTAFOLIO',
                                    style: 'sectionHeaderLeft',
                                    alignment: 'center',
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    image: qrCodeBase64,
                                    width: 100,
                                    height: 100,
                                    alignment: 'center',
                                    margin: [0, 0, 0, 5]
                                },
                                {
                                    text: 'mhenriquezdev.com',
                                    style: 'contactText',
                                    alignment: 'center',
                                    bold: true
                                }
                            ]
                        },
                        // COLUMNA DERECHA - Información Técnica (65%)
                        {
                            width: '65%',
                            stack: [
                                // Perfil Profesional
                                {
                                    text: 'PERFIL PROFESIONAL',
                                    style: 'sectionHeaderRight',
                                    margin: [0, 0, 0, 8]
                                },
                                {
                                    text: cvData.profile,
                                    style: 'contentRight',
                                    alignment: 'justify',
                                    margin: [0, 0, 0, 12]
                                },
                                // Habilidades Técnicas
                                {
                                    text: 'HABILIDADES TÉCNICAS',
                                    style: 'sectionHeaderRight',
                                    margin: [0, 0, 0, 8]
                                },
                                {
                                    columns: [
                                        {
                                            ul: cvData.skills.slice(0, Math.ceil(cvData.skills.length / 2)),
                                            style: 'skillsList'
                                        },
                                        {
                                            ul: cvData.skills.slice(Math.ceil(cvData.skills.length / 2)),
                                            style: 'skillsList'
                                        }
                                    ],
                                    columnGap: 15,
                                    margin: [0, 0, 0, 12]
                                },
                                // Experiencia Profesional
                                {
                                    text: 'EXPERIENCIA PROFESIONAL',
                                    style: 'sectionHeaderRight',
                                    margin: [0, 0, 0, 8]
                                },
                                ...cvData.experience.flatMap((exp, index) => [
                                    {
                                        text: exp.position,
                                        style: 'jobTitleRight',
                                        margin: [0, index === 0 ? 0 : 8, 0, 2]
                                    },
                                    {
                                        text: `${exp.company} | ${exp.duration}`,
                                        style: 'jobDetailsRight',
                                        margin: [0, 0, 0, 3]
                                    },
                                    {
                                        ul: exp.responsibilities,
                                        style: 'contentRight',
                                        margin: [0, 0, 0, 0]
                                    }
                                ]),
                                // Proyectos Destacados
                                {
                                    text: 'PROYECTOS DESTACADOS',
                                    style: 'sectionHeaderRight',
                                    margin: [0, 12, 0, 8],
                                    pageBreak: 'before'
                                },
                                ...cvData.projects.slice(0, 3).flatMap((project, index) => [
                                    {
                                        text: project.name,
                                        style: 'projectTitleRight',
                                        margin: [0, index === 0 ? 0 : 8, 0, 2]
                                    },
                                    {
                                        text: project.description,
                                        style: 'contentRight',
                                        alignment: 'justify',
                                        margin: [0, 0, 0, 2]
                                    },
                                    ...(project.technologies ? [{
                                        text: `Tecnologías: ${project.technologies}`,
                                        style: 'technologiesRight',
                                        margin: [0, 0, 0, 0]
                                    }] : [])
                                ]),
                                // Educación
                                {
                                    text: 'EDUCACIÓN Y CERTIFICACIONES',
                                    style: 'sectionHeaderRight',
                                    margin: [0, 12, 0, 8]
                                },
                                ...cvData.education.slice(0, 4).flatMap((edu, index) => [
                                    {
                                        text: edu.degree,
                                        style: 'educationTitleRight',
                                        margin: [0, index === 0 ? 0 : 6, 0, 2]
                                    },
                                    {
                                        text: `${edu.institution} | ${edu.duration}`,
                                        style: 'jobDetailsRight',
                                        margin: [0, 0, 0, 2]
                                    },
                                    {
                                        text: edu.description,
                                        style: 'contentRight',
                                        margin: [0, 0, 0, 0]
                                    }
                                ])
                            ]
                        }
                    ],
                    columnGap: 20
                }
            ],
            styles: {
                // Estilos columna izquierda
                nameLeft: {
                    fontSize: 20,
                    bold: true,
                    color: '#2c3e50'
                },
                titleLeft: {
                    fontSize: 13,
                    color: '#7f8c8d',
                    italics: true
                },
                sectionHeaderLeft: {
                    fontSize: 12,
                    bold: true,
                    color: '#3498db'
                },
                icon: {
                    fontSize: 10
                },
                contactText: {
                    fontSize: 10,
                    color: '#34495e'
                },
                referenceName: {
                    fontSize: 10,
                    bold: true,
                    color: '#2c3e50'
                },
                referencePhone: {
                    fontSize: 9,
                    color: '#7f8c8d'
                },
                // Estilos columna derecha
                sectionHeaderRight: {
                    fontSize: 14,
                    bold: true,
                    color: '#3498db'
                },
                contentRight: {
                    fontSize: 10,
                    color: '#34495e',
                    lineHeight: 1.3
                },
                skillsList: {
                    fontSize: 10,
                    color: '#34495e'
                },
                jobTitleRight: {
                    fontSize: 12,
                    bold: true,
                    color: '#2c3e50'
                },
                jobDetailsRight: {
                    fontSize: 10,
                    italics: true,
                    color: '#7f8c8d'
                },
                projectTitleRight: {
                    fontSize: 11,
                    bold: true,
                    color: '#2c3e50'
                },
                technologiesRight: {
                    fontSize: 9,
                    italics: true,
                    color: '#7f8c8d'
                },
                educationTitleRight: {
                    fontSize: 11,
                    bold: true,
                    color: '#2c3e50'
                }
            },
            defaultStyle: {
                font: 'Roboto'
            }
        };
    };

    // Generar y descargar el PDF
    const generateCV = async () => {
        const docDefinition: any = await getDocDefinition();
        pdfMake.createPdf(docDefinition).download('CV_Manuel_Henriquez.pdf');
    };

    // Obtener URL del PDF para preview
    const getPdfUrl = async (): Promise<string> => {
        return new Promise(async (resolve) => {
            const docDefinition: any = await getDocDefinition();
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);
            pdfDocGenerator.getDataUrl((dataUrl: string) => {
                resolve(dataUrl);
            });
        });
    };

    // Abrir el PDF en una nueva pestaña
    const openCV = async () => {
        const docDefinition: any = await getDocDefinition();
        pdfMake.createPdf(docDefinition).open();
    };

    // Imprimir el PDF
    const printCV = async () => {
        const docDefinition: any = await getDocDefinition();
        pdfMake.createPdf(docDefinition).print();
    };

    return {
        generateCV,
        getPdfUrl,
        openCV,
        printCV
    };
};
