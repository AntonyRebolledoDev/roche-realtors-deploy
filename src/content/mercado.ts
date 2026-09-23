// Datos de Inteligencia de Mercado.
// Fuente: SOFTEC, DIME® Mérida, Junio 2026.
// Estructura pensada para ser editable desde un panel de administración.

export const MERCADO_META = {
  titulo: "Inteligencia de mercado",
  subtitulo:
    "Información, Data y Tendencias del Mercado Inmobiliario en Mérida, Yucatán. Datos estadísticos aproximados de fuentes confiables.",
  badge: "Actualizado a 2T 2026",
  fuente: "Fuente: SOFTEC, DIME® Mérida, Junio 2026.",
};

export const KPIS_HORIZONTAL = [
  { valor: "48.5%", label: "Vivienda horizontal respecto al inventario total" },
  { valor: "1,488", label: "Unidades de vivienda horizontal nueva vendida 2026" },
  { valor: "$25,159", label: "Precio promedio m² vivienda horizontal" },
  { valor: "19", label: "Proyectos nuevos en 2T26" },
];

export const KPIS_VERTICAL = [
  { valor: "51.5%", label: "Vivienda vertical respecto al inventario total" },
  { valor: "1,780", label: "Unidades de vivienda vertical nueva vendida 2026" },
  { valor: "$47,723", label: "Precio promedio m² vivienda vertical" },
  { valor: "22", label: "Proyectos nuevos vivienda vertical en 2T26" },
];

export const DEMOGRAFICOS = {
  poblacion: [
    { valor: "1,252,324", label: "Habitantes totales" },
    { valor: "49%", label: "Hombres" },
    { valor: "51%", label: "Mujeres" },
  ],
  edad: [
    { valor: "38%", label: "0–24 años" },
    { valor: "54%", label: "25–64 años" },
    { valor: "8%", label: "+64 años" },
  ],
  vivienda: [
    { valor: "536,007", label: "Viviendas" },
    { valor: "2.3", label: "Habitantes por vivienda" },
  ],
  tenencia: [
    { label: "Propia", valor: 75 },
    { label: "Prestada", valor: 9 },
    { label: "Rentada", valor: 13 },
    { label: "Otro", valor: 3 },
  ],
  adquisicion: [
    { label: "Se mandó construir", valor: 34 },
    { label: "Autoconstrucción", valor: 7 },
    { label: "Comprada", valor: 50 },
    { label: "Otro", valor: 9 },
  ],
  creditos: [
    { valor: "94,113", label: "Derechohabientes · demanda potencial de créditos" },
    { valor: "58.5%", label: "Porcentaje de ocupación de hoteles*" },
  ],
  turismo: [
    { valor: "1.7", label: "Número de días promedio*" },
    { valor: "255,135", label: "Cuartos disponibles*¹" },
    { valor: "8,230", label: "Promedio diario**" },
  ],
  nse: [
    ["A/B", "12%"],
    ["C+", "15%"],
    ["C", "19%"],
    ["C-", "18%"],
    ["D+", "16%"],
    ["D/E", "20%"],
  ] as [string, string][],
};

export const PRECIO_HORIZONTAL = [
  { anio: "2022", Medio: 16869, Residencial: 18916, "Residencial Plus": 36647 },
  { anio: "2023", Medio: 18338, Residencial: 20036, "Residencial Plus": 35866 },
  { anio: "2024", Medio: 19951, Residencial: 21350, "Residencial Plus": 34590 },
  { anio: "2025", Medio: 21465, Residencial: 21887, "Residencial Plus": 34911 },
  { anio: "2026", Medio: 22493, Residencial: 22588, "Residencial Plus": 35811 },
];

export const PRECIO_VERTICAL = [
  { anio: "2022", Medio: 30826, Residencial: 38526, "Residencial Plus": 55126 },
  { anio: "2023", Medio: 33397, Residencial: 41342, "Residencial Plus": 56883 },
  { anio: "2024", Medio: 35941, Residencial: 43458, "Residencial Plus": 58919 },
  { anio: "2025", Medio: 38455, Residencial: 43806, "Residencial Plus": 60094 },
  { anio: "2026", Medio: 39821, Residencial: 43526, "Residencial Plus": 60245 },
];

export const PRECIO_SEGMENTO = [
  { segmento: "Medio", Horizontal: 34435, Vertical: 40089 },
  { segmento: "Residencial", Horizontal: 35173, Vertical: 43420 },
  { segmento: "Residencial Plus", Horizontal: 54401, Vertical: 60487 },
];

export const ABSORCION = [
  { producto: "Casa", unidades: 86.9 },
  { producto: "Departamento", unidades: 191.0 },
  { producto: "Town House", unidades: 55.6 },
];

export const PROYECTOS_MUNICIPIO = [
  { municipio: "Mérida", Horizontal: 72, Vertical: 169 },
  { municipio: "Conkal", Horizontal: 24, Vertical: 10 },
  { municipio: "Progreso", Horizontal: 6, Vertical: 13 },
  { municipio: "Kanasín", Horizontal: 3, Vertical: 1 },
  { municipio: "Otros municipios", Horizontal: 6, Vertical: 9 },
];

export const NOTA_MUNICIPIOS =
  "Otros municipios incluye Dzemul, Yaxkukul, Ucú, Hunucmá y Telchac Puerto.";

export const CALLOUTS_MUNICIPIO = [
  { valor: "69%", label: "Proyectos activos ubicados en Mérida" },
  { valor: "169", label: "Proyectos verticales en Mérida" },
  { valor: "72", label: "Proyectos horizontales en Mérida" },
];
