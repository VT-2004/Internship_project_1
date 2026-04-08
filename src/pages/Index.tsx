import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastCards from "@/components/ForecastCards";
import RecentCities from "@/components/RecentCities";
import WeatherLoader from "@/components/WeatherLoader";
import ErrorCard from "@/components/ErrorCard";
import { fetchWeather, getWeatherBgClass, type WeatherData } from "@/lib/weather-api";
import { Thermometer } from "lucide-react";

const RECENT_KEY = "weather_recent_cities";

function getRecentCities(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentCity(city: string) {
  const recent = getRecentCities().filter((c) => c.toLowerCase() !== city.toLowerCase());
  recent.unshift(city);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
}

export default function Index() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [recentCities, setRecentCities] = useState<string[]>(getRecentCities);
  const [bgClass, setBgClass] = useState("animated-bg");

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setBgClass(getWeatherBgClass(data.current.condition.text));
      saveRecentCity(data.location.name);
      setRecentCities(getRecentCities());
      localStorage.setItem("weather_last_city", data.location.name);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => search(`${pos.coords.latitude},${pos.coords.longitude}`),
      (err) => {
        setLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setError("Location access denied. Please allow location permission or search manually.");
        } else {
          setError("Unable to get your location. Please search manually.");
        }
      }
    );
  }, [search]);

  // Load last searched city on mount
  useEffect(() => {
    const lastCity = localStorage.getItem("weather_last_city");
    if (lastCity) search(lastCity);
  }, [search]);

  return (
    <div className={`min-h-screen ${bgClass} relative overflow-hidden transition-all duration-1000`}>
      {/* Decorative orbs */}
      <div className="glow-orb w-96 h-96 bg-primary -top-48 -left-48" />
      <div className="glow-orb w-80 h-80 bg-secondary top-1/3 -right-40" style={{ animationDelay: "3s" }} />
      <div className="glow-orb w-64 h-64 bg-accent bottom-20 left-1/4" style={{ animationDelay: "6s" }} />

      <div className="relative z-10 px-4 py-8 sm:py-12 max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <header className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text inline-block">
            Weather App
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time weather at your fingertips
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={search} onUseLocation={handleLocation} isLoading={loading} />

        {/* Recent cities */}
        <RecentCities
          cities={recentCities}
          onSelect={search}
          onClear={() => {
            localStorage.removeItem(RECENT_KEY);
            setRecentCities([]);
          }}
        />

        {/* Unit toggle */}
        {weather && (
          <div className="flex justify-center">
            <button
              onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
              className="flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-glass-border bg-muted/20 text-muted-foreground hover:bg-muted/40 backdrop-blur-sm transition-all"
            >
              <Thermometer className="h-3.5 w-3.5" />
              Switch to °{unit === "C" ? "F" : "C"}
            </button>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {loading && <WeatherLoader key="loader" />}
          {error && !loading && <ErrorCard key="error" message={error} />}
          {weather && !loading && !error && (
            <div key="weather" className="flex flex-col gap-6">
              <CurrentWeather data={weather} unit={unit} />
              <ForecastCards days={weather.forecast.forecastday} unit={unit} />
            </div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!weather && !loading && !error && (
          <p className="text-center text-muted-foreground text-sm py-16">
            Search for a city or use your location to get started.
          </p>
        )}
      </div>
    </div>
  );
}
