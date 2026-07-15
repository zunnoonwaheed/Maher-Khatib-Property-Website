import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 700;
const MAP_SCALE = 1500;

const TARGETS = [
  { name: "Springfield, MA", coords: [-72.5898, 42.1015] as [number, number] },
  { name: "Granby, MA", coords: [-72.514, 42.2595] as [number, number] },
  { name: "Maine", coords: [-69.5, 44.5] as [number, number] },
];

const SUPPORTED_LABEL_STATES = new Set([
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming",
]);

export function ServiceAreas() {
  return (
    <section id="areas" className="relative overflow-hidden bg-black">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 lg:pt-32 lg:px-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              Where I Work
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            Serving <span className="italic">the Northeast.</span>
          </h2>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1600px] px-6 lg:px-12">
        <ComposableMap
          projection="geoAlbersUsa"
          projectionConfig={{ scale: MAP_SCALE }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          style={{ width: "100%", height: "auto" }}
        >
          <defs>
            <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor="#ffffff" floodOpacity="0.7" result="flood" />
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <Geographies geography="/us-states.json">
            {({ geographies }) => (
              <>
                {/* Base muted map */}
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#262626"
                    stroke="#111111"
                    strokeWidth={0.7}
                    fillOpacity={1}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#333333" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))}

                {/* State labels */}
                {geographies.map((geo) => {
                  const name: string = geo.properties.name;
                  if (!SUPPORTED_LABEL_STATES.has(name)) return null;
                  const centroid = geoCentroid(geo);
                  return (
                    <Marker key={`label-${geo.rsmKey}`} coordinates={centroid}>
                      <text
                        textAnchor="middle"
                        y={1}
                        style={{
                          fontFamily: "system-ui, sans-serif",
                          fontSize: 6,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          fill: "#b3b3b3",
                          fillOpacity: 1,
                          pointerEvents: "none",
                          textTransform: "uppercase",
                          paintOrder: "stroke",
                        }}
                      >
                        {name}
                      </text>
                    </Marker>
                  );
                })}
              </>
            )}
          </Geographies>

          {/* Target markers */}
          {TARGETS.map((loc) => (
            <Marker key={loc.name} coordinates={loc.coords}>
              <circle r={6} fill="none" stroke="#ffffff" strokeWidth={1.4}>
                <animate
                  attributeName="r"
                  values="4;22;4"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.9;0;0.9"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                r={4.5}
                fill="#ffffff"
                stroke="#0a0a0a"
                strokeWidth={1.2}
                filter="url(#marker-glow)"
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

    </section>
  );
}
