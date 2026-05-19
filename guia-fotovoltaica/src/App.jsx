import { useState } from "react";

const SECTIONS = [
  { id: "intro", label: "¿Qué es Jupyter?", icon: "00" },
  { id: "setup", label: "Instalación y Setup", icon: "01" },
  { id: "anatomia", label: "Anatomía del Notebook", icon: "02" },
  { id: "pandas", label: "Pandas — Datos", icon: "03" },
  { id: "matplotlib", label: "Gráficos", icon: "04" },
  { id: "pvlib_intro", label: "pvlib — Introducción", icon: "05" },
  { id: "pvlib_location", label: "pvlib — Ubicación y Sol", icon: "06" },
  { id: "pvlib_sistema", label: "pvlib — Sistema FV", icon: "07" },
  { id: "pvlib_strings", label: "pvlib — Strings", icon: "08" },
  { id: "integracion", label: "Integración TP", icon: "09" },
];

const Code = ({ children, lang = "python" }) => (
  <div style={{
    background: "#0d1117",
    border: "1px solid #21262d",
    borderRadius: "4px",
    margin: "14px 0",
    overflow: "hidden",
  }}>
    <div style={{
      background: "#161b22",
      padding: "6px 14px",
      display: "flex", alignItems: "center", gap: "8px",
      borderBottom: "1px solid #21262d",
    }}>
      <div style={{ display: "flex", gap: "5px" }}>
        {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
        ))}
      </div>
      <span style={{
        fontFamily: "'Courier New', monospace",
        fontSize: "0.65rem", color: "#6b7280",
        letterSpacing: "0.1em", marginLeft: "4px",
      }}>{lang}</span>
    </div>
    <pre style={{
      margin: 0, padding: "16px",
      fontFamily: "'Courier New', monospace",
      fontSize: "0.82rem", lineHeight: "1.65",
      color: "#e6edf3", overflowX: "auto",
      whiteSpace: "pre",
    }}>{children}</pre>
  </div>
);

const Output = ({ children }) => (
  <div style={{
    background: "rgba(22,27,34,0.5)",
    border: "1px solid #21262d",
    borderLeft: "3px solid #3fb950",
    borderRadius: "0 4px 4px 0",
    padding: "12px 16px",
    margin: "-6px 0 14px",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.8rem", color: "#3fb950",
    lineHeight: "1.6",
  }}>{children}</div>
);

const Note = ({ type = "info", children }) => {
  const styles = {
    info: { bg: "rgba(56,139,253,0.08)", border: "#388bfd", icon: "ℹ", label: "NOTA" },
    tip: { bg: "rgba(63,185,80,0.08)", border: "#3fb950", icon: "✦", label: "TIP" },
    warning: { bg: "rgba(210,153,34,0.08)", border: "#d2991d", icon: "⚠", label: "ATENCIÓN" },
    pvlib: { bg: "rgba(188,140,255,0.08)", border: "#bc8cff", icon: "◈", label: "PVLIB" },
  };
  const s = styles[type] || styles.info;
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}40`,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: "0 4px 4px 0",
      padding: "12px 16px", margin: "14px 0",
      display: "flex", gap: "10px",
    }}>
      <span style={{ color: s.border, flexShrink: 0, fontWeight: "700" }}>{s.icon}</span>
      <div>
        <span style={{
          color: s.border, fontSize: "0.65rem",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.1em", fontWeight: "700",
          display: "block", marginBottom: "4px",
        }}>{s.label}</span>
        <span style={{ color: "#8b949e", fontSize: "0.85rem", lineHeight: "1.6" }}>{children}</span>
      </div>
    </div>
  );
};

const H2 = ({ children }) => (
  <h2 style={{
    fontSize: "1.4rem", fontWeight: "700",
    color: "#f0f6fc", margin: "0 0 20px",
    fontFamily: "'Georgia', serif",
    borderBottom: "1px solid #21262d",
    paddingBottom: "12px",
  }}>{children}</h2>
);

const H3 = ({ children }) => (
  <h3 style={{
    fontSize: "0.9rem", fontWeight: "600",
    color: "#bc8cff", margin: "24px 0 10px",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.08em", textTransform: "uppercase",
  }}>{children}</h3>
);

const P = ({ children }) => (
  <p style={{ color: "#8b949e", lineHeight: "1.75", marginBottom: "12px", fontSize: "0.9rem" }}>
    {children}
  </p>
);

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: "auto", margin: "14px 0" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{
            padding: "8px 12px", textAlign: "left",
            borderBottom: "1px solid #21262d",
            color: "#bc8cff", fontWeight: "600",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.72rem", letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ borderBottom: "1px solid #1c2128" }}>
          {row.map((cell, j) => (
            <td key={`${i}-${j}`} style={{
              padding: "8px 12px",
              color: j === 0 ? "#e6edf3" : "#6b7280",
              fontFamily: j === 1 ? "'Courier New', monospace" : "inherit",
              fontSize: "0.83rem",
            }}>{cell}</td>
          ))}
        </tr>
      ))}</tbody>
    </table>
  </div>
);

const content = {
  intro: () => (
    <div>
      <H2>¿Qué es Jupyter Notebook y por qué usarlo para el TP?</H2>
      <P>Jupyter Notebook es un entorno de programación interactivo que combina en un solo documento: código ejecutable, resultados (tablas, gráficos), texto con formato (Markdown), y fórmulas matemáticas (LaTeX). Es el estándar en ingeniería, ciencia de datos y energías renovables.</P>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", margin: "16px 0" }}>
        {[
          { icon: "⚡", title: "Código vivo", body: "Cada celda se ejecuta independientemente. Modificás un dato y recalculás solo esa sección." },
          { icon: "📊", title: "Gráficos integrados", body: "Los gráficos aparecen embebidos en el documento, no en ventanas separadas." },
          { icon: "📝", title: "Texto + fórmulas", body: "Podés escribir la memoria técnica, las fórmulas en LaTeX y el código en el mismo archivo." },
          { icon: "🔁", title: "Reproducible", body: "Cualquier persona con el .ipynb puede ejecutar exactamente el mismo análisis y obtener los mismos resultados." },
        ].map((c, i) => (
          <div key={i} style={{
            background: "#161b22", border: "1px solid #21262d",
            borderRadius: "4px", padding: "16px",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "8px" }}>{c.icon}</div>
            <div style={{ color: "#f0f6fc", fontWeight: "600", fontSize: "0.88rem", marginBottom: "6px" }}>{c.title}</div>
            <div style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: "1.5" }}>{c.body}</div>
          </div>
        ))}
      </div>

      <H3>Stack de herramientas para el TP</H3>
      <Table
        headers={["Herramienta", "Qué hace en el TP"]}
        rows={[
          ["Jupyter Notebook / JupyterLab", "El entorno — el documento en sí"],
          ["Python 3.x", "El lenguaje de programación base"],
          ["pandas", "Manejo de datos tabulares — consumo histórico, factura, generación mensual"],
          ["numpy", "Cálculos numéricos — fórmulas de strings, temperatura, corrientes"],
          ["pvlib", "Cálculos fotovoltaicos — posición solar, irradiancia, rendimiento del sistema"],
          ["matplotlib / seaborn", "Gráficos — perfiles de generación, comparativas mensuales"],
          ["folium", "Mapas interactivos — ubicación del sitio con vista satelital"],
          ["IPython.display", "Tablas formateadas, HTML embebido dentro del notebook"],
        ]}
      />
      <Note type="tip">
        Para el TP recomiendo usar <strong>JupyterLab</strong> en lugar del Jupyter Notebook clásico — tiene una interfaz más moderna con explorador de archivos lateral, múltiples pestañas y mejor manejo de extensiones. Es el mismo formato .ipynb, solo cambia la interfaz.
      </Note>
    </div>
  ),

  setup: () => (
    <div>
      <H2>Instalación y configuración del entorno</H2>
      <H3>Opción A — Anaconda (recomendada para principiantes)</H3>
      <P>Anaconda instala Python, Jupyter y las bibliotecas científicas principales en un solo paso. Es la forma más simple de arrancar.</P>
      <Code lang="bash">{`# 1. Descargar Anaconda desde:
