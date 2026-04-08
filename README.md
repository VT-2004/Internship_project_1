
# Aura Weather

A modern, beautiful weather application built with React, TypeScript, and Tailwind CSS. Get real-time weather information with an elegant glass-morphism UI and smooth animations.

## 🌟 Features

- **Real-time Weather Data**: Current weather conditions with temperature, humidity, wind speed, and more
- **5-Day Forecast**: Detailed weather predictions for the next 5 days
- **Location-based Search**: Automatic location detection or manual city search
- **Recent Cities**: Quick access to previously searched locations
- **Unit Conversion**: Toggle between Celsius and Fahrenheit
- **Responsive Design**: Optimized for desktop and mobile devices
- **Animated Backgrounds**: Dynamic backgrounds that change based on weather conditions
- **Glass Morphism UI**: Modern, translucent design with backdrop blur effects
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Weather API**: WeatherAPI.com
- **Routing**: React Router DOM
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aura-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:8080`

## 🏗️ Build & Deployment

**Development Build**
```bash
npm run build:dev
```

**Production Build**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

## 🧪 Testing

**Run Tests**
```bash
npm run test
```

**Run Tests in Watch Mode**
```bash
npm run test:watch
```

## 📱 Usage

1. **Search by City**: Enter a city name in the search bar and press Enter or click Search
2. **Use Current Location**: Click the "My Location" button to get weather for your current position
3. **Recent Cities**: Click on previously searched cities for quick access
4. **Unit Toggle**: Switch between Celsius (°C) and Fahrenheit (°F) using the temperature toggle
5. **View Forecast**: Scroll down to see the 5-day weather forecast

## 🔧 Configuration

### Weather API

The app uses WeatherAPI.com for weather data. The API key is already configured in `src/lib/weather-api.ts`. If you need to use your own API key:

1. Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
2. Replace the `API_KEY` in `src/lib/weather-api.ts`

### Customization

- **Styling**: Modify `tailwind.config.ts` and `src/index.css` for custom themes
- **Components**: UI components are located in `src/components/ui/` (Shadcn/ui)
- **Weather Logic**: Weather API integration in `src/lib/weather-api.ts`

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn/ui components
│   ├── CurrentWeather.tsx
│   ├── ForecastCards.tsx
│   ├── SearchBar.tsx
│   ├── RecentCities.tsx
│   ├── WeatherLoader.tsx
│   └── ErrorCard.tsx
├── lib/
│   └── weather-api.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/
├── App.tsx
└── main.tsx
```

## 🎨 Design Features

- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Text**: Beautiful gradient effects on headings
- **Animated Orbs**: Decorative floating elements
- **Weather-based Backgrounds**: Dynamic backgrounds (sunny, rainy, cloudy, snowy)
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Smooth Transitions**: All interactions have smooth animations

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---
