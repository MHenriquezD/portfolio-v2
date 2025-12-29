export interface CreateTable {
  widths: string[];
  columns?: number; // Opcional, ya que widths define el número de columnas
  data: (Data[] | Data)[];
  margin?: number[];
}

export interface Data {
  text?: string;
  style?: string;
  fillColor?: string;
  color?: string;
  background?: string;
  colSpan?: number;
  rowSpan?: number;
  margin?: number[];
  alignment?: string;
  fontSize?: number;
  [key: string]: any; // Para permitir propiedades adicionales de pdfMake
}