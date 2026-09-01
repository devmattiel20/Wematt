import "./WeatherCard.css";

// Convierte el código meteorológico de Open-Meteo
// en información que podamos mostrar en la interfaz.
function getWeatherInfo(code) {
  if (code === 0) {
    return {
      icon: "☀️",
      description: "Clear sky",
    };
  }

  if (code >= 1 && code <= 3) {
    return {
      icon: "🌤️",
      description: "Cloudy",
    };
  }

  if (code >= 45 && code <= 48) {
    return {
      icon: "🌫️",
      description: "Fog",
    };
  }

  if (code >= 51 && code <= 57) {
    return {
      icon: "🌧️",
      description: "Drizzle",
    };
  }

  if (code >= 61 && code <= 67) {
    return {
      icon: "🌧️",
      description: "Rain",
    };
  }

  if (code >= 71 && code <= 77) {
    return {
      icon: "❄️",
      description: "Snow",
    };
  }

  if (code >= 80 && code <= 82) {
    return {
      icon: "🌦️",
      description: "Rain showers",
    };
  }

  if (code >= 95 && code <= 99) {
    return {
      icon: "⛈️",
      description: "Thunderstorm",
    };
  }

  // Información por defecto si recibimos
  // un código que no contemplamos.
  return {
    icon: "🌡️",
    description: "Unknown",
  };
}

function WeatherCard({ weather }) {
  // Separamos la información de ubicación
  // de la información meteorológica.
  const { location, weather: weatherData } = weather;

  // Obtenemos los datos actuales del clima.
  const current = weatherData.current;

  // Obtenemos el código meteorológico.
  const weatherInfo = getWeatherInfo(current.weather_code);

  return (
    <div className="weather-card">

      {/* Nombre de la ciudad */}
      <h2>{location.name}</h2>

      {/* País */}
      <p className="country">
        {location.country}
      </p>

      {/* Icono del estado del clima */}
      <div className="weather-icon">
        {weatherInfo.icon}
      </div>

      {/* Descripción del clima */}
      <p className="weather-description">
        {weatherInfo.description}
      </p>

      {/* Temperatura actual */}
      <p className="temperature">
        {current.temperature_2m}°C
      </p>

      {/* Información adicional */}
      <div className="weather-details">

        <p>
          💧 Humidity: {current.relative_humidity_2m}%
        </p>

        <p>
          💨 Wind: {current.wind_speed_10m} km/h
        </p>

      </div>
    </div>
  );
}

export default WeatherCard;