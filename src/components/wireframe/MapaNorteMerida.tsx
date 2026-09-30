import { useState, useRef, useEffect, useCallback } from "react";

// svgId must match exactly the id="..." attribute in merida-zonas.svg
const ZONAS: { id: string; label: string; svgId: string }[] = [
  { id: "conkal",               label: "Conkal",               svgId: "CONKAL" },
  { id: "sitpach",              label: "Sitpach",              svgId: "SITPACH" },
  { id: "cholul",               label: "Cholul",               svgId: "CHOLUL" },
  { id: "santa_gertrudis_copo", label: "Santa Gertrudis Copó", svgId: "SANTA_GERTRUDIS_COPO" },
  { id: "temozon_norte",        label: "Temozón Norte",        svgId: "TEMOZÓN_NORTE" },
  { id: "dzitya",               label: "Dzityá",               svgId: "DZITYÁ" },
  { id: "caucel_norte",         label: "Caucel Norte",         svgId: "CD_CAUCEL" },
  { id: "real_montejo",         label: "Real Montejo",         svgId: "REAL_MONTEJO" },
  { id: "chablekal",            label: "Chablekal",            svgId: "CHABLEKAL" },
  { id: "komchen",              label: "Komchén",              svgId: "KOMCHÉN" },
  { id: "altabrisa",            label: "Altabrisa",            svgId: "ALTABRISA" },
  { id: "villas_del_sol",       label: "Villas Del Sol",       svgId: "VILLAS_DEL_SOL" },
  { id: "colonia_mexico",       label: "Colonia México",       svgId: "COLONIA_MÉXICO" },
  { id: "montebello",           label: "Montebello",           svgId: "MONTEBELLO" },
  { id: "montecarlo",           label: "Montecarlo",           svgId: "MONTECARLO" },
  { id: "san_ramon_norte",      label: "San Ramón Norte",      svgId: "SAN_RAMÓN_NORTE" },
  { id: "cordemex",             label: "Cordemex",             svgId: "CORDEMEX" },
  { id: "campestre",            label: "Campestre",            svgId: "CAMPESTRE" },
  { id: "chuburna",             label: "Chuburná",             svgId: "CHUBURNA" },
  { id: "itzimna",              label: "Itzimná",              svgId: "ITZIMNÁ" },
  { id: "montecristo",          label: "Montecristo",          svgId: "MONTECRISTO" },
  { id: "maya",                 label: "Maya",                 svgId: "MAYA" },
  { id: "emiliano_zapata",      label: "Emiliano Zapata",      svgId: "EMILIANO_ZAPATA" },
  { id: "benito_juarez_nte",    label: "Benito Juaréz Norte",  svgId: "BENITO_JUÁREZ_NTE" },
  { id: "villas_la_hacienda",   label: "Villas La Hacienda",   svgId: "VILLAS_LA_HACIENDA" },
  { id: "sodzil_nte",           label: "Sodzil Norte",         svgId: "SODZIL_NTE" },
  { id: "mexico_nte",           label: "México Norte",         svgId: "MÉXICO_NTE" },
  { id: "montealban",           label: "Montealban",           svgId: "MONTEALBAN" },
  { id: "montes_de_ame",        label: "Montes De Ame",        svgId: "MONTES_DE_AME" },
  { id: "gonzalo_guerrero",     label: "Gonzalo Guerrero",     svgId: "GONZALO_GUERRERO" },
  { id: "francisco_de_montejo", label: "Francisco De Montejo", svgId: "FRANCISCO_DE_MONTEJO" },
];

