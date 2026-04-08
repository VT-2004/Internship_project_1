import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

export default function WeatherLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center gap-4 py-20"
    >
      <Cloud className="h-12 w-12 text-primary animate-bounce" />
      <p className="text-muted-foreground text-sm animate-pulse">Fetching weather data...</p>
    </motion.div>
  );
}
