import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import { useLanguage } from "@/contexts/LanguageContext";

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 700;
const MAP_SCALE = 1500;

const TARGETS = [
  { name: "Springfield, MA", coords: [-72.5898, 42.1015] as [number, number] },
  { name: "Granby, MA", coords: [-72.514, 42.2595] as [number, number] },
  { name: "Hartford, CT", coords: [-72.6819, 41.7658] as [number, number] },
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
  const { t } = useLanguage();
  return (
    <section id="areas" className="relative overflow-hidden bg-black py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold/70" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-gold">
              {t('serviceAreas.eyebrow')}
            </span>
            <span className="h-px w-10 bg-gold/70" />
          </div>
          <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
            {t('serviceAreas.title')}
          </h2>
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-serif text-2xl text-white">{t('serviceAreas.massachusetts')}</h3>
                <p className="mt-4 text-white/60">{t('serviceAreas.massachusettsCounties')}</p>
                <p className="mt-3 text-sm text-white/50">{t('serviceAreas.massachusettsTowns')}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white">{t('serviceAreas.connecticut')}</h3>
                <p className="mt-4 text-white/60">{t('serviceAreas.connecticutCounties')}</p>
                <p className="mt-3 text-sm text-white/50">{t('serviceAreas.connecticutTowns')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