export function MapaNorteMerida() {
  const [activeZones, setActiveZones] = useState<Set<string>>(new Set());
  const svgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomableRef = useRef<HTMLDivElement>(null);

  // Zoom / pan state
  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 });
  const pinchRef = useRef({ initialDist: 0, initialZoom: 1 });
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const STEP = 0.5;

  // Fetch SVG and inject; hide all zone groups by default
  useEffect(() => {
    fetch("/merida-zonas.svg")
      .then((r) => r.text())
      .then((text) => {
        if (!svgRef.current) return;
        svgRef.current.innerHTML = text;
        const svg = svgRef.current.querySelector("svg");
        if (svg) {
          svg.style.position = "absolute";
          svg.style.top = "0";
          svg.style.left = "0";
          svg.style.width = "100%";
          svg.style.height = "100%";
        }
        // SVG groups use id="ZONE_NAME" (uppercase). Hide all of them initially.
        svgRef.current.querySelectorAll<SVGGElement>("svg > g[id]").forEach((el) => {
          el.style.display = "none";
        });
      });
  }, []);

  // Sync zone visibility using the exact SVG id from the ZONAS map
  useEffect(() => {
    if (!svgRef.current) return;
    svgRef.current.querySelectorAll<SVGGElement>("svg > g[id]").forEach((el) => {
      el.style.display = "none";
    });
    activeZones.forEach((zoneId) => {
      const zona = ZONAS.find((z) => z.id === zoneId);
      if (!zona) return;
      const el = svgRef.current!.querySelector<SVGGElement>(`#${CSS.escape(zona.svgId)}`);
      if (el) el.style.display = "block";
    });
  }, [activeZones]);

  const applyTransform = useCallback(() => {
    if (!zoomableRef.current) return;
    const { x, y } = panRef.current;
    const z = zoomRef.current;
    zoomableRef.current.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
  }, []);

  const constrainPan = useCallback(() => {
    const z = zoomRef.current;
    if (z <= 1) { panRef.current = { x: 0, y: 0 }; return; }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const maxX = (rect.width * z - rect.width) / 2;
    const maxY = (rect.height * z - rect.height) / 2;
    panRef.current.x = Math.max(-maxX, Math.min(maxX, panRef.current.x));
    panRef.current.y = Math.max(-maxY, Math.min(maxY, panRef.current.y));
  }, []);

  const handleZoomIn = () => {
    zoomRef.current = Math.min(zoomRef.current + STEP, MAX_ZOOM);
    constrainPan();
    applyTransform();
  };
  const handleZoomOut = () => {
    zoomRef.current = Math.max(zoomRef.current - STEP, MIN_ZOOM);
    constrainPan();
    applyTransform();
  };
  const handleZoomReset = () => {
    zoomRef.current = 1;
    panRef.current = { x: 0, y: 0 };
    applyTransform();
  };

  // Mouse drag
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, startPanX: panRef.current.x, startPanY: panRef.current.y };
      container.style.cursor = "grabbing";
      if (zoomableRef.current) zoomableRef.current.style.transition = "none";
    };
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return;
      e.preventDefault();
      panRef.current.x = dragRef.current.startPanX + e.clientX - dragRef.current.startX;
      panRef.current.y = dragRef.current.startPanY + e.clientY - dragRef.current.startY;
      constrainPan();
      applyTransform();
    };
    const onUp = () => {
      dragRef.current.dragging = false;
      container.style.cursor = "grab";
      if (zoomableRef.current) zoomableRef.current.style.transition = "transform 0.3s ease";
    };
    container.addEventListener("mousedown", onDown);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      container.removeEventListener("mousedown", onDown);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [constrainPan, applyTransform]);

  // Touch events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragRef.current = { dragging: true, startX: e.touches[0].clientX, startY: e.touches[0].clientY, startPanX: panRef.current.x, startPanY: panRef.current.y };
        if (zoomableRef.current) zoomableRef.current.style.transition = "none";
      } else if (e.touches.length === 2) {
        e.preventDefault();
        dragRef.current.dragging = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        pinchRef.current = { initialDist: Math.sqrt(dx * dx + dy * dy), initialZoom: zoomRef.current };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && dragRef.current.dragging) {
        e.preventDefault();
        panRef.current.x = dragRef.current.startPanX + e.touches[0].clientX - dragRef.current.startX;
        panRef.current.y = dragRef.current.startPanY + e.touches[0].clientY - dragRef.current.startY;
        constrainPan();
        applyTransform();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        zoomRef.current = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchRef.current.initialZoom * (dist / pinchRef.current.initialDist)));
        constrainPan();
        applyTransform();
      }
    };
    const onTouchEnd = () => {
      dragRef.current.dragging = false;
      if (zoomableRef.current) zoomableRef.current.style.transition = "transform 0.3s ease";
    };
    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
    };
  }, [constrainPan, applyTransform]);

  // Reset zoom on window resize
  useEffect(() => {
    const onResize = () => {
      if (zoomRef.current !== 1 || panRef.current.x !== 0 || panRef.current.y !== 0) {
        zoomRef.current = 1;
        panRef.current = { x: 0, y: 0 };
        applyTransform();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyTransform]);

  const toggleZone = (id: string) => {
    setActiveZones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => setActiveZones(new Set());

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-1">Norte de Mérida</h2>
      <p className="text-sm text-foreground/60 mb-4">
        El corazón del crecimiento residencial y comercial de Yucatán
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Panel de colonias */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border p-5 max-h-[420px] lg:max-h-[560px] overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-black mb-3 font-medium">Colonias</p>
          <div className="space-y-0.5">
            {ZONAS.map((z) => (
              <label
                key={z.id}
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activeZones.has(z.id)}
                  onChange={() => toggleZone(z.id)}
                  className="w-4 h-4 accent-gold cursor-pointer"
                />
                <span className="text-sm text-gray-800 font-medium">{z.label}</span>
              </label>
            ))}
          </div>
          {activeZones.size > 0 && (
            <button
              onClick={reset}
              className="mt-4 w-full text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
                <path d="M8.45221 0.952209C5.27854 0.952209 2.6272 3.22228 2.03133 6.22269L0.786738 4.66682L0 5.29641L2.01472 7.8148C2.11292 7.9372 2.25899 8.00367 2.40809 8.00367C2.48414 8.00367 2.56119 7.98654 2.63323 7.95079L5.65529 6.43975L5.2045 5.53866L2.9838 6.64878C3.3958 3.99741 5.68702 1.95955 8.45221 1.95955C11.507 1.95955 13.9927 4.44519 13.9927 7.5C13.9927 10.5548 11.507 13.0405 8.45221 13.0405V14.0478C12.0625 14.0478 15 11.1103 15 7.5C15 3.88966 12.0625 0.952209 8.45221 0.952209Z" fill="currentColor"/>
              </svg>
              Restablecer filtros
            </button>
          )}
        </div>

        {/* Mapa */}
        <div className="lg:col-span-9 relative">
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-2xl"
            style={{ cursor: "grab" }}
          >
            <div
              ref={zoomableRef}
              style={{ transformOrigin: "center center", transition: "transform 0.3s ease", willChange: "transform" }}
            >
              <img
                src="/merida-mapa.png"
                alt="Norte de Mérida - Zonas y Colonias"
                className="w-full block select-none"
                draggable={false}
              />
              {/* SVG overlay inyectado via fetch */}
              <div ref={svgRef} className="absolute inset-0 pointer-events-none" />
            </div>
          </div>
          {/* Controles de zoom */}
          <div className="flex justify-center gap-2 mt-3">
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center text-lg font-bold transition-colors shadow"
            >
              −
            </button>
            <button
              onClick={handleZoomReset}
              className="px-4 h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors shadow"
            >
              Reiniciar
            </button>
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center text-lg font-bold transition-colors shadow"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
