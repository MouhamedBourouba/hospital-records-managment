import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import Employee from '../models/Employee.js';

export async function GenerateDeathRecordPDF(record) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text, y) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
  };

  let y = 780;
  drawText(`Death Certificate`, y); y -= 30;
  drawText(`Latin Name: ${record.LatinFullName}`, y); y -= 20;

  drawText(`Birth Date: ${record.BirthDate.toDateString()}`, y); y -= 20;
  
  drawText(`Father name: ${record.FatherName}`, y); y -= 20;
  drawText(`Mother name: ${record.MotherName}`, y); y -= 20;

  drawText(`Date of Death: ${record.DateOfDeath.toDateString()}`, y); y -= 20;
  drawText(`Place of Death: ${record.PlaceOfDeath}`, y); y -= 20;
  drawText(`Cause of Death: ${record.CauseOfDeath}`, y); y -= 40;

  drawText(`Signed By: ${(await Employee.findById(record.SignedBy)).fullName || 'Unknown'}`, y);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export async function GenerateBirthRecordPDF(record) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const drawText = (text, y) => {
    page.drawText(text, {
      x: 50,
      y,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    });
  };

  let y = 780;
  drawText(`Birth Certificate`, y); y -= 30;

  drawText(`Arabic Name: ${record.ArabicFullName}`, y); y -= 20;
  drawText(`Latin Name: ${record.LatinFullName}`, y); y -= 20;

  drawText(`Birth Date: ${record.BirthDate.toDateString()}`, y); y -= 20;
  
  drawText(`Father name: ${record.FatherName}`, y); y -= 20;
  drawText(`Mother name: ${record.MotherName}`, y); y -= 20;

  drawText(`Signed By: ${(await Employee.findById(record.SignedBy)).fullName || 'Unknown'}`, y);

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
