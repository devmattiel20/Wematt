import { useState } from "react";
import { getCoordinates, getWeather } from "./services/weatherApi";
import WeatherCard from "./Componentes/WeatherCard/WeatherCard";
import Header from "./Componentes/Header";
import Footer from "./Componentes/Footer";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(event) {
    event.preventDefault();

    if (!city.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const location = await getCoordinates(city);
      const weatherData = await getWeather(
        location.latitude,
        location.longitude,
      );

      setWeather({
        location,
        weather: weatherData,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="app">
        <h1>Weather Finder ⛅</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Busca el clima de cualquier ciudad..."
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {loading && <p>Cargando clima...</p>}
        {error && <p>❌ {error}</p>}
        {!loading && !error && weather && <WeatherCard weather={weather} />}
      </main>
      <Footer />
    </>
  );
}

export default App;
