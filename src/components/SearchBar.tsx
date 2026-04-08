import { useState } from "react";
import { Search, MapPin, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onUseLocation: () => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, onUseLocation, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto"
    >
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search any city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-muted/40 border border-glass-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md transition-all"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Search
        </button>
        <button
          type="button"
          onClick={onUseLocation}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-3.5 rounded-xl border border-glass-border bg-muted/30 text-foreground hover:bg-muted/50 backdrop-blur-md transition-all disabled:opacity-40"
        >
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>
    </motion.form>
  );
}
