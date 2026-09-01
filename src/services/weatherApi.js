const GEOCODING_URL =
  "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast";

// Busca una ciudad y obtiene sus coordenadas.
export async function getCoordinates(city) {
  // Construimos la URL utilizando el nombre de la ciudad.
  const response = await fetch(
    `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=es&format=json`
  );

  // Comprobamos si la respuesta fue exitosa.
  if (!response.ok) {
    throw new Error("No se pudo buscar la ciudad.");
  }

  // Convertimos la respuesta JSON en un objeto JavaScript.
  const data = await response.json();

  // Comprobamos si encontramos resultados.
  if (!data.results || data.results.length === 0) {
    throw new Error("Ciudad no encontrada.");
  }

  // Devolvemos el primer resultado encontrado.
  return data.results[0];
}


//========================================================================================================================================================


// Obtiene el clima utilizando latitud y longitud.
export async function getWeather(latitude, longitude) {
  // Construimos la URL utilizando las coordenadas recibidas.
  const response = await fetch(
    `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
  );

  // Comprobamos si la respuesta fue exitosa.
  if (!response.ok) {
    throw new Error("Error al obtener el clima.");
  }

  // Convertimos la respuesta JSON en un objeto JavaScript.
  const data = await response.json();

  // Devolvemos los datos del clima.
  return data;
}