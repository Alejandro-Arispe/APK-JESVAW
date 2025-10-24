/* eslint-disable prettier/prettier */
import { jsPDF } from "jspdf";
import JsBarcode from "jsbarcode";

export function generarPDF({
  personas,
  cursos,
  materias,
  cursoSeleccionado,
  materiaSeleccionada,
  gestionSeleccionada,
  setError,
}) {
  if (!personas.length) {
    setError("⚠️ No hay estudiantes para generar PDF");
    return;
  }

  const doc = new jsPDF();
  const cursoNombre =
    cursos.find((c) => c.curso_id == cursoSeleccionado)?.curso_nombre || "";
  const materiaNombre =
    materias.find((m) => m.materia_id == materiaSeleccionada)?.materia_nombre || "";

  doc.setFontSize(16);
  doc.text("Registro de Asistencia", 20, 20);
  doc.setFontSize(12);
  doc.text(`Curso: ${cursoNombre}`, 20, 30);
  doc.text(`Materia: ${materiaNombre}`, 20, 36);
  doc.text(`Gestión: ${gestionSeleccionada}`, 20, 42);

  let y = 55;

  personas.forEach((p, i) => {
    doc.text(`${i + 1}. ${p.apellido_paterno} ${p.apellido_materno} ${p.nombre}`, 20, y);

    const canvas = document.createElement("canvas");
    JsBarcode(canvas, String(p.persona_id), {
      format: "CODE128",
      width: 1,
      height: 25,
    });
    const imgData = canvas.toDataURL("image/png");
    doc.addImage(imgData, "PNG", 160, y - 5, 30, 10);

    y += 12;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`Asistencia_${cursoNombre}_${materiaNombre}.pdf`);
}
