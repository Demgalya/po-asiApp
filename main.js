const apiKey = "24a13476a7cbbadc5cfa24f5308d13c7"; 
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const themeToggle = document.getElementById("theme-toggle");
const weatherDiv = document.getElementById('weather');
// Tema
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});


document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
});

// Find
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return alert("Napište prosim město");

  const weather = await fetchWeather(city);
  if (weather) {
    displayWeather(weather);
  }
});

// Rezultat
async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric&lang=cz`
    );
    if (!res.ok) throw new Error("Nemužu najit město");
    return await res.json();
  } catch (err) {
    alert(err.message);
    return null;
  }
}

// Počasi dnes
function displayWeather(data) {
  const { name, main, weather, wind } = data;
  weatherDiv.innerHTML = `
    <h2>${name}</h2>
    <p>${weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />
    <p>🌡 Temperatura: ${main.temp}°C</p>
    <p>💧 Vlhkost: ${main.humidity}%</p>
    <p>🌬 Vitr: ${wind.speed} m/s</p>
    <p>📈 Tiskoviny: ${main.pressure} gPa</p>
  `;
}
