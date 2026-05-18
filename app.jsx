// app.jsx

const { useState, useRef, useEffect } = React;

const sections = [
  { id: "intro", label: "Introducción", icon: "◈" },
  { id: "tarifa", label: "Tarifa T2", icon: "01" },
  { id: "demanda", label: "Análisis de Demanda", icon: "02" },
  { id: "solar", label: "Recurso Solar", icon: "03" },
  { id: "inversor", label: "Selección Inversor", icon: "04" },
  { id: "panel", label: "Selección Panel", icon: "05" },
  { id: "serie", label: "Strings en Serie", icon: "06" },
  { id: "paralelo", label: "Strings en Paralelo", icon: "07" },
  { id: "generacion", label: "Generación Anual", icon: "08" },
  { id: "protecciones", label: "Cableado y Protecciones", icon: "09" },
  { id: "economico", label: "Análisis Económico", icon: "10" },
];

// Componente para renderizar pequeños fragmentos matemáticas alineados con el texto (tablas, párrafos)
const MathText = ({ math }) => {
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current && window.katex) {
      try {
        window.katex.render(math, spanRef.current, {
          displayMode: false, // Renderizado en línea, no bloque centrado
          throwOnError: false
        });
      } catch (err) {
        console.error("Error en KaTeX inline:", err);
      }
    }
  }, [math]);

  return <span ref={spanRef} />;
};

// Componente Formula para bloques centrados
const Formula = ({ children, label }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && window.katex) {
      try {
        window.katex.render(children, containerRef.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch (err) {
        console.error("Error en KaTeX block:", err);
      }
    }
  }, [children]);

  return (
    <div style={{
      background: "rgba(251,191,36,0.03)",
      border: "1px solid rgba(251,191,36,0.15)",
      borderLeft: "3px solid #fbbf24",
      borderRadius: "4px",
      padding: "20px 18px",
      margin: "18px 0",
      position: "relative",
    }}>
      {label && (
        <div style={{
          position: "absolute", top: "-10px", left: "12px",
          background: "#0f1117", padding: "0 8px",
          fontSize: "0.65rem", color: "#6b7280", letterSpacing: "0.1em",
          textTransform: "uppercase", fontFamily: "'Courier New', monospace"
        }}>{label}</div>
      )}
      <div ref={containerRef} style={{ color: "#fde68a", overflowX: "auto" }} />
    </div>
  );
};

