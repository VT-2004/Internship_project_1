import { motion } from "framer-motion";
import { Droplets, Wind, Thermometer, Clock, Sunrise, Sunset } from "lucide-react";
import type { WeatherData } from "@/lib/weather-api";

interface Props {
  data: WeatherData;
  unit: "C" | "F";
}

export default function CurrentWeather({ data, unit }: Props) {
  const { location, current, forecast } = data;
  const temp = unit === "C" ? current.temp_c : current.temp_f;
  const feelsLike = unit === "C" ? current.feelslike_c : current.feelslike_f;
  const astro = forecast.forecastday[0]?.astro;

  const localDate = new Date(location.localtime);
  const dateStr = localDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6 sm:p-8 w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text">
            {location.name}
          </h2>
          <p className="text-muted-foreground text-sm">{location.country}</p>
          <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1 justify-center sm:justify-start">
            <Clock className="h-3 w-3" /> {dateStr} · {timeStr}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src={`https:${current.condition.icon}`}
            alt={current.condition.text}
            className="w-20 h-20 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Main temp */}
      <div className="text-center mb-6">
        <p className="text-7xl sm:text-8xl font-extrabold tracking-tight text-foreground">
          {Math.round(temp)}°<span className="text-3xl text-muted-foreground">{unit}</span>
        </p>
        <p className="text-lg text-muted-foreground capitalize mt-1">{current.condition.text}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatItem icon={<Thermometer className="h-4 w-4 text-secondary" />} label="Feels Like" value={`${Math.round(feelsLike)}°${unit}`} />
        <StatItem icon={<Droplets className="h-4 w-4 text-accent" />} label="Humidity" value={`${current.humidity}%`} />
        <StatItem icon={<Wind className="h-4 w-4 text-primary" />} label="Wind" value={`${current.wind_kph} km/h`} />
        {astro && (
          <>
            <StatItem icon={<Sunrise className="h-4 w-4 text-secondary" />} label="Sunrise" value={astro.sunrise} className="hidden sm:flex" />
          </>
        )}
      </div>

      {astro && (
        <div className="grid grid-cols-2 gap-3 mt-3 sm:hidden">
          <StatItem icon={<Sunrise className="h-4 w-4 text-secondary" />} label="Sunrise" value={astro.sunrise} />
          <StatItem icon={<Sunset className="h-4 w-4 text-accent" />} label="Sunset" value={astro.sunset} />
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center mt-4">
        Last updated: {current.last_updated}
      </p>
    </motion.div>
  );
}

function StatItem({ icon, label, value, className = "" }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={`glass-card-light p-3 flex flex-col items-center gap-1 ${className}`}>
      {icon}
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  );
}
