/* eslint-disable prettier/prettier */
"use client";
import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";

export function BarcodeScanner({ estudiantes }) {
  const [isScanning, setIsScanning] = useState(true);
  const [carro, setCarro] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const { ref } = useZxing({
    paused: !isScanning,
    onDecodeResult(result) {
      const codigo = result.getText();
      setIsScanning(false); // Pausar momentáneamente la cámara

      // Buscar estudiante por ID escaneado
      const estudianteEncontrado = estudiantes.find(
        (e) => String(e.persona_id) === codigo
      );

      if (estudianteEncontrado) {
        const yaExiste = carro.some(
          (e) => e.persona_id === estudianteEncontrado.persona_id
        );

        if (!yaExiste) {
          setCarro((prev) => [...prev, estudianteEncontrado]);
          setMensaje(`✅ ${estudianteEncontrado.nombre} registrado correctamente`);
        } else {
          setMensaje("⚠️ Este estudiante ya está registrado.");
        }
      } else {
        setMensaje("❌ No se encontró el estudiante con ese código.");
      }

      // Mostrar el diálogo por 1 segundo y luego continuar escaneando
      setDialogVisible(true);
      setTimeout(() => {
        setDialogVisible(false);
        setIsScanning(true); // Reactivar la cámara
      }, 1000);
    },
    onError(error) {
      console.error("Error al escanear:", error);
      setMensaje("⚠️ No se pudo acceder a la cámara");
    },
  });

  return (
    <div
      style={{
        maxWidth: 650,
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f9fc",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: 20,
        position: "relative",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#006371" }}>
        Escáner de Asistencia
      </h2>

      {/* Vista de cámara */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16/9",
          backgroundColor: "#ddd",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isScanning ? (
          <video
            ref={ref}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: 48 }}>📷</span>
        )}
      </div>

      {/* Botones de control */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        {!isScanning ? (
          <button
            onClick={() => setIsScanning(true)}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: "#00A4B8",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ▶️ Reanudar Escaneo
          </button>
        ) : (
          <button
            onClick={() => setIsScanning(false)}
            style={{
              flex: 1,
              padding: 10,
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            ⏹️ Pausar
          </button>
        )}
      </div>

      {/* Diálogo temporal */}
      {dialogVisible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#00A65A",
            color: "#fff",
            padding: "20px 40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            fontSize: "1.2rem",
            animation: "fadeInOut 1s ease-in-out",
          }}
        >
          {mensaje}
        </div>
      )}

      {/* Lista de asistencia */}
      {carro.length > 0 && (
        <div
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ color: "#006371" }}>🧾 Lista de Asistencia</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 10,
            }}
          >
            <thead style={{ backgroundColor: "#00A4B8", color: "#fff" }}>
              <tr>
                <th style={{ padding: 8 }}>Código</th>
                <th style={{ padding: 8 }}>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {carro.map((est, i) => (
                <tr
                  key={i}
                  style={{
                    textAlign: "center",
                    backgroundColor: i % 2 === 0 ? "#f9f9f9" : "#fff",
                  }}
                >
                  <td style={{ padding: 8 }}>{est.persona_id}</td>
                  <td style={{ padding: 8 }}>{est.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
