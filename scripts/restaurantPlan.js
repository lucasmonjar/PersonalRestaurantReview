// Requirement 8: javascript event listener
window.addEventListener("load", () => {
    let lat;
    let lon;
    navigator.geolocation.getCurrentPosition(setPosition);
    function setPosition(data){
        lat = data.coords.latitude;
        lon = data.coords.longitude;

        //Requirement 10 AJAX to interact with an API
        let weatherAPIURL = `https://api.weather.gov/points/${lat},${lon}`;
        fetch(weatherAPIURL)
            .then(response => response.json())
            .then(data => {
                let forecastURL = data.properties.forecast;
                fetch(forecastURL)
                    .then(response => response.json())
                    .then(data => {
                        let forecast = data.properties.periods[0].detailedForecast;
                        let weatherIcon = data.properties.periods[0].icon;
                        document.querySelector('#weather').innerText = forecast;
                        document.querySelector('#weatherIcon').src = weatherIcon;
                    })
            });
    }
})

// Requirement 9: querySelector:
// There are 2 instances on this page of
//querySelector or querySelectorAll