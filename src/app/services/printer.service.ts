import PdfPrinter from 'pdfmake';
import { type TDocumentDefinitions } from 'pdfmake/interfaces';
import { fonts } from '../helpers/helper'

export const createPdfDocument = (
    docDefinition: TDocumentDefinitions,
):  PDFKit.PDFDocument => {
    const printer = new PdfPrinter(fonts);
    return printer.createPdfKitDocument(docDefinition);
};