/* eslint-disable prettier/prettier */
export function FiltrosAsistencia({
  materias,
  cursos,
  gestiones,
  materiaSeleccionada,
  cursoSeleccionado,
  gestionSeleccionada,
  setMateriaSeleccionada,
  setCursoSeleccionado,
  setGestionSeleccionada,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <div>
        <label style={{ display: "block", marginBottom: 5, color: "#006371" }}>
          Materia:
        </label>
        <select
          value={materiaSeleccionada}
          onChange={(e) => setMateriaSeleccionada(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        >
          <option value="">Seleccione una materia</option>
          {materias.map((m) => (
            <option key={m.materia_id} value={m.materia_id}>
              {m.materia_nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: 5, color: "#006371" }}>
          Curso:
        </label>
        <select
          value={cursoSeleccionado}
          onChange={(e) => setCursoSeleccionado(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((c) => (
            <option key={c.curso_id} value={c.curso_id}>
              {c.curso_nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: "block", marginBottom: 5, color: "#006371" }}>
          Gestión:
        </label>
        <select
          value={gestionSeleccionada}
          onChange={(e) => setGestionSeleccionada(e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        >
          <option value="">Seleccione una gestión</option>
          {gestiones.map((g, i) => (
            <option key={i} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