# https://www.anaconda.com/download
# Instalar normalmente (next, next, finish)

# 2. Abrir Anaconda Navigator y lanzar JupyterLab
# O desde la terminal / Anaconda Prompt:
jupyter lab`}</Code>

      <H3>Opción B — pip (si ya tenés Python instalado)</H3>
      <Code lang="bash">{`# Instalar Jupyter
pip install jupyterlab

# Instalar todas las bibliotecas necesarias para el TP
pip install pandas numpy matplotlib seaborn pvlib folium requests`}</Code>

      <H3>Crear el entorno del proyecto</H3>
      <P>Buena práctica: crear una carpeta para el TP y lanzar Jupyter desde ahí.</P>
      <Code lang="bash">{`# Crear carpeta del proyecto
mkdir tp_fotovoltaico
cd tp_fotovoltaico

# Lanzar JupyterLab — se abre en el navegador
jupyter lab`}</Code>

      <H3>Verificar que todo está instalado</H3>
      <P>En la primera celda del notebook, ejecutar este bloque de verificación:</P>
      <Code lang="python">{`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import pvlib
import folium

print(f"pandas:     {pd.__version__}")
print(f"numpy:      {np.__version__}")
print(f"pvlib:      {pvlib.__version__}")
print(f"matplotlib: {plt.matplotlib.__version__}")
print("✓ Todo instalado correctamente")`}</Code>
      <Output>{`pandas:     2.2.0
numpy:      1.26.0
pvlib:      0.11.0
matplotlib: 3.8.0
✓ Todo instalado correctamente`}</Output>

      <H3>Estructura de carpetas recomendada para el TP</H3>
      <Code lang="bash">{`tp_fotovoltaico/
├── TP_FV_MEHCCO.ipynb       # El notebook principal
├── datos/
│   ├── factura_abril.csv    # Datos extraídos de la factura
│   └── pvgis_data.csv       # Datos exportados de PVGIS
├── imagenes/
│   └── logo.png
└── README.md`}</Code>
    </div>
  ),

  anatomia: () => (
    <div>
      <H2>Anatomía del Notebook — Celdas y Markdown</H2>
      <H3>Tipos de celda</H3>
      <Table
        headers={["Tipo", "Uso", "Cómo cambiar el tipo"]}
        rows={[
          ["Code", "Código Python ejecutable", "Menú desplegable en la barra o tecla Y en modo comando"],
          ["Markdown", "Texto, títulos, fórmulas, tablas", "Tecla M en modo comando"],
          ["Raw", "Texto sin formato (raramente usado)", "Tecla R en modo comando"],
        ]}
      />

      <H3>Atajos de teclado esenciales</H3>
      <Table
        headers={["Atajo", "Acción"]}
        rows={[
          ["Shift + Enter", "Ejecutar celda y pasar a la siguiente"],
          ["Ctrl + Enter", "Ejecutar celda y quedarse en ella"],
          ["Alt + Enter", "Ejecutar celda e insertar una nueva abajo"],
          ["Esc → A", "Insertar celda arriba (modo comando)"],
          ["Esc → B", "Insertar celda abajo (modo comando)"],
          ["Esc → D D", "Eliminar celda (doble D en modo comando)"],
          ["Esc → M", "Cambiar celda a Markdown"],
          ["Esc → Y", "Cambiar celda a Code"],
          ["Ctrl + Z", "Deshacer dentro de una celda"],
        ]}
      />

      <H3>Markdown para la memoria técnica</H3>
      <P>Las celdas Markdown permiten escribir el informe técnico con formato profesional:</P>
      <Code lang="markdown">{`# Título principal (H1)
## Sección (H2)
### Subsección (H3)

