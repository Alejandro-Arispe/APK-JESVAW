/* eslint-disable prettier/prettier */
import { useState } from "react";

export function Input({ estudiante }) {
  const [valor, setValor] = useState("");
  const [carro, setCarro] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const agregarProducto = async () => {
    const entrada = valor.trim();
    if (!entrada) return;

    try {
      const par = estudiante.find(
        (est) => est.persona_id === parseInt(entrada)
      );

      if (par) {
        const existe = carro.some((e) => e.persona_id === par.persona_id);

        if (!existe) {
          setCarro([...carro, par]);
          setMensaje(`✅ Estudiante ${par.nombre} agregado.`);
        } else {
          setMensaje("⚠️ Este estudiante ya está en la lista.");
        }
      } else {
        setMensaje("❌ No se encontró el estudiante con ese código.");
      }
    } catch (error) {
      console.error("Error al agregar estudiante:", error);
      setMensaje("❌ Error al agregar estudiante.");
    } finally {
      setValor("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      agregarProducto();
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#006371" }}>
        Registro de Estudiantes
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Ingrese código del estudiante"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            width: "70%",
            padding: "8px 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
        <button
          onClick={agregarProducto}
          style={{
            padding: "8px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#006371",
            color: "white",
            cursor: "pointer",
          }}
        >
          Agregar
        </button>
      </div>

      {mensaje && (
        <p
          style={{
            color: mensaje.startsWith("✅")
              ? "green"
              : mensaje.startsWith("⚠️")
              ? "orange"
              : "red",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {mensaje}
        </p>
      )}

      {carro.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#006371", color: "white" }}>
              <th style={{ padding: "10px" }}>Código</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {carro.map((car, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#f0f0f0" : "white",
                  textAlign: "center",
                }}
              >
                <td style={{ padding: "8px" }}>{car.persona_id}</td>
                <td>{car.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
