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
    var key = "0d8f178bc3ec66ad6f5287f8e9644859"; // Your OpenWeatherMap API key

    var url = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${key}&units=metric`;

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

    if (data.cod !== 200) {
        oldContent.innerHTML = `<p class="text-danger">Weather data not found for this country!</p>`;
        return;
    }

    var newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Min Temp:</strong> ${data.main.temp_min} °C</p>
        <p><strong>Max Temp:</strong> ${data.main.temp_max} °C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    `;

    oldContent.appendChild(newDiv);
}