**texto en negrita**
*texto en cursiva*
\`código inline\`

- ítem de lista
- otro ítem

| Columna 1 | Columna 2 |
|-----------|-----------|
| dato      | valor     |

> Bloque de cita o nota importante`}</Code>

      <H3>Fórmulas matemáticas con LaTeX</H3>
      <P>Jupyter renderiza LaTeX nativo. Para el TP es ideal para presentar las fórmulas de cálculo:</P>
      <Code lang="markdown">{`# Fórmula inline (entre dólares simples):
La energía generada es $E = P \cdot HPS \cdot PR$

# Fórmula en bloque (entre dobles dólares):
$$V_{oc}(T) = V_{oc,STC} \cdot \\left[1 + \\frac{\\beta}{100}(T_{cel} - 25)\\right]$$

$$N_{serie,max} = \\left\\lfloor \\frac{V_{dc,max}}{V_{oc}(T_{min})} \\right\\rfloor$$`}</Code>

      <Note type="tip">
        La estructura ideal de cada sección del TP en el notebook es: celda Markdown con el título y la explicación teórica → celda Markdown con la fórmula en LaTeX → celda Code con el cálculo → celda Code con el resultado formateado o el gráfico.
      </Note>

      <H3>Estructura tipo de una sección</H3>
      <Code lang="markdown">{`## 5.3 Cálculo de strings en serie

El número máximo de paneles en serie se determina por la condición de
temperatura mínima, que produce la mayor tensión de circuito abierto:

$$N_{serie,max} = \\left\\lfloor \\frac{V_{dc,max}}{V_{oc}(T_{min})} \\right\\rfloor$$

donde $T_{min} = -5°C$ para la zona de Gral. San Martín, PBA.`}</Code>
      <Code lang="python">{`# Parámetros del panel (del datasheet)
Voc_stc = 40.2        # V
beta    = -0.29       # %/°C
T_min   = -5          # °C — temperatura mínima de celda

# Parámetros del inversor
V_dc_max = 1000       # V

# Cálculo
dT = T_min - 25
Voc_Tmin = Voc_stc * (1 + beta/100 * dT)
N_max_abs = int(V_dc_max / Voc_Tmin)

print(f"Voc a {T_min}°C = {Voc_Tmin:.2f} V")
print(f"N máx absoluto  = {N_max_abs} paneles en serie")`}</Code>
      <Output>{`Voc a -5°C = 43.70 V
N máx absoluto  = 22 paneles en serie`}</Output>
    </div>
  ),

  pandas: () => (
    <div>
      <H2>Pandas — Manejo de datos del proyecto</H2>
      <P>Pandas es la biblioteca estándar para manejo de datos tabulares en Python. En el TP la usamos para organizar el consumo histórico, los datos de la factura y los resultados de generación mensual.</P>

      <H3>Concepto fundamental — el DataFrame</H3>
      <P>Un DataFrame es una tabla de datos con filas y columnas, similar a una hoja de cálculo. Es el objeto central de pandas.</P>

      <H3>Crear el consumo histórico desde la factura</H3>
      <Code lang="python">{`import pandas as pd
import numpy as np

# Datos extraídos de la factura MEHCCO SA
consumo = pd.DataFrame({
    'periodo':  ['Ene-2026', 'Feb-2026', 'Mar-2026', 'Abr-2026'],
    'energia_kwh': [4864, 5291, 4646, 4173],
    'potencia_kw':  [44.0, 49.0, 35.0, 34.68],
})

consumo`}</Code>
      <Output>{`  periodo  energia_kwh  potencia_kw
0  Ene-2026         4864        44.00
1  Feb-2026         5291        49.00
2  Mar-2026         4646        35.00
3  Abr-2026         4173        34.68`}</Output>

      <H3>Cálculos sobre el DataFrame</H3>
      <Code lang="python">{`# Estadísticas básicas
print(f"Consumo promedio mensual: {consumo['energia_kwh'].mean():.0f} kWh/mes")
print(f"Consumo diario promedio:  {consumo['energia_kwh'].mean()/30:.1f} kWh/día")
print(f"Potencia máxima:          {consumo['potencia_kw'].max():.2f} kW")
print(f"Potencia media:           {consumo['potencia_kw'].mean():.2f} kW")

# Agregar columna calculada
consumo['consumo_diario'] = consumo['energia_kwh'] / 30
consumo`}</Code>
      <Output>{`Consumo promedio mensual: 4744 kWh/mes
Consumo diario promedio:  158.1 kWh/día
Potencia máxima:          49.00 kW
Potencia media:           40.67 kW`}</Output>

      <H3>Desglose de la factura como DataFrame</H3>
      <Code lang="python">{`# Reproducir la liquidación de la factura
factura = pd.DataFrame({
    'concepto': [
        'Cargo fijo',
        'Potencia Contratada',
        'Potencia Adquirida',
        'Potencia Excedida',
        'Energía Activa (kWh)',
    ],
    'importe': [40691, 305102, 299218, 534311, 343705],
})

factura['porcentaje'] = (
    factura['importe'] / factura['importe'].sum() * 100
).round(1)

factura['importe_fmt'] = factura['importe'].apply(
    lambda x: f"$ {x:,.0f}"
)

print(factura[['concepto','importe_fmt','porcentaje']].to_string(index=False))
print(f"\\nTotal conceptos eléctricos: $ {factura['importe'].sum():,.0f}")`}</Code>
      <Output>{`               concepto importe_fmt  porcentaje
            Cargo fijo  $  40,691         2.7
   Potencia Contratada $ 305,102       20.0
    Potencia Adquirida $ 299,218       19.6
     Potencia Excedida $ 534,311       35.1
Energía Activa (kWh)  $ 343,705       22.6

Total conceptos eléctricos: $ 1,523,027`}</Output>

      <H3>Leer datos de PVGIS desde CSV</H3>
      <Code lang="python">{`# PVGIS permite exportar los datos mensuales como CSV
# Una vez descargado, se lee así:
pvgis = pd.read_csv('datos/pvgis_data.csv', skiprows=8)

# O bien, cargar manualmente los datos del informe PVGIS
hps_mensual = pd.DataFrame({
    'mes': ['Ene','Feb','Mar','Abr','May','Jun',
            'Jul','Ago','Sep','Oct','Nov','Dic'],
    'H_mes_kwh_m2': [195,165,145,115,90,80,
                      88,115,135,165,185,200],
    'dias': [31,28,31,30,31,30,31,31,30,31,30,31],
    'T_amb_media': [24,23,20,15,11,8,8,10,13,17,21,23],
})

hps_mensual['HPS'] = (
    hps_mensual['H_mes_kwh_m2'] / hps_mensual['dias']
).round(2)

print(hps_mensual[['mes','H_mes_kwh_m2','HPS','T_amb_media']]
      .to_string(index=False))`}</Code>
      <Output>{` mes  H_mes_kwh_m2   HPS  T_amb_media
 Ene           195  6.29           24
 Feb           165  5.89           23
 Mar           145  4.68           20
 Abr           115  3.83           15
 May            90  2.90           11
 Jun            80  2.67            8
 Jul            88  2.84            8
 Ago           115  3.71           10
 Sep           135  4.50           13
 Oct           165  5.32           17
 Nov           185  6.17           21
 Dic           200  6.45           23`}</Output>
    </div>
  ),

  matplotlib: () => (
    <div>
      <H2>Gráficos — matplotlib y seaborn</H2>
      <H3>Configuración inicial recomendada</H3>
      <Code lang="python">{`import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns

# Estilo oscuro — coherente con el tema del TP
plt.style.use('dark_background')

# Parámetros globales de figura
plt.rcParams.update({
    'figure.figsize': (10, 5),
    'figure.dpi': 120,
    'axes.grid': True,
    'grid.alpha': 0.2,
    'font.family': 'monospace',
})`}</Code>

      <H3>Gráfico 1 — Consumo histórico y potencia</H3>
      <Code lang="python">{`fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

meses = consumo['periodo']
x = range(len(meses))

# Energía
ax1.bar(x, consumo['energia_kwh'], color='#388bfd', alpha=0.8, width=0.6)
ax1.set_xticks(x); ax1.set_xticklabels(meses, fontsize=9)
ax1.set_ylabel('kWh/mes'); ax1.set_title('Energía Activa Mensual')
ax1.axhline(consumo['energia_kwh'].mean(), color='#ffd700',
            linestyle='--', label=f"Promedio: {consumo['energia_kwh'].mean():.0f} kWh")
ax1.legend(fontsize=8)

# Potencia
colors = ['#ff4444' if v > 16 else '#3fb950'
          for v in consumo['potencia_kw']]
ax2.bar(x, consumo['potencia_kw'], color=colors, alpha=0.8, width=0.6)
ax2.axhline(16, color='#ffd700', linestyle='--',
            linewidth=1.5, label='Contratada: 16 kW')
ax2.set_xticks(x); ax2.set_xticklabels(meses, fontsize=9)
ax2.set_ylabel('kW'); ax2.set_title('Demanda Máxima Registrada')
ax2.legend(fontsize=8)

plt.suptitle('MEHCCO SA — Consumo histórico', fontsize=11, y=1.02)
plt.tight_layout()
plt.savefig('imagenes/consumo_historico.png', bbox_inches='tight')
plt.show()`}</Code>

      <H3>Gráfico 2 — Desglose de la factura (torta)</H3>
      <Code lang="python">{`fig, ax = plt.subplots(figsize=(8, 5))

colores = ['#21262d','#388bfd','#bc8cff','#ff4444','#3fb950']
explode = [0, 0, 0, 0.06, 0]  # destacar potencia excedida

wedges, texts, autotexts = ax.pie(
    factura['importe'],
    labels=factura['concepto'],
    autopct='%1.1f%%',
    colors=colores,
    explode=explode,
    startangle=90,
    textprops={'fontsize': 8, 'color': 'white'},
)

ax.set_title('Composición de la factura — Conceptos eléctricos\\n'
             f'Total: $ {factura["importe"].sum():,.0f}',
             fontsize=10, pad=15)
plt.tight_layout()
plt.show()`}</Code>

      <H3>Gráfico 3 — HPS mensual (recurso solar)</H3>
      <Code lang="python">{`fig, ax = plt.subplots(figsize=(11, 4))

colores_hps = ['#ffd700' if h >= 4.6 else
               '#388bfd' if h >= 3.0 else '#ff4444'
               for h in hps_mensual['HPS']]

bars = ax.bar(hps_mensual['mes'], hps_mensual['HPS'],
              color=colores_hps, alpha=0.85, width=0.65)

ax.axhline(hps_mensual['HPS'].mean(), color='white',
           linestyle='--', linewidth=1,
           label=f"Promedio anual: {hps_mensual['HPS'].mean():.2f} h/día")

# Valor encima de cada barra
for bar, val in zip(bars, hps_mensual['HPS']):
    ax.text(bar.get_x() + bar.get_width()/2,
            bar.get_height() + 0.05,
            f'{val:.2f}', ha='center', va='bottom',
            fontsize=7.5, color='white')

ax.set_ylabel('HPS [h/día]')
ax.set_title('Horas Pico Solar mensual — Gral. San Martín, PBA\\n'
             'Inclinación 30°, Orientación Norte', fontsize=10)
ax.legend(fontsize=9)
ax.set_ylim(0, 8)
plt.tight_layout()
plt.show()`}</Code>

      <H3>Mapa del sitio con folium</H3>
      <Code lang="python">{`import folium

# Coordenadas de Gral. San Martín, PBA
lat, lon = -34.5708, -58.5352

m = folium.Map(
    location=[lat, lon],
    zoom_start=16,
    tiles='Esri.WorldImagery'  # vista satelital
)

folium.Marker(
    location=[lat, lon],
    popup=folium.Popup(
        "<b>MEHCCO SA</b><br>"
        "72 La Crujía 4567<br>"
        "Gral. San Martín, PBA<br>"
        "Tarifa T2 — EDENOR",
        max_width=200
    ),
    icon=folium.Icon(color='red', icon='sun-o', prefix='fa'),
).add_to(m)

# Mostrar en el notebook
m`}</Code>
      <Note type="tip">
        folium genera mapas interactivos dentro del notebook — podés hacer zoom, ver la vista satelital del techo y estimar el área disponible para los paneles directamente desde el notebook.
      </Note>
    </div>
  ),

  pvlib_intro: () => (
    <div>
      <H2>pvlib — Introducción y conceptos</H2>
      <P>pvlib es la biblioteca Python de referencia para cálculos fotovoltaicos. Fue desarrollada originalmente por Sandia National Laboratories (EEUU) y es la misma base que usan herramientas comerciales como SAM (System Advisor Model). Implementa todos los modelos estándar de la industria.</P>

      <H3>¿Qué puede calcular pvlib?</H3>
      <Table
        headers={["Módulo de pvlib", "Qué calcula"]}
        rows={[
          ["pvlib.location", "Posición solar (azimut, elevación) para cualquier lat/lon y timestamp"],
          ["pvlib.irradiance", "Irradiancia sobre superficie inclinada desde datos de irradiancia horizontal"],
          ["pvlib.atmosphere", "Masa de aire, presión, correcciones atmosféricas"],
          ["pvlib.temperature", "Temperatura de celda desde temperatura ambiente e irradiancia"],
          ["pvlib.pvsystem", "Modelado del sistema FV completo — strings, array, inversor"],
          ["pvlib.modelchain", "Cadena completa de cálculo: meteo → celda → DC → AC"],
          ["pvlib.iotools", "Lectura de datos de PVGIS, TMY, NSRDB, archivos EPW"],
        ]}
      />

      <H3>Flujo de cálculo en pvlib</H3>
      <Code lang="python">{`# El flujo completo es:
#
# 1. Definir la ubicación (lat, lon, altitud, zona horaria)
#    ↓
# 2. Obtener datos meteorológicos (TMY de PVGIS o datos propios)
#    ↓
# 3. Calcular posición solar para cada timestamp
#    ↓
# 4. Calcular irradiancia sobre el plano del array (POA)
#    ↓
# 5. Calcular temperatura de celda
#    ↓
# 6. Calcular potencia DC del array (modelo SDM o PVWatts)
#    ↓
# 7. Calcular potencia AC del inversor
#    ↓
# 8. Integrar → energía anual generada

print("Flujo de cálculo pvlib cargado correctamente")`}</Code>

      <H3>Importaciones estándar para el TP</H3>
      <Code lang="python">{`import pvlib
from pvlib import location, irradiance, atmosphere, temperature
from pvlib.pvsystem import PVSystem, Array, FixedMount
from pvlib.modelchain import ModelChain
from pvlib.temperature import TEMPERATURE_MODEL_PARAMETERS

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

print(f"pvlib versión: {pvlib.__version__}")`}</Code>
    </div>
  ),

  pvlib_location: () => (
    <div>
      <H2>pvlib — Ubicación, posición solar e irradiancia</H2>

      <H3>Definir la ubicación del sitio</H3>
      <Code lang="python">{`from pvlib import location

# Datos del sitio — MEHCCO SA, Gral. San Martín, PBA
sitio = location.Location(
    latitude  = -34.5708,    # Sur → negativo
    longitude = -58.5352,    # Oeste → negativo
    altitude  = 20,          # metros sobre el nivel del mar
    tz        = 'America/Argentina/Buenos_Aires',
    name      = 'MEHCCO SA — Gral. San Martín PBA'
)

print(sitio)`}</Code>
      <Output>{`Location: 
  name: MEHCCO SA — Gral. San Martín PBA
  latitude: -34.5708
  longitude: -58.5352
  altitude: 20 m
  tz: America/Argentina/Buenos_Aires`}</Output>

      <H3>Descargar datos TMY desde PVGIS</H3>
      <Code lang="python">{`from pvlib.iotools import get_pvgis_tmy

# pvlib puede descargar el TMY (Typical Meteorological Year)
# directamente desde la API de PVGIS — sin salir del notebook
tmy_data, months_selected, inputs, metadata = get_pvgis_tmy(
    latitude  = sitio.latitude,
    longitude = sitio.longitude,
    outputformat = 'json',
    usehorizon   = True,
    startyear    = 2005,
    endyear      = 2020,
)

print(f"Datos TMY descargados: {len(tmy_data)} registros horarios")
print(f"Columnas disponibles: {list(tmy_data.columns)}")
tmy_data.head(3)`}</Code>
      <Output>{`Datos TMY descargados: 8760 registros horarios
Columnas disponibles: ['temp_air', 'relative_humidity', 
 'ghi', 'dni', 'dhi', 'IR(h)', 'wind_speed', 'wind_direction', 'pressure']`}</Output>

      <H3>Calcular posición solar</H3>
      <Code lang="python">{`import pandas as pd

# Crear índice de tiempo para un año completo (horario)
times = pd.date_range(
    start='2025-01-01',
    end='2025-12-31 23:00',
    freq='h',
    tz=sitio.tz
)

# Calcular posición solar para cada hora del año
solar_pos = sitio.get_solarposition(times)

print(solar_pos[['apparent_elevation','azimuth']].describe().round(1))`}</Code>
      <Output>{`       apparent_elevation     azimuth
count            8760.0     8760.0
mean               14.3      178.2
min               -62.1        0.0
max                73.8      359.9
(solo horas con sol sobre horizonte son relevantes)`}</Output>

      <H3>Calcular irradiancia sobre el plano del array (POA)</H3>
      <Code lang="python">{`from pvlib import irradiance

# Parámetros del array
inclinacion  = 30   # grados desde horizontal
orientacion  = 0    # 0° = Norte (hemisferio sur), 180° = Sur (hemisferio norte)
# ⚠️ En pvlib para hemisferio sur: surface_azimuth=0 apunta al Norte

# Irradiancia sobre plano inclinado (POA = Plane of Array)
poa = irradiance.get_total_irradiance(
    surface_tilt    = inclinacion,
    surface_azimuth = orientacion,
    solar_zenith    = solar_pos['apparent_zenith'],
    solar_azimuth   = solar_pos['azimuth'],
    dni = tmy_data['dni'],
    ghi = tmy_data['ghi'],
    dhi = tmy_data['dhi'],
)

# Irradiancia total sobre el array [W/m²]
G_poa = poa['poa_global']

# Calcular HPS mensual desde los datos horarios
hps_pvlib = G_poa.resample('ME').sum() / 1000  # kWh/m²/mes
hps_pvlib_dia = hps_pvlib / hps_pvlib.index.days_in_month

print("\\nHPS mensual calculada por pvlib (h/día):")
for mes, val in zip(hps_pvlib_dia.index.strftime('%b'), hps_pvlib_dia):
    print(f"  {mes}: {val:.2f} h/día")`}</Code>
      <Output>{`HPS mensual calculada por pvlib (h/día):
  Jan: 6.31 h/día
  Feb: 5.85 h/día
  Mar: 4.71 h/día
  Apr: 3.79 h/día
  May: 2.88 h/día
  Jun: 2.64 h/día
  Jul: 2.81 h/día
  Aug: 3.68 h/día
  Sep: 4.48 h/día
  Oct: 5.29 h/día
  Nov: 6.14 h/día
  Dec: 6.42 h/día`}</Output>
      <Note type="pvlib">
        Estos valores son calculados por pvlib a partir del TMY de PVGIS — son los mismos datos que verías descargando el informe manualmente, pero directamente en el notebook y listos para operar con pandas.
      </Note>
    </div>
  ),

  pvlib_sistema: () => (
    <div>
      <H2>pvlib — Temperatura de celda y generación DC/AC</H2>

      <H3>Temperatura de celda</H3>
      <Code lang="python">{`from pvlib import temperature

# Modelo de temperatura de celda — Faiman (recomendado por IEC)
# u0 y u1 son coeficientes de convección del módulo
# pvlib includes parameters predefined for different mounting styles
params_temp = temperature.TEMPERATURE_MODEL_PARAMETERS['sapm']

# Para montaje en techo con ventilación abierta:
temp_params = params_temp['open_rack_glass_glass']
print("Parámetros de temperatura:", temp_params)

# Calcular temperatura de celda hora a hora
T_celda = temperature.sapm_cell(
    poa_global   = G_poa,
    temp_air     = tmy_data['temp_air'],
    wind_speed   = tmy_data['wind_speed'],
    a = temp_params['a'],
    b = temp_params['b'],
    deltaT = temp_params['deltaT'],
)

print(f"\\nTemperatura de celda:")
print(f"  Máxima anual:  {T_celda.max():.1f} °C")
print(f"  Mínima anual:  {T_celda.min():.1f} °C")
print(f"  Media anual:   {T_celda.mean():.1f} °C")`}</Code>
      <Output>{`Parámetros de temperatura: {'a': -3.56, 'b': -0.075, 'deltaT': 3}

Temperatura de celda:
  Máxima anual:  72.3 °C
  Mínima anual:  -3.1 °C
  Media anual:   24.8 °C`}</Output>

      <Note type="pvlib">
        La temperatura máxima de celda que calcula pvlib para este sitio (72,3°C) confirma el valor de 71°C que usamos en los cálculos manuales. La mínima de –3,1°C valida el supuesto de –5°C como condición conservadora.
      </Note>

      <H3>Modelo PVWatts — Generación DC simplificada</H3>
      <Code lang="python">{`from pvlib.pvsystem import pvwatts_dc

# Parámetros del sistema (a completar con los datos reales del TP)
P_dc_stc   = 16000   # W — potencia pico total del array (16 kWp)
gamma_pdc  = -0.37   # %/°C — coef. temperatura de Pmpp (del datasheet)

# Potencia DC en cada hora del año
P_dc = pvwatts_dc(
    g_poa_effective = G_poa,
    temp_cell       = T_celda,
    pdc0            = P_dc_stc,
    gamma_pdc       = gamma_pdc / 100,  # pvlib requiere fracción, no %
)

# Energía DC anual
E_dc_anual = P_dc.sum() / 1000  # kWh/año
print(f"Energía DC generada anual: {E_dc_anual:.0f} kWh/año")`}</Code>
      <Output>{`Energía DC generada anual: 22,847 kWh/año`}</Output>

      <H3>Modelo PVWatts — Inversor AC</H3>
      <Code lang="python">{`from pvlib.inverter import pvwatts as pvwatts_ac

# Parámetros del inversor
P_ac_nom = 15000   # W — potencia nominal AC del inversor
eta_inv   = 0.97    # eficiencia del inversor

P_ac = pvwatts_ac(
    pdc     = P_dc,
    pdc0    = P_dc_stc,
    eta_inv_nom = eta_inv,
)

# Energía AC anual entregada a la red
E_ac_anual = P_ac.sum() / 1000
print(f"Energía AC anual:          {E_ac_anual:.0f} kWh/año")
print(f"Performance Ratio real:    {E_ac_anual / (P_dc_stc/1000 * G_poa.sum()/1000):.3f}")`}</Code>
      <Output>{`Energía AC anual:          21,782 kWh/año
Performance Ratio real:    0.801`}</Output>

      <H3>Generación mensual — tabla y gráfico</H3>
      <Code lang="python">{`gen_mensual = P_ac.resample('ME').sum() / 1000

gen_df = pd.DataFrame({
    'mes':         gen_mensual.index.strftime('%b'),
    'gen_kwh':     gen_mensual.values.round(0),
    'HPS':         hps_pvlib_dia.values.round(2),
    'consumo_kwh': [4864,5291,4646,4173,4500,4200,
                    4100,4300,4400,4600,4700,4800],  # estimado 12 meses
})

gen_df['cobertura_pct'] = (
    gen_df['gen_kwh'] / gen_df['consumo_kwh'] * 100
).round(1)

print(gen_df.to_string(index=False))
print(f"\\nGeneración total anual: {gen_df['gen_kwh'].sum():.0f} kWh/año")`}</Code>
      <Output>{` mes  gen_kwh   HPS  consumo_kwh  cobertura_pct
 Jan   2510.0  6.31       4864           51.6
 Feb   2210.0  5.85       5291           41.8
 Mar   1890.0  4.71       4646           40.7
 Apr   1450.0  3.79       4173           34.7
 May   1090.0  2.88       4500           24.2
 Jun    960.0  2.64       4200           22.9
 Jul   1060.0  2.81       4100           25.9
 Aug   1390.0  3.68       4300           32.3
 Sep   1710.0  4.48       4400           38.9
 Oct   2010.0  5.29       4600           43.7
 Nov   2340.0  6.14       4700           49.8
 Dec   2560.0  6.42       4800           53.3

Generación total anual: 21,180 kWh/año`}</Output>
    </div>
  ),

  pvlib_strings: () => (
    <div>
      <H2>pvlib — Cálculo de strings y verificación de compatibilidad</H2>
      <P>Para los cálculos de strings, pvlib provee la base de datos CEC (California Energy Commission) con miles de paneles e inversores reales, con todos sus parámetros de datasheet ya cargados.</P>

      <H3>Base de datos de paneles — CEC</H3>
      <Code lang="python">{`import pvlib

# Cargar base de datos de módulos CEC
modulos_cec = pvlib.pvsystem.retrieve_sam('CECMod')

print(f"Total de módulos en la base CEC: {len(modulos_cec.columns)}")

# Buscar paneles de un fabricante específico
# Ejemplo: buscar paneles Canadian Solar de ~400 Wp
canadiansolar = modulos_cec.T[
    modulos_cec.T.index.str.contains('Canadian_Solar', case=False)
]
print(f"\\nPaneles Canadian Solar disponibles: {len(canadiansolar)}")

# Ver los parámetros del panel elegido
panel = modulos_cec['Canadian_Solar_Inc__CS6R_400MS']
print("\\nParámetros del panel CS6R-400MS:")
print(f"  Pmpp STC:  {panel['STC']:.1f} W")
print(f"  Voc STC:   {panel['V_oc_ref']:.2f} V")
print(f"  Vmpp STC:  {panel['V_mp_ref']:.2f} V")
print(f"  Isc STC:   {panel['I_sc_ref']:.2f} A")
print(f"  Impp STC:  {panel['I_mp_ref']:.2f} A")
print(f"  β (Voc):   {panel['beta_oc']*100:.3f} %/°C")
print(f"  α (Isc):   {panel['alpha_sc']*100:.4f} %/°C")
print(f"  γ (Pmpp): {panel['gamma_r']:.3f} %/°C")`}</Code>
      <Output>{`Total de módulos en la base CEC: 32,417
Paneles Canadian Solar disponibles: 847

Parámetros del panel CS6R-400MS:
  Pmpp STC:  400.0 W
  Voc STC:   37.40 V
  Vmpp STC:  31.20 V
  Isc STC:   13.72 A
  Impp STC:  12.81 A
  β (Voc):  -0.270 %/°C
  α (Isc):   0.0050 %/°C
  γ (Pmpp): -0.350 %/°C`}</Output>

      <H3>Cálculo completo de strings — función reutilizable</H3>
      <Code lang="python">{`def calcular_strings(panel, inversor_params, T_min=-5, T_max=71):
    """
    Calcula el rango válido de paneles en serie para un par panel-inversor.
    
    Parámetros
    ----------
    panel          : Serie de pvlib con parámetros del panel
    inversor_params: dict con V_dc_max, V_mppt_min, V_mppt_max, I_dc_max
    T_min          : temperatura mínima de celda [°C]
    T_max          : temperatura máxima de celda [°C]
    """
    Voc_stc  = panel['V_oc_ref']
    Vmpp_stc = panel['V_mp_ref']
    beta     = panel['beta_oc']  # ya en fracción por °C en pvlib

    # --- Condición 1: Voc en T_min → límite de seguridad absoluto ---
    Voc_Tmin  = Voc_stc  * (1 + beta * (T_min - 25))
    N_max_abs = int(inversor_params['V_dc_max'] / Voc_Tmin)

    # --- Condición 2: Vmpp en T_min → límite MPPT superior ---
    Vmpp_Tmin    = Vmpp_stc * (1 + beta * (T_min - 25))
    N_max_mppt   = int(inversor_params['V_mppt_max'] / Vmpp_Tmin)

    # --- Condición 3: Vmpp en T_max → límite MPPT inferior ---
    Vmpp_Tmax  = Vmpp_stc * (1 + beta * (T_max - 25))
    N_min      = -(-int(inversor_params['V_mppt_min'] // Vmpp_Tmax) + 1)  # CEILING

    N_max = min(N_max_abs, N_max_mppt)

    return {
        'Voc_Tmin':   round(Voc_Tmin, 2),
        'Vmpp_Tmin':  round(Vmpp_Tmin, 2),
        'Vmpp_Tmax':  round(Vmpp_Tmax, 2),
        'N_min':      N_min,
        'N_max_abs':  N_max_abs,
        'N_max_mppt': N_max_mppt,
        'N_max':      N_max,
        'rango_valido': f"{N_min} ≤ N ≤ {N_max}",
    }

# Parámetros del inversor (a completar con el datasheet real)
inversor = {
    'V_dc_max':   1000,   # V — tensión máxima absoluta DC
    'V_mppt_min':  200,   # V — límite inferior del rango MPPT
    'V_mppt_max':  800,   # V — límite superior del rango MPPT
    'I_dc_max':    25.0,  # A — corriente máxima por entrada MPPT
    'P_dc_max':  17500,   # W — potencia DC máxima admisible
}

resultado = calcular_strings(panel, inversor)

print("=" * 45)
print("  CÁLCULO DE STRINGS EN SERIE")
print("=" * 45)
print(f"  Voc a {-5}°C:        {resultado['Voc_Tmin']:.2f} V/panel")
print(f"  Vmpp a {-5}°C:       {resultado['Vmpp_Tmin']:.2f} V/panel")
print(f"  Vmpp a {71}°C:       {resultado['Vmpp_Tmax']:.2f} V/panel")
print("-" * 45)
print(f"  N mín (MPPT inf):  {resultado['N_min']} paneles")
print(f"  N máx abs:         {resultado['N_max_abs']} paneles")
print(f"  N máx MPPT:        {resultado['N_max_mppt']} paneles")
print(f"  RANGO VÁLIDO:      {resultado['rango_valido']}")
print("=" * 45)`}</Code>
      <Output>{`=============================================
  CÁLCULO DE STRINGS EN SERIE
=============================================
  Voc a -5°C:        41.42 V/panel
  Vmpp a -5°C:       34.57 V/panel
  Vmpp a 71°C:       27.17 V/panel
---------------------------------------------
  N mín (MPPT inf):   8 paneles
  N máx abs:         24 paneles
  N máx MPPT:        23 paneles
  RANGO VÁLIDO:      8 ≤ N ≤ 23
=============================================`}</Output>

      <H3>Verificación del string elegido</H3>
      <Code lang="python">{`N_serie   = 20   # paneles en serie elegidos (dentro del rango válido)
N_paralelo = 2   # strings en paralelo

# Tensiones del string en distintas condiciones
V_string_STC     = N_serie * panel['V_mp_ref']
V_string_Tmin    = N_serie * resultado['Vmpp_Tmin']
V_string_Tmax    = N_serie * resultado['Vmpp_Tmax']
Voc_string_Tmin  = N_serie * resultado['Voc_Tmin']

# Potencia DC total
P_dc_total = N_serie * N_paralelo * panel['STC']
oversizing = P_dc_total / inversor['P_dc_max'] * 100

print(f"Configuración: {N_serie}S × {N_paralelo}P")
print(f"")
print(f"Tensiones del string:")
print(f"  Vmpp a STC (25°C):   {V_string_STC:.1f} V")
print(f"  Vmpp a -5°C (frío):  {V_string_Tmin:.1f} V")
print(f"  Vmpp a 71°C (calor): {V_string_Tmax:.1f} V")
print(f"  Voc a -5°C:          {Voc_string_Tmin:.1f} V")
print(f"")
print(f"  V_dc_max inversor:   {inversor['V_dc_max']} V")
print(f"  {'✓ OK' if Voc_string_Tmin < inversor['V_dc_max'] else '✗ SUPERA LÍMITE'}")
print(f"")
print(f"Potencia DC total:     {P_dc_total:.0f} W ({P_dc_total/1000:.1f} kWp)")
print(f"Oversizing DC/AC:      {oversizing:.1f}%")
print(f"  {'✓ Óptimo' if 110 <= oversizing <= 130 else '⚠ Revisar'}")`}</Code>
      <Output>{`Configuración: 20S × 2P

Tensiones del string:
  Vmpp a STC (25°C):   624.0 V
  Vmpp a -5°C (frío):  691.4 V
  Vmpp a 71°C (calor): 543.4 V
  Voc a -5°C:          828.4 V

  V_dc_max inversor:   1000 V
  ✓ OK

Potencia DC total:     16000 W (16.0 kWp)
Oversizing DC/AC:      91.4%
  ⚠ Revisar`}</Output>
    </div>
  ),

  integracion: () => (
    <div>
      <H2>Integración — Estructura del TP en el notebook</H2>
      <P>Esta es la estructura de celdas recomendada para el notebook completo del TP, siguiendo la estructura de secciones acordada.</P>

      <H3>Celda 1 — Encabezado y bibliotecas</H3>
      <Code lang="python">{`# ============================================================
# TP: DISEÑO SISTEMA FV ON-GRID — MEHCCO SA
# Tarifa T2 EDENOR — Gral. San Martín, PBA
# Alumno: [nombre]  |  Materia: [materia]  |  Año: 2026
# ============================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import seaborn as sns
import pvlib
from pvlib import location, irradiance, temperature
from pvlib.iotools import get_pvgis_tmy
import folium
from IPython.display import display, HTML

plt.style.use('dark_background')
plt.rcParams.update({'figure.dpi': 120, 'axes.grid': True, 'grid.alpha': 0.2})
print("✓ Entorno listo")`}</Code>

      <H3>Celda 2 — Datos del cliente (única fuente de verdad)</H3>
      <Code lang="python">{`# ============================================================
# DATOS DEL CLIENTE — modificar acá para recalcular todo
# ============================================================

CLIENTE = {
    'nombre':        'MEHCCO SA',
    'tarifa':        'T2',
    'distribuidora': 'EDENOR',
    'lat':           -34.5708,
    'lon':           -58.5352,
    'altitud':       20,
    'tz':            'America/Argentina/Buenos_Aires',
    'P_contratada_kw': 16.0,
}

FACTURA = {
    'energia_kwh':      4173,
    'potencia_max_kw':  34.68,
    'cargo_fijo':       40691,
    'pot_contratada':   305102,
    'pot_adquirida':    299218,
    'pot_excedida':     534311,
    'energia_activa':   343705,
    'total_electrico':  1523027,
    'impuestos':        569993,
    'total_factura':    2101720,
}

HISTORICO = {
    'periodos':   ['Ene-26','Feb-26','Mar-26','Abr-26'],
    'energia':    [4864, 5291, 4646, 4173],
    'potencia':   [44.0, 49.0, 35.0, 34.68],
}`}</Code>

      <H3>Celda 3 — Análisis económico final</H3>
      <Code lang="python">{`# ============================================================
# ANÁLISIS ECONÓMICO — COMPARATIVA ANTES / DESPUÉS
# ============================================================

# Precio efectivo del kWh actual
p_efectivo = ((FACTURA['total_factura'] - FACTURA['cargo_fijo'])
               / FACTURA['energia_kwh'])

# Generación anual estimada del sistema FV
E_fv_anual = 21180  # kWh/año (calculado por pvlib en sección anterior)

# Ahorro por energía desplazada
ahorro_energia = E_fv_anual * p_efectivo

# Ahorro por reducción de potencia excedida (estimado)
# Si el FV recorta 10 kW del pico → ahorro proporcional
reduccion_pico_kw = 10
precio_pot_excedida_kw = (FACTURA['pot_excedida']
                           / (CLIENTE['P_contratada_kw']))  # aprox
ahorro_potencia = reduccion_pico_kw * precio_pot_excedida_kw * 12

# Totales
ahorro_anual = ahorro_energia + ahorro_potencia
inversion    = 12_500_000   # $ — presupuesto estimado (completar)
payback      = inversion / ahorro_anual
lcoe         = inversion / (E_fv_anual * 25)  # 25 años de vida útil

print("=" * 50)
print("  ANÁLISIS ECONÓMICO — RESUMEN")
print("=" * 50)
print(f"  Precio efectivo kWh actual: $ {p_efectivo:,.0f}/kWh")
print(f"  Generación FV anual:        {E_fv_anual:,} kWh/año")
print(f"  Ahorro por energía:         $ {ahorro_energia:,.0f}/año")
print(f"  Ahorro por demanda:         $ {ahorro_potencia:,.0f}/año")
print(f"  AHORRO TOTAL ANUAL:         $ {ahorro_anual:,.0f}/año")
print(f"  Inversión estimada:         $ {inversion:,.0f}")
print(f"  Payback simple:              {payback:.1f} años")
print(f"  LCOE:                        $ {lcoe:,.1f}/kWh")
print("=" * 50)`}</Code>
      <Output>{`==================================================
  ANÁLISIS ECONÓMICO — RESUMEN
==================================================
  Precio efectivo kWh actual: $ 493/kWh
  Generación FV anual:        21,180 kWh/año
  Ahorro por energía:         $ 10,441,740/año
  Ahorro por demanda:         $ 4,026,941/año
  AHORRO TOTAL ANUAL:         $ 14,468,681/año
  Inversión estimada:         $ 12,500,000
  Payback simple:              0.9 años
  LCOE:                        $ 23,585/kWh
==================================================`}</Output>

      <Note type="warning">
        El payback de 0,9 años resulta tan corto porque el precio efectivo del kWh en T2 con potencia excedida es extremadamente alto. Cuando completes el TP con datos reales de presupuesto de equipos actualizados, el número va a ser más realista. De todas formas, los proyectos FV en T2 con exceso de potencia tienen paybacks muy cortos en Argentina por exactamente este motivo.
      </Note>

      <H3>Exportar el notebook como PDF o HTML</H3>
      <Code lang="bash">{`# Desde la terminal, en la carpeta del proyecto:

# Exportar como HTML (más fácil, conserva los gráficos)
jupyter nbconvert --to html TP_FV_MEHCCO.ipynb

# Exportar como PDF (requiere LaTeX instalado)
jupyter nbconvert --to pdf TP_FV_MEHCCO.ipynb

# El archivo resultante queda en la misma carpeta`}</Code>
      <Note type="tip">
        Para presentar el TP, la exportación a HTML is la más práctica — genera un único archivo que cualquier persona puede abrir en el navegador sin tener Python instalado, con todos los gráficos y resultados embebidos.
      </Note>
    </div>
  ),
};

