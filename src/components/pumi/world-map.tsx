import { useEffect, useRef, useState } from "react";
import { Compass, MapPin, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PartnerInstitution } from "@/lib/pumi/data";
import { Go } from "./shared";

// Equirectangular world landmass polygons [lng, lat] for crisp flat Mapa-Mundi rendering.
const LANDMASSES: Array<Array<[number, number]>> = [
  // North & Central America
  [
    [-168, 66],
    [-162, 70],
    [-140, 70],
    [-124, 72],
    [-108, 73],
    [-95, 72],
    [-82, 68],
    [-75, 62],
    [-64, 61],
    [-55, 52],
    [-60, 46],
    [-65, 44],
    [-70, 42],
    [-75, 35],
    [-81, 31],
    [-80, 25],
    [-83, 29],
    [-89, 30],
    [-97, 26],
    [-96, 19],
    [-90, 21],
    [-87, 21],
    [-88, 16],
    [-83, 10],
    [-78, 8],
    [-80, 7],
    [-85, 11],
    [-92, 14],
    [-105, 20],
    [-110, 24],
    [-114, 31],
    [-117, 32],
    [-122, 37],
    [-124, 48],
    [-132, 55],
    [-141, 60],
    [-152, 60],
    [-162, 55],
    [-166, 60],
    [-168, 66],
  ],
  // Caribbean (Cuba & Hispaniola)
  [
    [-85, 22],
    [-75, 20],
    [-74, 21],
    [-84, 23],
    [-85, 22],
  ],
  [
    [-74, 19],
    [-68, 18],
    [-69, 20],
    [-74, 20],
    [-74, 19],
  ],
  // Greenland
  [
    [-52, 60],
    [-42, 60],
    [-33, 68],
    [-20, 76],
    [-26, 82],
    [-52, 82],
    [-68, 76],
    [-55, 68],
    [-52, 60],
  ],
  // Iceland
  [
    [-24, 65],
    [-14, 66],
    [-14, 64],
    [-24, 64],
    [-24, 65],
  ],
  // South America
  [
    [-78, 9],
    [-72, 12],
    [-62, 10],
    [-52, 4],
    [-48, 0],
    [-35, -6],
    [-38, -13],
    [-40, -21],
    [-48, -28],
    [-53, -34],
    [-58, -38],
    [-65, -42],
    [-67, -50],
    [-69, -55],
    [-74, -53],
    [-75, -44],
    [-72, -35],
    [-71, -20],
    [-77, -12],
    [-81, -5],
    [-79, 2],
    [-78, 9],
  ],
  // Europe (mainland including Iberian peninsula, Italy, Balkans, Scandinavia)
  [
    [-9, 37],
    [-9, 43],
    [-2, 43],
    [-5, 48],
    [2, 51],
    [8, 54],
    [10, 58],
    [5, 61],
    [15, 69],
    [28, 71],
    [40, 67],
    [48, 66],
    [52, 55],
    [40, 47],
    [30, 46],
    [28, 41],
    [23, 38],
    [19, 40],
    [16, 38],
    [12, 42],
    [9, 44],
    [3, 43],
    [0, 39],
    [-5, 36],
    [-9, 37],
  ],
  // Great Britain & Ireland
  [
    [-6, 50],
    [-5, 58],
    [-2, 58],
    [1, 52],
    [-6, 50],
  ],
  [
    [-10, 52],
    [-6, 55],
    [-6, 52],
    [-10, 52],
  ],
  // Africa
  [
    [-6, 36],
    [10, 37],
    [15, 32],
    [32, 31],
    [35, 24],
    [43, 12],
    [51, 12],
    [45, 2],
    [40, -10],
    [35, -24],
    [28, -33],
    [18, -35],
    [14, -22],
    [12, -12],
    [9, 4],
    [2, 6],
    [-8, 5],
    [-17, 15],
    [-16, 23],
    [-10, 31],
    [-6, 36],
  ],
  // Madagascar
  [
    [49, -12],
    [50, -25],
    [44, -25],
    [45, -16],
    [49, -12],
  ],
  // Asia & Middle East
  [
    [28, 41],
    [36, 37],
    [35, 31],
    [43, 13],
    [59, 22],
    [56, 26],
    [50, 30],
    [62, 25],
    [70, 21],
    [77, 8],
    [81, 15],
    [89, 22],
    [97, 16],
    [103, 2],
    [105, 10],
    [109, 20],
    [120, 24],
    [122, 32],
    [120, 40],
    [129, 35],
    [131, 42],
    [141, 52],
    [160, 60],
    [175, 66],
    [140, 72],
    [105, 76],
    [75, 72],
    [55, 68],
    [48, 66],
    [52, 55],
    [40, 47],
    [28, 41],
  ],
  // Japan
  [
    [130, 32],
    [136, 35],
    [141, 40],
    [145, 44],
    [140, 42],
    [133, 35],
    [130, 32],
  ],
  // Indonesia / SE Asia islands
  [
    [96, 5],
    [105, -6],
    [114, -8],
    [106, 0],
    [96, 5],
  ],
  [
    [109, 2],
    [118, 5],
    [117, -3],
    [110, -2],
    [109, 2],
  ],
  // Australia
  [
    [114, -22],
    [122, -17],
    [131, -12],
    [136, -12],
    [142, -11],
    [150, -22],
    [153, -28],
    [150, -37],
    [141, -38],
    [135, -34],
    [128, -32],
    [115, -34],
    [113, -26],
    [114, -22],
  ],
  // New Zealand
  [
    [173, -35],
    [178, -38],
    [168, -46],
    [167, -45],
    [173, -35],
  ],
];