const Alert = ({ type = "warning", children }) => {
  const colors = {
    warning: { bg: "rgba(251,191,36,0.08)", border: "#fbbf24", icon: "⚠" },
    info: { bg: "rgba(96,165,250,0.08)", border: "#60a5fa", icon: "ℹ" },
    danger: { bg: "rgba(239,68,68,0.08)", border: "#ef4444", icon: "✕" },
    ok: { bg: "rgba(52,211,153,0.08)", border: "#34d399", icon: "✓" },
  };
  const c = colors[type];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: "2px", padding: "12px 16px", margin: "14px 0",
      display: "flex", gap: "10px", alignItems: "flex-start",
      fontSize: "0.88rem", color: "#d1d5db",
    }}>
      <span style={{ color: c.border, fontWeight: "700", flexShrink: 0 }}>{c.icon}</span>
      <span>{children}</span>
    </div>
  );
};

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", margin: "16px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              padding: "8px 12px", textAlign: "left",
              borderBottom: "1px solid #374151",
              color: "#fbbf24", fontWeight: "600",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.78rem", letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: "1px solid rgba(55,65,81,0.5)" }}>
            {row.map((cell, j) => (
              <td key={j} style={{
                padding: "8px 12px", color: j === 0 ? "#e5e7eb" : "#9ca3af",
                fontFamily: j > 0 && typeof cell === 'string' && !cell.includes('$') ? "'Courier New', monospace" : "inherit",
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Tag = ({ children, color = "#fbbf24" }) => (
  <span style={{
    display: "inline-block", padding: "2px 8px",
    border: `1px solid ${color}`, borderRadius: "2px",
    fontSize: "0.72rem", color, letterSpacing: "0.08em",
    textTransform: "uppercase", margin: "0 4px 4px 0",
    fontFamily: "'Courier New', monospace",
  }}>{children}</span>
);

const SectionTitle = ({ num, children }) => (
  <div style={{ marginBottom: "28px" }}>
    <div style={{
      fontFamily: "'Courier New', monospace",
      fontSize: "0.7rem", color: "#fbbf24",
      letterSpacing: "0.2em", marginBottom: "6px",
    }}>PASO {num}</div>
    <h2 style={{
      fontSize: "1.5rem", fontWeight: "700",
      color: "#f9fafb", margin: 0,
      fontFamily: "'Georgia', serif",
      borderBottom: "1px solid #1f2937",
      paddingBottom: "12px",
    }}>{children}</h2>
  </div>
);

const Sub = ({ children }) => (
  <h3 style={{
    fontSize: "1rem", fontWeight: "600",
    color: "#fbbf24", margin: "24px 0 10px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em",
  }}>{children}</h3>
);

const P = ({ children }) => (
  <p style={{ color: "#9ca3af", lineHeight: "1.75", marginBottom: "12px", fontSize: "0.92rem" }}>
    {children}
  </p>
);

const content = {
  intro: () => (
    <div>
      <div style={{
        background: "linear-gradient(135deg, rgba(251,191,36,0.05) 0%, rgba(15,17,23,0) 60%)",
        border: "1px solid rgba(251,191,36,0.15)",
        borderRadius: "4px", padding: "28px", marginBottom: "32px",
      }}>
        <div style={{
          fontFamily: "'Courier New', monospace", fontSize: "0.7rem",
          color: "#6b7280", letterSpacing: "0.2em", marginBottom: "8px",
        }}>GUÍA DE CÁLCULO — VERSIÓN T2 PBA</div>
        <h1 style={{
          fontSize: "1.8rem", fontWeight: "700", color: "#f9fafb",
          fontFamily: "'Georgia', serif", margin: "0 0 16px",
        }}>Sistema FV On-Grid<br />Tarifa General T2 — Provincia de Buenos Aires</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          <Tag>IEC 62109</Tag><Tag>IEC 62548</Tag><Tag>AEA 90364-7-712</Tag>
          <Tag color="#60a5fa">OCEBA Res. 8/2022</Tag><Tag color="#60a5fa">Ley PBA 14.333</Tag>
          <Tag color="#34d399">Net Metering</Tag>
        </div>
      </div>

      <Sub>Lógica de la metodología</Sub>
      <P>
        Un sistema on-grid no almacena energía: inyecta o autoconsume en tiempo real. Por eso la secuencia de cálculo no parte del panel sino de tres restricciones concurrentes: la <strong style={{color:"#e5e7eb"}}>demanda del usuario</strong>, la <strong style={{color:"#e5e7eb"}}>tarifa y el marco regulatorio</strong>, y los <strong style={{color:"#e5e7eb"}}>límites técnicos del inversor</strong>. El inversor es el componente estructurante porque define toda la arquitectura DC posible.
      </P>

      <Sub>Particularidades de la Tarifa T2 vs T1</Sub>
      <Table
        headers={["Aspecto", "T1 Residencial", "T2 General"]}
        rows={[
          ["Usuarios típicos", "Hogares", "Comercios, pymes, talleres, consultorios"],
          ["Medición", "Solo energía (kWh)", "Energía + posible demanda máxima (kW)"],
          ["Tensión suministro", "Monofásica 220V", "Monofásica o trifásica 380V según potencia"],
          ["Potencia contratada típica", "3,3 – 7 kW", "10 – 50 kW (y más)"],
          ["Cargo por demanda", "No", "Sí, en categorías con medición de demanda"],
          ["Relevancia del factor de potencia", "Baja", "Alta — puede haber penalización"],
          ["Inversor recomendado", "Monofásico 1–5 kW", "Trifásico 5–30 kW típicamente"],
          ["Complejidad del trámite net metering", "Menor", "Mayor — interviene OCEBA/distribuidora"],
        ]}
      />

      <Alert type="info">
        En T2, si la distribuidora mide demanda máxima en kW (cuarto de hora de mayor consumo del mes), el sistema FV puede reducir ese pico y generar un ahorro adicional al del simple reemplazo de kWh. Esto cambia radicalmente el análisis económico y puede acortar el payback significativamente.
      </Alert>

      <Sub>Secuencia de trabajo</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px", marginTop: "12px" }}>
        {[
          "01 · Analizar factura T2",
          "02 · Definir energía objetivo",
          "03 · Recurso solar / HPS",
          "04 · Seleccionar inversor",
          "05 · Seleccionar panel",
          "06 · Calcular N serie (3 temperaturas)",
          "07 · Calcular N paralelo",
          "08 · Verificar compatibilidad",
          "09 · Estimar generación anual",
          "10 · Cableado y protecciones",
          "11 · Análisis económico",
        ].map((s, i) => (
          <div key={i} style={{
            background: "rgba(31,41,55,0.5)", border: "1px solid #374151",
            borderRadius: "2px", padding: "10px 12px",
            fontFamily: "'Courier New', monospace", fontSize: "0.78rem",
            color: "#9ca3af",
          }}>{s}</div>
        ))}
      </div>
    </div>
  ),

  tarifa: () => (
    <div>
      <SectionTitle num="01">Tarifa T2 en PBA — Marco Regulatorio</SectionTitle>
      <Sub>Estructura tarifaria T2</Sub>
      <P>La Tarifa General T2 en la Provincia de Buenos Aires tiene componentes que deben analizarse individualmente para cuantificar el ahorro real que genera el sistema FV:</P>
      <Table
        headers={["Componente", "Unidad", "Impacto del sistema FV"]}
        rows={[
          ["Cargo fijo", "$/mes", "Ninguno — siempre se paga"],
          ["Energía activa", "$/kWh", "Directo — cada kWh generado es kWh no comprado"],
          ["Demanda máxima", "$/kW", "Indirecto — si el FV reduce el pico de demanda"],
          ["Energía reactiva", "$/kVAr", "Ninguno — el inversor puede corregirlo independientemente"],
          ["Contribución OCEBA/dist.", "% sobre total", "Se reduce proporcionalmente al ahorro"],
          ["Impuestos (IVA, IIBB, tasa mun.)", "% sobre total", "Se reducen proporcionalmente"],
        ]}
      />

      <Sub>Lectura de la factura T2 — datos a extraer</Sub>
      <P>De cada factura bimestral se extraen los siguientes valores incorporando simbología LaTeX:</P>
      <Table
        headers={["Dato", "Símbolo", "Dónde aparece en la factura"]}
        rows={[
          ["Energía activa consumida", <MathText math="E_{bim} \ [\text{kWh}]" />, "Cuadro de consumo — lectura actual vs anterior"],
          ["Demanda máxima registrada", <MathText math="D_{max} \ [\text{kW}]" />, "Solo si hay medidor de demanda — cuadro adicional"],
          ["Potencia contratada", <MathText math="P_{contr} \ [\text{kW}]" />, "Encabezado del suministro"],
          ["Tensión de suministro", <MathText math="V_{sum} \ [\text{V}]" />, "Encabezado — 220V mono o 380V trifásico"],
          ["Factor de potencia (si aplica)", <MathText math="\text{FP}" />, "Cuadro de penalización — no siempre presente"],
          ["Precio de la energía activa", <MathText math="p_e \ [\$/\text{kWh}]" />, "Cuadro de conceptos facturados"],
          ["Precio de la demanda", <MathText math="p_d \ [\$/\text{kW}]" />, "Cuadro de conceptos — solo si hay medición"],
          ["Total facturado", <MathText math="F_{total} \ [\$]" />, "Total a pagar"],
        ]}
      />

      <Sub>Cálculo del precio efectivo del kWh</Sub>
      <P>Para el análisis económico, el precio efectivo del kWh que el sistema FV "evita comprar" incluye todos los cargos variables proporcionales al consumo:</P>
      
      <Formula label="Precio efectivo del kWh">
        {"p_{efectivo} = \\frac{F_{total} - Cargo\\_fijo_{total}}{E_{bim}} \\quad [\\$/kWh]"}
      </Formula>

      <Alert type="info">
        Este precio efectivo es el que se usa para calcular el ahorro anual del sistema FV, no el precio nominal del kWh del cuadro tarifario. En T2 incluye distribución, transporte, impuestos y tasas, por lo que suele ser 1,5x a 2x el cargo de energía puro.
      </Alert>

      <Sub>Análisis de la demanda máxima (si aplica)</Sub>
      <P>Si la factura registra demanda máxima en kW, el ahorro potencial tiene dos componentes:</P>
      
      <Formula label="Ahorro total mensual">
        {"Ahorro = (E_{evitada} \\cdot p_{efectivo}) + (\\Delta D_{max} \\cdot p_d)"}
      </Formula>
      
      <P>Donde <MathText math="\Delta D_{max}" /> es la reducción del pico de demanda lograda por el sistema FV. Esto requiere analizar el perfil de carga horario del usuario para determinar cuánto puede el FV recortar el pico.</P>

      <Sub>Marco regulatorio — Net Metering T2 en PBA</Sub>
      <Table
        headers={["Aspecto", "Detalle"]}
        rows={[
          ["Ley provincial", "Ley PBA 14.333 — generación distribuida"],
          ["Resolución técnica", "OCEBA Res. 8/2022 (o vigente)"],
          ["Límite de potencia instalada", "No puede superar la potencia contratada"],
          ["Medición de excedentes", "Medidor bidireccional — energía inyectada se acredita"],
          ["Precio de excedentes inyectados", "Precio mayorista (MATER/CAMMESA) — mucho menor al de compra"],
          ["Inversor requerido", "Certificación IEC 62109 + función anti-isla IEC 62116"],
          ["Trámite", "Solicitud ante distribuidora + inspección técnica + contrato"],
        ]}
      />
      <Alert type="warning">
        En T2, dado que el precio de los excedentes inyectados es sensiblemente menor al precio de compra, la estrategia de dimensionado óptima es cubrir el autoconsumo sin generar excedentes importantes. Dimensionar para exportar masivamente es antieconómico en el esquema tarifario actual.
      </Alert>
    </div>
  ),

  demanda: () => (
    <div>
      <SectionTitle num="02">Análisis de Demanda y Definición de Energía a Generar</SectionTitle>

      <Sub>2.1 — Procesamiento del consumo histórico</Sub>
      <P>Se trabaja con al menos 12 meses de historial (6 facturas bimestrales) para identificar estacionalidad.</P>
      
      <Formula label="Consumo mensual promedio">
        {"E_{mensual} = \\frac{E_{bimestral}}{2} \\quad [kWh/mes]"}
      </Formula>
      <Formula label="Consumo diario promedio">
        {"E_{diaria} = \\frac{E_{mensual}}{30} \\quad [kWh/dia]"}
      </Formula>
      <Formula label="Consumo anual">
        {"E_{anual} = \\sum_{i=1}^{12} E_{mensual\\_i} \\quad [kWh/a\\tilde{n}o]"}
      </Formula>

      <Sub>2.2 — Perfil de carga horario</Sub>
      <P>En T2 es fundamental conocer el perfil de carga (coincidencia diurna de comercios/industrias frente al consumo FV):</P>
      <Table
        headers={["Fuente", "Precisión", "Disponibilidad"]}
        rows={[
          ["Medidor inteligente con telemetría (si disponible)", "Alta — curva cuarto-horaria", "Solo si la distribuidora lo provee"],
          ["Analizador de red instalado temporalmente", "Alta — medición directa", "Requiere equipo de medición"],
          ["Encuesta de uso + potencias instaladas", "Media — estimación por circuito", "Siempre disponible"],
          ["Perfiles típicos de categoría (CAMMESA/OCEBA)", "Baja — genérico", "Referencia bibliográfica"],
        ]}
      />

      <Sub>2.3 — Decisión de la energía a generar</Sub>
      <P>La energía objetivo no es siempre "cubrir el 100%". La decisión óptima surge de tres restricciones concurrentes:</P>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", margin: "16px 0" }}>
        {[
          { title: "Restricción regulatoria", body: "P_FV ≤ P_contratada", color: "#fbbf24" },
          { title: "Restricción económica", body: "No generar excedentes que se inyecten a precio mayorista", color: "#60a5fa" },
          { title: "Restricción física", body: "Área disponible para paneles en el techo/estructura", color: "#34d399" },
        ].map((r, i) => (
          <div key={i} style={{
            background: "rgba(31,41,55,0.4)", border: `1px solid ${r.color}30`,
            borderTop: `2px solid ${r.color}`, borderRadius: "2px", padding: "14px",
          }}>
            <div style={{ color: r.color, fontSize: "0.75rem", fontWeight: "600", marginBottom: "8px", fontFamily: "'Courier New', monospace" }}>{r.title}</div>
            <div style={{ color: "#9ca3af", fontSize: "0.83rem" }}>{r.body}</div>
          </div>
        ))}
      </div>

      <P>Se recomienda cubrir entre el 70% y el 90% del consumo anual:</P>

      <Formula label="Fracción solar objetivo">
        {"FS_{obj} = \\frac{E_{FV\\_anual}}{E_{consumida\\_anual}} \\times 100\\%"}
      </Formula>

      <Sub>2.4 — Potencia pico de paneles requerida (estimación inicial)</Sub>
      <Formula label="Potencia FV inicial estimada">
        {"P_{FV\\_est} = \\frac{E_{diaria\\_objetivo}}{HPS_{promedio} \\cdot PR} \\quad [kWp]"}
      </Formula>
      <P>Donde <MathText math="\text{HPS}" /> son las Horas Pico Solar del sitio y <MathText math="\text{PR}" /> es el Performance Ratio (típico 0,78–0,82 para BsAs).</P>

      <Alert type="ok">
        Con este valor estimado ya se puede seleccionar un inversor de potencia AC cercana y ajustar los strings comerciales.
      </Alert>
    </div>
  ),

  solar: () => (
    <div>
      <SectionTitle num="03">Recurso Solar — Análisis de Irradiancia</SectionTitle>

      <Sub>3.1 — Fuentes de datos de irradiancia</Sub>
      <Table
        headers={["Base de datos", "URL / Herramienta", "Resolución", "Uso recomendado"]}
        rows={[
          ["PVGIS (JRC Europa)", "re.jrc.ec.europa.eu/pvgis", "Mensual / horaria", "Principal — gratuita, muy precisa para BsAs"],
          ["NASA POWER / SSE", "power.larc.nasa.gov", "Mensual", "Verificación cruzada"],
          ["Meteonorm", "Software pago", "Horaria / TMY", "Proyectos de alta precisión"],
          ["SMN Argentina", "smn.gob.ar", "Diaria (estaciones)", "Datos locales — menos elaborados"],
          ["SolarGIS", "solargis.com", "Mensual / horaria", "Alta resolución — versión free limitada"],
        ]}
      />

      <Sub>3.2 — Cómo leer el informe PVGIS</Sub>
      <Table
        headers={["Dato en el informe", "Símbolo", "Para qué se usa"]}
        rows={[
          ["Irradiación mensual sobre plano inclinado", <MathText math="H(i) \ [\text{kWh}/m^2/\text{mes}]" />, "Cálculo de HPS mensual"],
          ["Irradiación anual total", <MathText math="H(i)_{anual} \ [\text{kWh}/m^2/\text{a}\tilde{n}\text{o}]" />, "Estimación de generación anual"],
          ["Temperatura media mensual", <MathText math="T_{amb} \ [^{\\circ}\text{C}]" />, "Cálculo de temperatura de celda"],
          ["Producción específica estimada (con PR=1)", <MathText math="E_{spec} \ [\text{kWh}/\text{kWp}/\text{a}\tilde{n}\text{o}]" />, "Referencia rápida de productividad"],
          ["Pérdidas por temperatura estimadas", <MathText math="L_{temp} \ [\\%]" />, "Verificación del PR calculado"],
          ["Mes de menor irradiación", "—", "Mes de diseño para peor caso"],
        ]}
      />

      <Sub>3.3 — Horas Pico Solar (HPS)</Sub>
      <P>Las HPS representan las horas equivalentes de sol normalizadas a <MathText math="1000 \ \text{W}/m^2" />:</P>
      
      <Formula label="Definición de HPS">
        {"HPS = \\frac{H_{diaria} \\left[\\frac{kWh}{m^2 \\cdot dia}\\right]}{1 \\left[\\frac{kW}{m^2}\\right]} \\quad [h/dia]"}
      </Formula>
      <Formula label="HPS mensual desde PVGIS">
        {"HPS_{mes} = \\frac{H(i)_{mes} \\left[\\frac{kWh}{m^2 \\cdot mes}\\right]}{d\\acute{\\imath}as\\_del\\_mes} \\quad [h/dia]"}
      </Formula>

      <Sub>3.4 — Inclinación y orientación óptimas</Sub>
      <Table
        headers={["Parámetro", "Valor óptimo (BsAs)", "Criterio"]}
        rows={[
          ["Orientación (azimut)", "0° = Norte geográfico", "Máxima captación anual en hemisferio sur"],
          ["Inclinación óptima anual", "30° – 35°", "≈ latitud del sitio"],
          ["Inclinación para maximizar invierno", "40° – 45°", "Si el objetivo es cubrir meses críticos"],
          ["Inclinación para maximizar verano", "15° – 20°", "Si hay coincidencia con pico de demanda estival"],
          ["Tolerancia de orientación", "±15° sin penalización grave", "Pérdida < 5% hasta ±20°"],
          ["Tolerancia de inclinación", "±10° sin penalización grave", "Pérdida < 3% hasta ±15°"],
        ]}
      />

      <Sub>3.5 — Temperatura de celda — cálculo para peor caso</Sub>
      <Formula label="Temperatura de celda (operación)">
        {"T_{cel} = T_{amb} + \\left( \\frac{NOCT - 20}{800} \\right) \\cdot G \\quad [^{\\circ}C]"}
      </Formula>
      
      <P>Donde <MathText math="G" /> es la irradiancia. Para condiciones críticas extremas en Buenos Aires (<MathText math="T_{amb}=40^{\\circ}\text{C}" />, <MathText math="\text{NOCT}=45^{\\circ}\text{C}" />, <MathText math="G=1000 \ \text{W}/m^2" />):</P>
      
      <Formula label="Temperatura máxima de celda — BsAs">
        {"T_{cel\\_max} = 40 + \\left( \\frac{45 - 20}{800} \\right) \\cdot 1000 \\approx 71.25^{\\circ}C"}
      </Formula>
      <Formula label="Temperatura mínima de celda — BsAs">
        {"T_{cel\\_min} = -5^{\\circ}C \\quad (Condici\\acute{o}n \\, reglamentaria \\, de \\, Voc \\, m\\acute{a}xima)"}
      </Formula>
    </div>
  ),

  inversor: () => (
    <div>
      <SectionTitle num="03">Selección del Inversor — Componente Estructurante</SectionTitle>

      <Sub>¿Por qué se empieza por el inversor?</Sub>
      <P>El inversor define el marco para el array: tensiones límites de strings (<MathText math="V_{oc}" /> y <MathText math="V_{mppt}" />), límites de corriente (<MathText math="I_{dc}" />) y potencia máxima admisible (<MathText math="\text{Oversizing}" />).</P>

      <Sub>4.1 — Definición de la potencia del inversor</Sub>
      <Formula label="Potencia AC máxima del inversor">
        {"P_{inv} \\le P_{contratada\\_T2} \\quad [kW]"}
      </Formula>
      <Formula label="Potencia AC sugerida por demanda">
        {"P_{inv} \\approx \\frac{E_{diaria\\_objetivo}}{HPS_{promedio} \\cdot PR} \\quad [kW]"}
      </Formula>

      <Sub>4.2 — Tipo de inversor según el suministro T2</Sub>
      <Table
        headers={["Suministro T2", "Tipo de inversor", "Observaciones"]}
        rows={[
          ["Monofásico 220V", "String inversor monofásico", "Hasta ~6 kW típicamente"],
          ["Trifásico 380V (3F+N)", "String inversor trifásico", "5 kW en adelante — recomendado en T2"],
          ["Trifásico con carga desequilibrada", "Inversor trifásico con salida equilibrada", "Verifica con la distribuidora"],
        ]}
      />

      <Sub>4.3 — Parámetros a extraer del datasheet del inversor</Sub>
      <Table
        headers={["Parámetro", "Símbolo", "Función en el cálculo"]}
        rows={[
          ["Tensión DC máxima absoluta", <MathText math="V_{dc\\_max} \ [\text{V}]" />, "Techo absoluto del string — nunca superar"],
          ["Tensión mínima de arranque", <MathText math="V_{start} \ [\text{V}]" />, "El array debe superar este valor para arrancar"],
          ["Rango MPPT mínimo", <MathText math="V_{mppt\\_min} \ [\text{V}]" />, "El array debe estar por encima en condición caliente"],
          ["Rango MPPT máximo", <MathText math="V_{mppt\\_max} \ [\text{V}]" />, "El array no debe superarlo en condición fría"],
          ["Corriente DC máxima por entrada MPPT", <MathText math="I_{dc\\_max} \ [\text{A}]" />, "Límite de strings en paralelo"],
          ["Corriente de cortocircuito máx. DC", <MathText math="I_{sc\\_max} \ [\text{A}]" />, "Protección ante Isc del campo"],
          ["Potencia DC máxima admisible", <MathText math="P_{dc\\_max} \ [\text{W}]" />, "Permite calcular oversizing máximo"],
          ["Número de entradas MPPT", <MathText math="N_{mppt}" />, "Arquitectura del array — orientaciones múltiples"],
        ]}
      />

      <Sub>4.4 — Verificación del rango de trabajo óptimo</Sub>
      <Formula label="Tensión de máxima eficiencia (Objetivo MPPT)">
        {"V_{mpp\\_target} = \\frac{V_{mppt\\_min} + V_{mppt\\_max}}{2} \\quad [V]"}
      </Formula>
      <Formula label="Potencia de arranque mínima">
        {"P_{arr\\_min} = V_{start} \\cdot I_{dc\\_max\\_mppt} \\quad [W]"}
      </Formula>

      <Sub>4.5 — Oversizing DC/AC</Sub>
      <Formula label="Ratio de oversizing">
        {"OS = \\frac{P_{dc\\_total}}{P_{inv\\_ac}} \\times 100\\% \\quad [\\%]"}
      </Formula>
      <Alert type="ok">
        En Buenos Aires, un oversizing de entre el 110% y 130% es el óptimo técnico-económico para mitigar pérdidas por días nublados y baja irradiancia estacional.
      </Alert>
    </div>
  ),

  panel: () => (
    <div>
      <SectionTitle num="04">Selección del Panel Fotovoltaico</SectionTitle>

      <Sub>5.1 — Tecnologías disponibles</Sub>
      <Table
        headers={["Tecnología", "Eficiencia típica", "Coef. temp. Pmpp", "Mejor para"]}
        rows={[
          ["Monocristalino PERC", "19 – 21%", "–0,35 a –0,40 %/°C", "Uso general — estándar actual"],
          ["Monocristalino TOPCon", "21 – 23%", "–0,28 a –0,32 %/°C", "Climas cálidos — menor pérdida por temp."],
          ["Monocristalino HJT", "22 – 24%", "–0,24 a –0,26 %/°C", "Máx. rendimiento — más caro"],
        ]}
      />

      <Sub>5.2 — Parámetros del datasheet corregidos por temperatura</Sub>
      <P>Las variaciones térmicas se calculan a partir de los coeficientes del fabricante frente a las desviaciones de condiciones STC (25°C):</P>
      
      <Formula label="Voc a temperatura crítica de celda">
        {"V_{oc}(T) = V_{oc\\_STC} \\cdot \\left[ 1 + \\frac{\\beta}{100} \\cdot (T_{cel} - 25) \\right] \\quad [V]"}
      </Formula>
      <Formula label="Vmpp a temperatura crítica de celda">
        {"V_{mpp}(T) = V_{mpp\\_STC} \\cdot \\left[ 1 + \\frac{\\beta}{100} \\cdot (T_{cel} - 25) \\right] \\quad [V]"}
      </Formula>
      <Formula label="Isc a temperatura de diseño">
        {"I_{sc}(T) = I_{sc\\_STC} \\cdot \\left[ 1 + \\frac{\\alpha}{100} \\cdot (T_{cel} - 25) \\right] \\quad [A]"}
      </Formula>
      <Formula label="Pmpp real en operación caliente">
        {"P_{mpp}(T) = P_{mpp\\_STC} \\cdot \\left[ 1 + \\frac{\\gamma}{100} \\cdot (T_{cel} - 25) \\right] \\quad [W]"}
      </Formula>

      <Alert type="info">
        Como el coeficiente beta es negativo, un panel expuesto a 71°C de celda en el verano porteño sufrirá una degradación térmica transitoria de potencia cercana al -17%.
      </Alert>
    </div>
  ),

  serie: () => (
    <div>
      <SectionTitle num="05">Cálculo de Paneles en Serie — Compatibilidad Tensión</SectionTitle>
      <P>Se evalúan tres límites de temperatura rigurosos para asegurar que las series no quemen el inversor por sobretensión en invierno ni apaguen el lazo por subtensión en verano.</P>

      <Sub>6.1 — Condición 1: Temperatura mínima absoluta (Límite absoluto de sobretensión)</Sub>
      <Formula label="Voc máxima del panel en invierno (-5°C)">
        {"V_{oc}(-5^{\\circ}C) = V_{oc\\_STC} \\cdot \\left[ 1 + \\frac{\\beta}{100} \\cdot (-5 - 25) \\right]"}
      </Formula>
      <Formula label="Número máximo de paneles por string (Seguridad eléctrica)">
        {"N_{serie\\_max\\_abs} = \\left\\lfloor \\frac{V_{dc\\_max\\_inversor}}{V_{oc}(-5^{\\circ}C)} \\right\\rfloor"}
      </Formula>
      <Alert type="danger">
        Superar este número entero calculado (función piso) destruirá las etapas de entrada del inversor por arcos de tensión en vacío.
      </Alert>

      <Sub>6.2 — Condición 2: Temperatura mínima — Límite de tracking superior</Sub>
      <Formula label="Vmpp máxima en frío">
        {"V_{mpp}(-5^{\\circ}C) = V_{mpp\\_STC} \\cdot \\left[ 1 + \\frac{\\beta}{100} \\cdot (-5 - 25) \\right]"}
      </Formula>
      <Formula label="Número máximo de paneles por rango MPPT">
        {"N_{serie\\_max\\_mppt} = \\left\\lfloor \\frac{V_{mppt\\_max}}{V_{mpp}(-5^{\\circ}C)} \\right\\rfloor"}
      </Formula>
      <Formula label="Límite superior definitivo de diseño">
        {"N_{max} = \\min(N_{serie\\_max\\_abs}, N_{serie\\_max\\_mppt})"}
      </Formula>

      <Sub>6.3 — Condición 3: Temperatura máxima operativa (Límite de subtensión en verano)</Sub>
      <Formula label="Vmpp mínima en caliente (71°C)">
        {"V_{mpp}(71^{\\circ}C) = V_{mpp\\_STC} \\cdot \\left[ 1 + \\frac{\\beta}{100} \\cdot (71.25 - 25) \\right]"}
      </Formula>
      <Formula label="Número mínimo de paneles por string">
        {"N_{serie\\_min} = \\left\\lceil \\frac{V_{mppt\\_min}}{V_{mpp}(71^{\\circ}C)} \\right\\rceil"}
      </Formula>

      <Sub>6.4 — Selección e ingeniería del String</Sub>
      <Formula label="Intervalo de validez normativa">
        {"N_{serie\\_min} \\le N_{serie} \\le N_{max}"}
      </Formula>
      <P>Priorizá siempre los valores cercanos al límite superior para maximizar la tensión del bus DC, reduciendo corrientes, pérdidas por efecto Joule y secciones de cobre.</P>
    </div>
  ),

  paralelo: () => (
    <div>
      <SectionTitle num="06">Cálculo de Strings en Paralelo — Corriente y Potencia</SectionTitle>

      <Sub>7.1 — Agrupamiento en Paralelo por MPPT</Sub>
      <Formula label="Número máximo de strings en paralelo">
        {"N_{par\\_max} = \\left\\lfloor \\frac{I_{dc\\_max\\_inversor}}{I_{sc\\_STC}} \\right\\rfloor"}
      </Formula>

      <Sub>7.2 — Corriente de cortocircuito del campo FV</Sub>
      <P>Para considerar picos de irradiancia por reflejos nubosos (irradiación superior a STC), IEC 62548 exige un factor multiplicador de 1.25:</P>
      
      <Formula label="Corriente máxima de cortocircuito del campo">
        {"I_{campo\\_max} = N_{par} \\cdot I_{sc\\_STC} \\cdot 1.25 \\quad [A]"}
      </Formula>

      <Sub>7.3 — Criterio de uso de fusibles DC</Sub>
      <Formula label="Condición de protección de retorno (IEC 62548)">
        {"\\text{Si } N_{par} \\ge 3 \\implies \\text{Fusibles de string mandatorios en ambos polos (+ y -)}"}
      </Formula>

      <Sub>7.4 — Potencia pico y verificación de Oversizing</Sub>
      <Formula label="Potencia pico total del generador fotovoltaico">
        {"P_{dc\\_total} = N_{serie} \\cdot N_{par} \\cdot P_{mpp\\_STC} \\quad [Wp]"}
      </Formula>
      <Formula label="Verificación de la tasa de sobredimensionamiento">
        {"OS\\% = \\frac{P_{dc\\_total}}{P_{inv\\_ac\\_nominal}} \\times 100 \\le OS_{max\\_datasheet}"}
      </Formula>
    </div>
  ),

  generacion: () => (
    <div>
      <SectionTitle num="07">Estimación de Generación Anual</SectionTitle>

      <Sub>8.1 — Rendimiento global de la instalación: Performance Ratio (PR)</Sub>
      <P>El coeficiente PR devalúa la energía teórica considerando pérdidas reales de la instalación (cableado, suciedad, rendimiento inversor, e interpolación térmica):</P>
      <Formula label="Valor estándar de diseño en PBA">
        {"PR \\approx 0.78 \\quad (22\\% \\, de \\, p\\acute{e}rdidas \\, globales)"}
      </Formula>

      <Sub>8.2 — Modelo matemático de generación energética</Sub>
      <Formula label="Energía mensual generada">
        {"E_{gen\\_mes} = P_{dc\\_total} \\,[kWp] \\cdot HPS_{mes} \\left[\\frac{h}{dia}\\right] \\cdot dia_{mes} \\cdot PR \\quad [kWh/mes]"}
      </Formula>
      <Formula label="Energía anual acumulada">
        {"E_{gen\\_anual} = \\sum_{mes=1}^{12} E_{gen\\_mes} \\quad [kWh/a\\tilde{n}o]"}
      </Formula>

      <Sub>8.3 — Métricas de productividad</Sub>
      <Formula label="Producción específica esperada para Buenos Aires">
        {"E_{spec} = \\frac{E_{gen\\_anual}}{P_{dc\\_total}} \\implies \\text{Rango normal: } 1300 \\text{ a } 1600 \\left[\\frac{kWh}{kWp \\cdot a\\tilde{n}o}\\right]"}
      </Formula>
    </div>
  ),

  protecciones: () => (
    <div>
      <SectionTitle num="08">Cableado y Protecciones</SectionTitle>

      <Sub>9.1 — Dimensionamiento de conductores DC</Sub>
      <P>La sección mínima de los conductores de cobre fotovoltaico (normas IEC 62930 / EN 50618) debe soportar los niveles térmicos de corriente y limitar las caídas óhmicas:</P>
      
      <Formula label="Caída de tensión lineal en barras de cobre">
        {"\\Delta V = \\frac{2 \\cdot L \\cdot I_{dise\\tilde{n}o}}{\\sigma \\cdot S} \\quad [V]"}
      </Formula>
      
      <P>Donde sigma = 56 m/(ohm*mm²) para el cobre. Exigencia reglamentaria:</P>
      
      <Formula label="Restricción porcentual DC">
        {"\\Delta V\\% = \\frac{\\Delta V}{V_{mpp\\_string}} \\times 100 \\le 1\\%"}
      </Formula>

      <Sub>9.2 — Lado de Corriente Alterna (AC)</Sub>
      <Formula label="Corriente nominal trifásica balanceada de inyección">
        {"I_{ac} = \\frac{P_{inv\\_ac}}{\\sqrt{3} \\cdot V_{l\\acute{\\imath}nea} \\cdot \\cos\\varphi} \\quad [A]"}
      </Formula>
      <P>Para un inversor de 10 kW inyectando a la red de 380 V con coseno de phi = 1:</P>
      <Formula label="Ejemplo eléctrico de inyección AC">
        {"I_{ac} = \\frac{10000}{\\sqrt{3} \\cdot 380 \\cdot 1} \\approx 15.2\\,A \\implies I_{termomagn\\acute{e}tica} = 20\\,A"}
      </Formula>
    </div>
  ),

  economico: () => (
    <div>
      <SectionTitle num="09">Análisis Económico</SectionTitle>

      <Sub>10.1 — Ecuaciones financieras de evaluación del proyecto</Sub>
      <Formula label="Payback Simple (Período de recupero)">
        {"PB = \\frac{\\text{Inversi\\acute{o}n \\, Total } [\\$]}{\\text{Ahorro \\, Anual \\, Total } [\\$/a\\tilde{n}o]}"}
      </Formula>
      
      <Formula label="Costo Nivelado de la Energía (LCOE)">
        {"LCOE = \\frac{\\text{Inversi\\acute{o}n \\, Inicial } + \\sum_{t=1}^{N} \\frac{O\\&M_t}{(1+r)^t}}{\\sum_{t=1}^{N} \\frac{E_t}{(1+r)^t}} \\quad [\\$/kWh]"}
      </Formula>

      <Formula label="Valor Actual Neto (VAN)">
        {"VAN = -\\text{Inversi\\acute{o}n} + \\sum_{t=1}^{25} \\frac{\\text{Ahorro}_t}{(1 + r)^t}"}
      </Formula>

      <Sub>10.2 — Modelo de degradación de potencia cristalina</Sub>
      <P>Considera el decaimiento de la eficiencia por envejecimiento de las celdas (d aprox. 0.7% anual):</P>
      <Formula label="Rendimiento del generador en el año n">
        {"E_{gen}(n) = E_{gen\\_a\\tilde{n}o1} \\cdot (1 - d)^{n-1}"}
      </Formula>
    </div>
  ),
};

function GuiaFV() {
  const [active, setActive] = useState("intro");

  const renderContent = () => {
    const fn = content[active];
    return fn ? fn() : <P>Sección en construcción.</P>;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      color: "#e5e7eb",
      fontFamily: "'Georgia', serif",
      display: "flex",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "220px",
        flexShrink: 0,
        borderRight: "1px solid #1f2937",
        padding: "24px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        background: "#0a0c12",
      }}>
        <div style={{
          padding: "0 16px 20px",
          borderBottom: "1px solid #1f2937",
          marginBottom: "12px",
        }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.6rem", color: "#4b5563",
            letterSpacing: "0.2em", marginBottom: "4px",
          }}>SISTEMA FV ON-GRID</div>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.72rem", color: "#fbbf24",
            letterSpacing: "0.08em",
          }}>TARIFA T2 — PBA</div>
        </div>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              display: "flex", alignItems: "center", gap: "10px",
              width: "100%", padding: "9px 16px",
              background: active === s.id ? "rgba(251,191,36,0.08)" : "transparent",
              border: "none",
              borderLeft: active === s.id ? "2px solid #fbbf24" : "2px solid transparent",
              cursor: "pointer", textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <span style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.65rem",
              color: active === s.id ? "#fbbf24" : "#4b5563",
              flexShrink: 0, width: "20px",
            }}>{s.icon}</span>
            <span style={{
              fontSize: "0.78rem",
              color: active === s.id ? "#f9fafb" : "#6b7280",
              lineHeight: "1.3",
            }}>{s.label}</span>
          </button>
        ))}
        <div style={{
          padding: "20px 16px 0",
          borderTop: "1px solid #1f2937",
          marginTop: "12px",
        }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.6rem", color: "#374151",
            lineHeight: "1.6",
          }}>
            IEC 62109 · IEC 62548<br />
            AEA 90364-7-712<br />
            Ley PBA 14.333<br />
            OCEBA · Net Metering
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{
        flex: 1,
        padding: "40px 48px",
        maxWidth: "860px",
        overflowY: "auto",
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

const contenedor = document.getElementById('root');
const root = ReactDOM.createRoot(contenedor);
root.render(<GuiaFV />);
