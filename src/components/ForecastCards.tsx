import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import type { ForecastDay } from "@/lib/weather-api";

interface Props {
  days: ForecastDay[];
  unit: "C" | "F";
}

export default function ForecastCards({ days, unit }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h3 className="text-lg font-semibold text-foreground mb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {days.map((day, i) => {
          const high = unit === "C" ? day.day.maxtemp_c : day.day.maxtemp_f;
          const low = unit === "C" ? day.day.mintemp_c : day.day.mintemp_f;
          const date = new Date(day.date);
          const dayName = i === 0 ? "Today" : date.toLocaleDateString("en-US", { weekday: "short" });

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="glass-card-light p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="text-xs font-medium text-muted-foreground">{dayName}</span>
              <img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-10 h-10"
              />
              <div className="text-center">
                <span className="text-sm font-bold text-foreground">{Math.round(high)}°</span>
                <span className="text-xs text-muted-foreground ml-1">{Math.round(low)}°</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-accent">
                <Droplets className="h-3 w-3" />
                {day.day.daily_chance_of_rain}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