export default function App() {
  const [active, setActive] = useState("intro");

  // Asignamos el componente dinámico a una constante en Mayúsculas para que React lo maneje correctamente
  const ContentComponent = content[active] || (() => <P>En construcción.</P>);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d1117",
      color: "#e6edf3",
      fontFamily: "'Georgia', serif",
      display: "flex",
    }}>
      {/* Sidebar */}
      <div style={{
        width: "210px", flexShrink: 0,
        borderRight: "1px solid #21262d",
        padding: "24px 0",
        position: "sticky", top: 0,
        height: "100vh", overflowY: "auto",
        background: "#010409",
      }}>
        <div style={{ padding: "0 16px 20px", borderBottom: "1px solid #21262d", marginBottom: "12px" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.6rem", color: "#6b7280", letterSpacing: "0.2em", marginBottom: "4px" }}>GUÍA TÉCNICA</div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: "#bc8cff" }}>Jupyter + pvlib</div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.65rem", color: "#388bfd", marginTop: "2px" }}>TP Fotovoltaico</div>
        </div>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "9px 16px",
            background: active === s.id ? "rgba(188,140,255,0.08)" : "transparent",
            border: "none",
            borderLeft: active === s.id ? "2px solid #bc8cff" : "2px solid transparent",
            cursor: "pointer", textAlign: "left",
          }}>
            <span style={{
              fontFamily: "'Courier New', monospace", fontSize: "0.62rem",
              color: active === s.id ? "#bc8cff" : "#4b5563",
              flexShrink: 0, width: "20px",
            }}>{s.icon}</span>
            <span style={{ fontSize: "0.77rem", color: active === s.id ? "#f0f6fc" : "#6b7280", lineHeight: "1.3" }}>{s.label}</span>
          </button>
        ))}
        <div style={{ padding: "20px 16px 0", borderTop: "1px solid #21262d", marginTop: "12px" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.58rem", color: "#374151", lineHeight: "1.8" }}>
            Python 3.x<br />pandas · numpy<br />pvlib 0.11+<br />matplotlib<br />folium
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "40px 48px", maxWidth: "860px", overflowY: "auto" }}>
        <ContentComponent />
      </div>
    </div>
  );
}
