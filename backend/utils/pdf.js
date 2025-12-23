const { PDFDocument, rgb } = require('pdf-lib');

module.exports = {
  async createEmptyPDF() {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    page.drawText('Generated PDF', { x: 50, y: 350 });
    return await pdfDoc.save();
  },

  async mergePDFs(pdfBuffers) {
    const mergedPdf = await PDFDocument.create();
    
    for (let buffer of pdfBuffers) {
      const pdf = await PDFDocument.load(buffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    return await mergedPdf.save();
  }
};
