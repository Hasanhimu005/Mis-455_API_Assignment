function search() {
    var search = document.getElementById("country").value.trim();
    if (!search) {
        alert("Please enter a country name!");
        return;
    }

    var url = `https://restcountries.com/v3.1/name/${search}`;

    document.getElementById("displayArea").innerHTML = `<p>Loading country data...</p>`;
    document.getElementById("displayArea1").innerHTML = "";

    fetch(url)
        .then(res => res.json())
        .then(data => process(data))
        .catch(error => {
            document.getElementById("displayArea").innerHTML = `<p class="text-danger">Country not found. Please try again!</p>`;
        });
}

function process(data) {
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = "";

    data.forEach(country => {
        var countryCard = document.createElement("div");
        countryCard.className = "country-card";

        countryCard.innerHTML = `
            <h3>${country.name.common}</h3>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <button class="btn btn-primary btn-more-details" onclick="forecast('${country.name.common}')">More Details</button>
        `;

        oldContent.appendChild(countryCard);
    });
}

function forecast(countryName) {
    var key = "1544085b4f6144eebb085843240312"; // Your WeatherAPI key

    var url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${countryName}&days=1&aqi=no&alerts=no`;

    document.getElementById("displayArea1").innerHTML = `<p>Loading weather data...</p>`;

    fetch(url)
        .then(res => res.json())
        .then(data => process_forecast(data))
        .catch(error => {
            document.getElementById("displayArea1").innerHTML = `<p class="text-danger">Weather data not available. Try again later!</p>`;
        });
}

function process_forecast(data) {
    var oldContent = document.getElementById("displayArea1");
    oldContent.textContent = "";

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h2>Weather in ${data.location.name}</h2>
        <p><strong>Date:</strong> ${data.forecast.forecastday[0].date}</p>
        <p><strong>Max Temp:</strong> ${data.forecast.forecastday[0].day.maxtemp_c} °C</p>
        <p><strong>Min Temp:</strong> ${data.forecast.forecastday[0].day.mintemp_c} °C</p>
        <p><strong>Condition:</strong> ${data.forecast.forecastday[0].day.condition.text}</p>
        <img src="https:${data.forecast.forecastday[0].day.condition.icon}" alt="Weather Icon">
    `;

    oldContent.appendChild(newDiv);
}
