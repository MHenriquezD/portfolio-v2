import type { CreateTable } from "../interfaces/create-table.interface";
import path from "path";

export const generateTables = (data: CreateTable) => {
  return {
    table: {
      widths: data.widths,
      margin: data.margin || [0, 5, 0, 15],
      body: data.data.map((row: any) => {
        if (Array.isArray(row)) return row;
        const result = [];
        let col = 0;
        while (col < (data.columns || data.widths.length)) {
          const colKey = `column${col + 1}`;
          const colSpanKey = `colSpan${col + 1}`;
          const alignmentKey = `alignment${col + 1}`;
          const boldKey = `bold${col + 1}`;

          if (row.hasOwnProperty(colKey)) {
            const { [colKey]: text, ...rest } = row;
            const colSpan =
              row[colSpanKey] || rest.colSpan || rest.colspan || 1;
            const alignment = row[alignmentKey] || rest.alignment;
            const bold =
              typeof row[boldKey] !== 'undefined' ? row[boldKey] : rest.bold;

            Object.keys(rest).forEach((k) => {
              if (
                k.startsWith('column') ||
                k.startsWith('colSpan') ||
                k.startsWith('alignment') ||
                k.startsWith('bold')
              )
                delete rest[k];
            });
            const cellProps: any = { colSpan };
            if (typeof alignment !== 'undefined')
              cellProps.alignment = alignment;
            if (typeof bold !== 'undefined') cellProps.bold = bold;

            if (
              typeof text === 'object' &&
              (text.ol || text.ul || text.table)
            ) {
              result.push({ ...text, ...rest, ...cellProps });
            } else {
              result.push({ text, ...rest, ...cellProps });
            }
            // Agrega celdas vacías por el colSpan
            for (let s = 1; s < colSpan; s++) {
              result.push('');
              col++;
            }
          } else {
            result.push({});
          }
          col++;
        }
        return result;
      }),
    },
    layout: {
      hLineWidth: function (i: number, node: any) {
        return i === 0 || i === node.table.body.length ? 1 : 0.5;
      },
      vLineWidth: function (i: number, node: any) {
        return i === 0 || i === node.table.widths.length ? 1 : 0.5;
      },
      hLineColor: function (i: number, node: any) {
        return i === 0 || i === node.table.body.length ? '#000000' : '#CCCCCC';
      },
      vLineColor: function (i: number, node: any) {
        return i === 0 || i === node.table.widths.length
          ? '#000000'
          : '#CCCCCC';
      },
      paddingLeft: function () {
        return 5;
      },
      paddingRight: function () {
        return 5;
      },
      paddingTop: function () {
        return 8;
      },
      paddingBottom: function () {
        return 8;
      },
    },
  };
};

export const fonts = {
  Roboto: {
    normal: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'roboto',
      'Roboto-Regular.ttf',
    ),
    bold: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'roboto',
      'Roboto-Medium.ttf',
    ),
    italics: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'roboto',
      'Roboto-Italic.ttf',
    ),
    bolditalics: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'roboto',
      'Roboto-MediumItalic.ttf',
    ),
  },
  Pluto: {
    bold: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'pluto',
      'PLUTOBOLD.TTF',
    ),
    regular: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'pluto',
      'PLUTOREGULAR.TTF',
    ),
    normal: path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      'fonts',
      'pluto',
      'PLUTOREGULAR.TTF',
    ),
  },
};