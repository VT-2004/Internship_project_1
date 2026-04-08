const API_KEY = "aef59c7c55464be285570525260804";
const BASE_URL = "https://api.weatherapi.com/v1";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
    tz_id: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
    last_updated: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    daily_chance_of_rain: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export async function fetchWeather(query: string): Promise<WeatherData> {
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(query)}&days=5&aqi=no`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    if (res.status === 400) {
      throw new Error("City not found. Please check the name and try again.");
    }
    throw new Error(error.error?.message || "Failed to fetch weather data.");
  }

  return res.json();
}

export function getWeatherBgClass(condition: string): string {
  const c = condition.toLowerCase();
  if (c.includes("sun") || c.includes("clear")) return "animated-bg-sunny";
  if (c.includes("rain") || c.includes("drizzle") || c.includes("thunder")) return "animated-bg-rainy";
  if (c.includes("cloud") || c.includes("overcast") || c.includes("mist") || c.includes("fog")) return "animated-bg-cloudy";
  if (c.includes("snow") || c.includes("sleet") || c.includes("ice") || c.includes("blizzard")) return "animated-bg-snowy";
  return "animated-bg";
}
