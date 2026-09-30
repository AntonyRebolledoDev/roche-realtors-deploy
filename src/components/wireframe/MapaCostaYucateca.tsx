import { useState, useRef, useEffect, useCallback } from "react";

interface MapPoint {
  name: string;
  x: number;
  y: number;
  tooltipOffset: number;
  mobileTooltipOffset: number;
}

const MAP_POINTS: MapPoint[] = [
  { name: "Celestún",       x: 7,    y: 87,   tooltipOffset: 15,  mobileTooltipOffset: 8  },
  { name: "Sisal",          x: 21.5, y: 64.5, tooltipOffset: 15,  mobileTooltipOffset: 8  },
  { name: "Chuburná",       x: 31.5, y: 58.5, tooltipOffset: 25,  mobileTooltipOffset: 12 },
  { name: "Chelem",         x: 35,   y: 57,   tooltipOffset: 70,  mobileTooltipOffset: 40 },
  { name: "Yucalpetén",     x: 38,   y: 56,   tooltipOffset: 150, mobileTooltipOffset: 50 },
  { name: "Progreso",       x: 40.5, y: 55,   tooltipOffset: 15,  mobileTooltipOffset: 8  },
  { name: "Chicxulub",      x: 43,   y: 54,   tooltipOffset: 90,  mobileTooltipOffset: 30 },
  { name: "Uaymitun",       x: 48,   y: 52,   tooltipOffset: 20,  mobileTooltipOffset: 10 },
  { name: "San Benito",     x: 51,   y: 51,   tooltipOffset: 100, mobileTooltipOffset: 50 },
  { name: "San Bruno",      x: 54,   y: 51,   tooltipOffset: 55,  mobileTooltipOffset: 38 },
  { name: "Telchac Puerto", x: 59,   y: 51,   tooltipOffset: 15,  mobileTooltipOffset: 25 },
  { name: "San Crisanto",   x: 65,   y: 49,   tooltipOffset: 55,  mobileTooltipOffset: 8  },
  { name: "Santa Clara",    x: 70,   y: 48,   tooltipOffset: 15,  mobileTooltipOffset: 35 },
  { name: "Dzilam de Bravo",x: 80,   y: 44,   tooltipOffset: 20,  mobileTooltipOffset: 10 },
  { name: "Río Lagartos",   x: 85,   y: 37,   tooltipOffset: 20,  mobileTooltipOffset: 10 },
  { name: "Las Coloradas",  x: 90,   y: 35,   tooltipOffset: 50,  mobileTooltipOffset: 20 },
  { name: "El Cuyo",        x: 96,   y: 35,   tooltipOffset: 15,  mobileTooltipOffset: 8  },
];

export function MapaCostaYucateca() {
  const [activePoints, setActivePoints] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomableRef = useRef<HTMLDivElement>(null);

  const zoomRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0 });
  const pinchRef = useRef({ initialDist: 0, initialZoom: 1 });
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 3;
  const STEP = 0.5;

  const applyTransform = useCallback(() => {
    if (!zoomableRef.current) return;
    const { x, y } = panRef.current;
    zoomableRef.current.style.transform = `translate(${x}px, ${y}px) scale(${zoomRef.current})`;
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

  const handleZoomIn = () => { zoomRef.current = Math.min(zoomRef.current + STEP, MAX_ZOOM); constrainPan(); applyTransform(); };
  const handleZoomOut = () => { zoomRef.current = Math.max(zoomRef.current - STEP, MIN_ZOOM); constrainPan(); applyTransform(); };
  const handleZoomReset = () => { zoomRef.current = 1; panRef.current = { x: 0, y: 0 }; applyTransform(); };

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
      constrainPan(); applyTransform();
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
        constrainPan(); applyTransform();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        zoomRef.current = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, pinchRef.current.initialZoom * (dist / pinchRef.current.initialDist)));
        constrainPan(); applyTransform();
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

  useEffect(() => {
    const onResize = () => {
      if (zoomRef.current !== 1 || panRef.current.x !== 0 || panRef.current.y !== 0) {
        zoomRef.current = 1; panRef.current = { x: 0, y: 0 }; applyTransform();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyTransform]);

  const togglePoint = (name: string) => {
    setActivePoints((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const reset = () => setActivePoints(new Set());

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-1">Costa Yucateca</h2>
      <p className="text-sm text-foreground/60 mb-4">
        Donde el mar, la inversión y la tranquilidad se encuentran
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Panel de localidades */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-border p-5 max-h-[420px] lg:max-h-[560px] overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-black mb-3 font-medium">Localidades</p>
          <div className="space-y-0.5">
            {MAP_POINTS.map((p) => (
              <label
                key={p.name}
                className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={activePoints.has(p.name)}
                  onChange={() => togglePoint(p.name)}
                  className="w-4 h-4 accent-gold cursor-pointer"
                />
                <span className="text-sm text-gray-800 font-medium">{p.name}</span>
              </label>
            ))}
          </div>
          {activePoints.size > 0 && (
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
              className="relative"
            >
              <img
                src="/costa-mapa.png"
                alt="Mapa Costa Yucateca"
                className="w-full block select-none"
                draggable={false}
              />
              {/* Puntos activos sobre el mapa */}
              {MAP_POINTS.filter((p) => activePoints.has(p.name)).map((p) => {
                const offset = p.tooltipOffset;
                return (
                  <div key={p.name}>
                    {/* Línea de conexión */}
                    <div
                      style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: "2px",
                        height: `${offset - 6}px`,
                        backgroundColor: "#dc2626",
                        transform: "translate(-50%, -100%)",
                        marginTop: "-6px",
                        zIndex: 15,
                        pointerEvents: "none",
                      }}
                    />
                    {/* Tooltip */}
                    <div
                      style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        marginTop: `-${offset}px`,
                        transform: "translate(-50%, -100%)",
                        zIndex: 20,
                        pointerEvents: "none",
                      }}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap shadow-lg"
                    >
                      {p.name}
                      {/* Flecha */}
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                          borderLeft: "5px solid transparent",
                          borderRight: "5px solid transparent",
                          borderTop: "5px solid #dc2626",
                        }}
                      />
                    </div>
                    {/* Punto */}
                    <div
                      style={{
                        position: "absolute",
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        zIndex: 10,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="w-3 h-3 bg-red-600 border-2 border-white rounded-full shadow-lg hover:scale-125 transition-transform"
                    />
                  </div>
                );
              })}
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
