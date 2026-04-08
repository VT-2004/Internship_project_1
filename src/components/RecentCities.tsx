import { motion } from "framer-motion";
import { History, X } from "lucide-react";

interface Props {
  cities: string[];
  onSelect: (city: string) => void;
  onClear: () => void;
}

export default function RecentCities({ cities, onSelect, onClear }: Props) {
  if (cities.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap items-center gap-2 max-w-xl mx-auto justify-center"
    >
      <History className="h-3.5 w-3.5 text-muted-foreground" />
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onSelect(city)}
          className="text-xs px-3 py-1.5 rounded-full border border-glass-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground backdrop-blur-sm transition-all"
        >
          {city}
        </button>
      ))}
      <button onClick={onClear} className="text-muted-foreground hover:text-destructive transition-colors">
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
