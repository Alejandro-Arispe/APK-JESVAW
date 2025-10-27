/* eslint-disable prettier/prettier */
import { useState, useEffect } from "react";
import { FiltrosAsistencia } from "../../components/Asistencia/FiltrosAsistencia";
import { generarPDF } from "../../components/Asistencia/GenerarPDF";
import { BarcodeScanner } from "../../components/Asistencia/BarcodeScanner";
import { Input } from "../../components/Asistencia/Input_codigo_barra";

export function Asistencia() {
  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [gestiones, setGestiones] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [usarScanner, setUsarScanner] = useState(true); // valor inicial: true → muestra BarcodeScanner

  const [cursoSeleccionado, setCursoSeleccionado] = useState("");
  const [materiaSeleccionada, setMateriaSeleccionada] = useState("");
  const [gestionSeleccionada, setGestionSeleccionada] = useState("");

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [materiasRes, cursosRes, gestionesRes] = await Promise.all([
          fetch("/api/notas/materia/"),
          fetch("/api/notas/curso/"),
          fetch("/api/notas/gestion/"),
        ]);
        setMaterias(await materiasRes.json());
        setCursos(await cursosRes.json());
        setGestiones(await gestionesRes.json());
      } catch {
        setError("❌ Error al cargar datos iniciales");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // Cargar personas
  useEffect(() => {
    const fetchPersonas = async () => {
      if (!cursoSeleccionado || !materiaSeleccionada) return setPersonas([]);
      try {
        const res = await fetch(
          `/api/notas/extraer/?curso=${cursoSeleccionado}&materia=${materiaSeleccionada}`
        );
        const data = await res.json();
        setPersonas(data);
      } catch {
        setError("❌ Error al cargar estudiantes");
      }
    };
    fetchPersonas();
  }, [cursoSeleccionado, materiaSeleccionada]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando datos...</p>;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "30px auto",
        padding: 20,
        backgroundColor: "#f7f9fc",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#006371" }}>📋 Registro de Asistencia</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center", marginBottom: 10 }}>{error}</p>
      )}

      {/* Filtros */}
      <FiltrosAsistencia
        materias={materias}
        cursos={cursos}
        gestiones={gestiones}
        materiaSeleccionada={materiaSeleccionada}
        cursoSeleccionado={cursoSeleccionado}
        gestionSeleccionada={gestionSeleccionada}
        setMateriaSeleccionada={setMateriaSeleccionada}
        setCursoSeleccionado={setCursoSeleccionado}
        setGestionSeleccionada={setGestionSeleccionada}
      />

      {/* Botón PDF */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={() =>
            generarPDF({
              personas,
              cursos,
              materias,
              cursoSeleccionado,
              materiaSeleccionada,
              gestionSeleccionada,
              setError,
            })
          }
          style={{
            backgroundColor: "#00A4B8",
            color: "white",
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          📄 Descargar PDF con códigos de barra
        </button>
      </div>

      {/* Escáner */}
      <div style={{ textAlign: "center", padding: "20px" }}>
      <label>
        <input
          type="checkbox"
          checked={usarScanner}
          onChange={(e) => setUsarScanner(e.target.checked)}
          style={{ marginRight: "10px" }}
        />
        Usar escáner de código de barras
      </label>

      <div style={{ marginTop: "20px" }}>
        {usarScanner ? (
                    <Input estudiante={personas} />

        ) : (
          <BarcodeScanner estudiantes={personas} />

        )}
      </div>
    </div>
    </div>
  );
}
