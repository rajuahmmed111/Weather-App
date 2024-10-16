const apiKey = "22749fc008914545a82143946241610";
const weatherInfo = document.getElementById("weather-info");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

// Fetch weather data using the API
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    displayError(error.message);
  }
}

// weather data on the webpage
function displayWeather(data) {
  const weatherHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
    <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
  `;

  weatherInfo.innerHTML = weatherHTML;
}

// error messages
function displayError(message) {
  weatherInfo.innerHTML = `<p class="error">${message}</p>`;
}

// Search button click
searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    displayError("Please enter a city name");
  }
});
