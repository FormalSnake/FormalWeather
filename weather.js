async function fetchWeatherData(lat, long) {
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`);
    const data = await response.json();

    const condition = data.current_weather.weathercode;
    const temp = Math.floor(data.current_weather.temperature);
    const feelslike = data.current_weather.temperature;
    const windspeed = data.current_weather.windspeed;

    // Determine if it's day or night
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const isDay = currentHour >= 6 && currentHour < 18;

    const weatherIconsDay = {
      "0": "",  // Sunny/113
      "1": "",  // Sunny/113
      "2": "",  // Partly cloudy/116
      "3": "",  // Cloudy/119
      "45": "", // Mist/143
      "48": "", // Mist/143
      "51": "", // Patchy rain possible/176
      "53": "", // Patchy rain possible/176
      "55": "", // Patchy rain possible/176
      "56": "", // Patchy sleet possible/182
      "57": "", // Patchy sleet possible/182
      "61": "", // Patchy rain possible/176
      "63": "", // Patchy rain possible/176
      "65": "", // Patchy rain possible/176
      "66": "", // Patchy sleet possible/1282
      "67": "", // Patchy sleet possible/182
      "71": "", // Patchy snow possible/179
      "73": "", // Patchy snow possible/179
      "75": "", // Patchy snow possible/179
      "77": "", // Patchy snow possible/179
      "80": "", // Patchy rain possible/1276
      "81": "", // Patchy rain possible/176
      "82": "", // Patchy rain possible/176
      "85": "", // Patchy snow possible/179
      "86": "", // Patchy snow possible/179
      "95": "", // Patchy light snow with thunder/392
      "96": "", // Patchy light snow with thunder/392
      "99": "", // Ice pellets/350
    };

    const weatherIconsNight = {
      "0": "",  // Sunny/113
      "1": "",  // Sunny/113
      "2": "",  // Partly cloudy/116
      "3": "",  // Cloudy/119
      "45": "", // Mist/143
      "48": "", // Mist/143
      "51": "", // Patchy rain possible/176
      "53": "", // Patchy rain possible/176
      "55": "", // Patchy rain possible/176
      "56": "", // Patchy sleet possible/182
      "57": "", // Patchy sleet possible/182
      "61": "", // Patchy rain possible/176
      "63": "", // Patchy rain possible/176
      "65": "", // Patchy rain possible/176
      "66": "", // Patchy sleet possible/1282
      "67": "", // Patchy sleet possible/182
      "71": "", // Patchy snow possible/179
      "73": "", // Patchy snow possible/179
      "75": "", // Patchy snow possible/179
      "77": "", // Patchy snow possible/179
      "80": "", // Patchy rain possible/1276
      "81": "", // Patchy rain possible/176
      "82": "", // Patchy rain possible/176
      "85": "", // Patchy snow possible/179
      "86": "", // Patchy snow possible/179
      "95": "", // Patchy light snow with thunder/392
      "96": "", // Patchy light snow with thunder/392
      "99": "", // Ice pellets/350
    };

    const icon = isDay ? weatherIconsDay[condition] : weatherIconsNight[condition];

    // Update the UI
    document.getElementById('weather-icon').textContent = icon;
    document.getElementById('temperature').textContent = temp;
    document.getElementById('feels-like').textContent = feelslike;
    document.getElementById('windspeed').textContent = windspeed;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

async function requestLocationFromIP() {
  try {
    // Fetch the location data from ipinfo.io
    const ipInfoResponse = await fetch('https://ipinfo.io/loc');
    const loc = await ipInfoResponse.text(); // 'loc' is in the format 'latitude,longitude'

    // Split the 'loc' string to get latitude and longitude separately
    const [latitude, longitude] = loc.split(',');

    // Now you can use latitude and longitude for your weather script
    console.log('Latitude:', latitude, 'Longitude:', longitude);

    // Call fetchWeatherData with the latitude and longitude from ipinfo.io
    fetchWeatherData(latitude, longitude);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error('Error fetching location from IP:', error);
  }
}

// Call the function to request location from IP on app start
requestLocationFromIP();

setInterval(requestLocationFromIP, 60000);
