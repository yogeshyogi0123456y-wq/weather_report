# SkyCast - Premium React Weather Application

A modern, responsive weather dashboard built with React, TypeScript, and OpenWeatherMap API.

## Features
- 🔍 Search weather by city name
- 📍 Automatic geolocation support
- 🌡️ Current weather details (Temp, Humidity, Wind, Feels Like)
- 📅 5-Day weather forecast
- 📜 Recent search history (Syncs with LocalStorage)
- ✨ Premium UI with Glassmorphism and animations
- 📱 Fully responsive design

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd weather_report
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
1. Create a `.env` file in the root directory (or rename `.env.example`).
2. Add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
   *You can get a free API key at [openweathermap.org](https://openweathermap.org/api).*

### Running the Project
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Tech Stack
- **Framework**: React 18
- **Tooling**: Vite
- **Language**: TypeScript
- **Styling**: CSS3 (Custom Glassmorphism)
- **API Communication**: Axios
- **API Provider**: OpenWeatherMap