const UNIFOR_ORIGIN = {
  name: "Universidade de Fortaleza (Unifor)",
  city: "Fortaleza",
  country: "Brasil",
  lat: -3.7689,
  lng: -38.4783,
};

function projectFlat(lat: number, lng: number) {
  return {
    x: ((lng + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  };
}

function getArcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const my = Math.min(y1, y2) - Math.min(72, dist * 0.22);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

// Per-pin label offsets to avoid overlapping labels around the Iberian peninsula
const PIN_LABEL_OFFSETS: Record<
  string,
  { dx: number; dy: number; anchor: "start" | "end" | "middle" }
> = {
  uporto: { dx: -8, dy: 2, anchor: "end" },
  santander: { dx: 0, dy: 14, anchor: "middle" },
  valencia: { dx: 8, dy: 6, anchor: "start" },
  lyon1: { dx: 8, dy: -2, anchor: "start" },
  fuberlin: { dx: 8, dy: -3, anchor: "start" },
  ucf: { dx: -8, dy: -3, anchor: "end" },
};

type RegionPreset = "mundo" | "americas" | "europa";

interface ViewRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const PRESET_VIEWS: Record<RegionPreset, ViewRect> = {
  mundo: { x: 25, y: 18, w: 950, h: 430 },
  americas: { x: 170, y: 78, w: 340, h: 245 },
  europa: { x: 435, y: 65, w: 145, h: 105 },
};

export function WorldMap({
  institutions,
  openInstitutionIds = [],
  onOpenGuide,
}: {
  institutions: PartnerInstitution[];
  openInstitutionIds?: string[];
  onOpenGuide: (inst: PartnerInstitution) => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedId, setSelectedId] = useState<string>(institutions[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [region, setRegion] = useState<RegionPreset>("mundo");
  const [view, setView] = useState<ViewRect>(PRESET_VIEWS.mundo);
  const dragRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startY: number;
    startView: ViewRect;
  }>({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    startView: PRESET_VIEWS.mundo,
  });

  const openSet = new Set(openInstitutionIds);
  const selected = institutions.find((i) => i.id === selectedId) ?? institutions[0];
  const hovered = hoveredId ? institutions.find((i) => i.id === hoveredId) : undefined;
  const hoveredPoint = hovered ? projectFlat(hovered.lat, hovered.lng) : null;
  const originPoint = projectFlat(UNIFOR_ORIGIN.lat, UNIFOR_ORIGIN.lng);

  useEffect(() => {
    if (institutions.length && !institutions.some((i) => i.id === selectedId)) {
      const first = institutions[0];
      if (first) setSelectedId(first.id);
    }
  }, [institutions, selectedId]);

  function applyPreset(next: RegionPreset) {
    setRegion(next);
    setView(PRESET_VIEWS[next]);
  }

  function zoomBy(factor: number) {
    setView((prev) => {
      const nextW = Math.min(960, Math.max(95, prev.w * factor));
      const nextH = Math.min(440, Math.max(68, prev.h * factor));
      const cx = prev.x + prev.w / 2;
      const cy = prev.y + prev.h / 2;
      return {
        x: Math.min(980 - nextW, Math.max(0, cx - nextW / 2)),
        y: Math.min(470 - nextH, Math.max(0, cy - nextH / 2)),
        w: nextW,
        h: nextH,
      };
    });
  }

  function focusInstitution(inst: PartnerInstitution) {
    setSelectedId(inst.id);
    if (inst.country === "EUA") {
      applyPreset("americas");
    } else if (
      inst.country === "Portugal" ||
      inst.country === "Espanha" ||
      inst.country === "França" ||
      inst.country === "Alemanha"
    ) {
      if (region === "americas") applyPreset("europa");
    }
  }

  function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
    if ((e.target as HTMLElement).closest("[data-map-pin]")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      startView: view,
    };
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragRef.current.active || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    const scaleX = dragRef.current.startView.w / Math.max(rect.width, 1);
    const scaleY = dragRef.current.startView.h / Math.max(rect.height, 1);
    setView({
      ...dragRef.current.startView,
      x: Math.min(
        980 - dragRef.current.startView.w,
        Math.max(0, dragRef.current.startView.x - dx * scaleX),
      ),
      y: Math.min(
        470 - dragRef.current.startView.h,
        Math.max(0, dragRef.current.startView.y - dy * scaleY),
      ),
    });
  }

  function handlePointerUp() {
    dragRef.current.active = false;
  }

  const labelScale = Math.max(0.28, Math.min(1, view.w / 950));

  return (
    <div className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">MAPA-MUNDI · INSTITUIÇÕES CONVENIADAS</p>
          <h3>Explore as localizações no Mapa-Mundi</h3>
        </div>
        <div className="world-map-toolbar">
          <div className="world-map-regions" role="group" aria-label="Recortes do mapa">
            <Button
              type="button"
              size="sm"
              variant={region === "mundo" ? "default" : "secondary"}
              onClick={() => applyPreset("mundo")}
            >
              Mundo
            </Button>
            <Button
              type="button"
              size="sm"
              variant={region === "americas" ? "default" : "secondary"}
              onClick={() => applyPreset("americas")}
            >
              Américas
            </Button>
            <Button
              type="button"
              size="sm"
              variant={region === "europa" ? "default" : "secondary"}
              onClick={() => applyPreset("europa")}
            >
              Europa
            </Button>
          </div>
          <div className="globe-controls">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-label="Aproximar mapa"
              onClick={() => zoomBy(0.75)}
            >
              <ZoomIn size={14} />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-label="Afastar mapa"
              onClick={() => zoomBy(1.33)}
            >
              <ZoomOut size={14} />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              aria-label="Centralizar Mapa-Mundi"
              onClick={() => applyPreset("mundo")}
            >
              <RotateCcw size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="globe-layout">
        <div>
          <div className="world-map-wrapper">
            <svg
              ref={svgRef}
              className="world-map-svg"
              viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
              role="img"
              aria-label="Mapa-Mundi interativo com pontos azuis das instituições conveniadas"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <defs>
                <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="55%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#cfe3fc" />
                </linearGradient>
              </defs>

              <rect x="0" y="0" width="1000" height="500" fill="url(#oceanGrad)" />

              {/* Latitude & Longitude Graticule */}
              {[-60, -30, 0, 30, 60].map((lat) => {
                const y = ((90 - lat) / 180) * 500;
                return (
                  <line
                    key={`lat-${lat}`}
                    x1="0"
                    y1={y}
                    x2="1000"
                    y2={y}
                    stroke={lat === 0 ? "rgba(30, 64, 175, 0.2)" : "rgba(30, 64, 175, 0.09)"}
                    strokeWidth={0.8 * labelScale}
                    strokeDasharray={lat === 0 ? "4 4" : undefined}
                  />
                );
              })}
              {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lng) => {
                const x = ((lng + 180) / 360) * 1000;
                return (
                  <line
                    key={`lng-${lng}`}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="500"
                    stroke="rgba(30, 64, 175, 0.08)"
                    strokeWidth={0.8 * labelScale}
                  />
                );
              })}

              {/* World Continents */}
              {LANDMASSES.map((poly, idx) => (
                <polygon
                  key={`land-${idx}`}
                  points={poly
                    .map(([lng, lat]) => {
                      const p = projectFlat(lat, lng);
                      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
                    })
                    .join(" ")}
                  fill="#f8fafc"
                  stroke="#94a3b8"
                  strokeWidth={0.9 * labelScale}
                  strokeLinejoin="round"
                />
              ))}

              {/* Flight/Partnership Arcs from Unifor Fortaleza */}
              {institutions.map((inst) => {
                const p = projectFlat(inst.lat, inst.lng);
                const isSelected = selected?.id === inst.id;
                return (
                  <path
                    key={`arc-${inst.id}`}
                    d={getArcPath(originPoint.x, originPoint.y, p.x, p.y)}
                    fill="none"
                    stroke={isSelected ? "#2563eb" : "rgba(37, 99, 235, 0.28)"}
                    strokeWidth={(isSelected ? 1.8 : 1) * labelScale}
                    strokeDasharray={`${4 * labelScale} ${4 * labelScale}`}
                  />
                );
              })}

              {/* Unifor Fortaleza Origin Dot */}
              <g>
                <circle
                  cx={originPoint.x}
                  cy={originPoint.y}
                  r={5 * labelScale}
                  fill="#0f172a"
                  stroke="#ffffff"
                  strokeWidth={1.6 * labelScale}
                />
                <text
                  x={originPoint.x + 8 * labelScale}
                  y={originPoint.y + 3 * labelScale}
                  fontSize={10 * labelScale}
                  fontWeight="700"
                  fill="#0f172a"
                  fontFamily="Arial, Helvetica, sans-serif"
                >
                  Unifor · Fortaleza
                </text>
              </g>

              {/* Blue Dots for Partner Institutions */}
              {institutions.map((inst) => {
                const p = projectFlat(inst.lat, inst.lng);
                const isSelected = selected?.id === inst.id;
                const hasOpenCall = openSet.has(inst.id);
                const offset = PIN_LABEL_OFFSETS[inst.id] ?? {
                  dx: 8,
                  dy: 3,
                  anchor: "start" as const,
                };
                return (
                  <g
                    key={inst.id}
                    data-map-pin={inst.id}
                    data-open-call={hasOpenCall ? "true" : "false"}
                    role="button"
                    tabIndex={0}
                    aria-label={`${inst.name} (${inst.city}, ${inst.country})${hasOpenCall ? " · Inscrições abertas" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedId(inst.id)}
                    onMouseEnter={() => setHoveredId(inst.id)}
                    onMouseLeave={() => setHoveredId((prev) => (prev === inst.id ? null : prev))}
                    onFocus={() => setHoveredId(inst.id)}
                    onBlur={() => setHoveredId((prev) => (prev === inst.id ? null : prev))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedId(inst.id);
                      }
                    }}
                  >
                    <title>{inst.name}</title>
                    <circle
                      className="map-pin-halo"
                      cx={p.x}
                      cy={p.y}
                      r={(isSelected ? 13 : hasOpenCall ? 11 : 9.5) * labelScale}
                      fill={
                        isSelected
                          ? "rgba(37, 99, 235, 0.3)"
                          : hasOpenCall
                            ? "rgba(37, 99, 235, 0.28)"
                            : "rgba(37, 99, 235, 0.14)"
                      }
                    />
                    <circle
                      className="map-pin-core"
                      cx={p.x}
                      cy={p.y}
                      r={(isSelected ? 6.5 : 5) * labelScale}
                      fill={isSelected ? "#1d4ed8" : "#2563eb"}
                      stroke="#ffffff"
                      strokeWidth={1.8 * labelScale}
                    />
                    <text
                      x={p.x + offset.dx * labelScale}
                      y={p.y + offset.dy * labelScale}
                      textAnchor={offset.anchor}
                      fontSize={(isSelected ? 10.5 : 9.2) * labelScale}
                      fontWeight={isSelected ? "700" : "600"}
                      fill="#1e3a8a"
                      fontFamily="Arial, Helvetica, sans-serif"
                    >
                      {inst.city}
                    </text>
                  </g>
                );
              })}
            </svg>
            {hovered && hoveredPoint && (
              <div
                className="map-pin-tooltip"
                role="tooltip"
                style={{
                  left: `${((hoveredPoint.x - view.x) / view.w) * 100}%`,
                  top: `${((hoveredPoint.y - view.y) / view.h) * 100}%`,
                }}
              >
                <strong>{hovered.name}</strong>
                {openSet.has(hovered.id) && <span>Inscrições abertas</span>}
              </div>
            )}
          </div>
          <div className="globe-legend">
            <span>
              <i className="globe-dot blue" aria-hidden="true" /> Instituição conveniada
            </span>
            <span>
              <i className="globe-dot blue pulsing" aria-hidden="true" /> Edital com inscrições
              abertas
            </span>
            <span>
              <i className="globe-dot origin" aria-hidden="true" /> Unifor · Fortaleza (Origem)
            </span>
            <span>
              <Compass size={13} /> Clique em um ponto azul ou use Américas/Europa para aproximar
            </span>
          </div>
        </div>

        {selected && (
          <aside className="globe-card" aria-live="polite">
            <p className="eyebrow">INSTITUIÇÃO SELECIONADA NO MAPA</p>
            <h3>{selected.name}</h3>
            <p className="globe-coords">
              {selected.city}, {selected.country} · ({selected.lat.toFixed(2)}°,{" "}
              {selected.lng.toFixed(2)}°)
            </p>
            <p>{selected.summary}</p>
            <div className="institution-meta">
              <div>
                <strong>Convênio</strong>
                <span>{selected.agreementType}</span>
              </div>
              <div>
                <strong>Idiomas</strong>
                <span>{selected.languages}</span>
              </div>
              <div>
                <strong>Áreas</strong>
                <span>{selected.areas}</span>
              </div>
            </div>
            <div className="actions">
              <Button type="button" onClick={() => onOpenGuide(selected)}>
                Ver guia da instituição
              </Button>
              {selected.opportunityId && (
                <Go opportunityId={selected.opportunityId} secondary>
                  Ver edital vinculado
                </Go>
              )}
            </div>
          </aside>
        )}
      </div>

      <div className="map-destinations" aria-label="Selecionar instituição no Mapa-Mundi">
        {institutions.map((inst) => (
          <Button
            key={inst.id}
            type="button"
            variant={selected?.id === inst.id ? "default" : "secondary"}
            onClick={() => focusInstitution(inst)}
          >
            <MapPin size={14} />
            {inst.name} ({inst.country})
          </Button>
        ))}
      </div>
      <p className="fine-print">
        Localizações geográficas das instituições parceiras representadas pelos pontos azuis no
        Mapa-Mundi. Confirme convênios ativos e vagas vigentes com a DRI.
      </p>
    </div>
  );
}
