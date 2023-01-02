const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timeZone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const days = ['Sunday' , ' Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday']
const months = ['Jan' , 'Feb' , 'Mar', 'Apr' , 'May' , 'Jun' , 'Jul' , 'Aug' , 'Sept' , 'Oct' , 'Nov' , 'Dec'];
const API_KEY = '0d5bbe3077eaa19aa967620e0927904b';
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0' + minutes: minutes) + '' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ' , ' +  date + ' ' + months[month]
}, 1000);

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {
        let {latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=current,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
            console.log(data)
            showWeatherData(data);
        })
    })
}
function showWeatherData(data) {
    let{humidity, pressure, feels_like,temp,temp_max,temp_min} = data.main;
    let{country,sunrise, sunset} = data.sys;
    let{speed} = data.wind;
    let{name} = data;
    let{description} = data.weather[0];
    currentWeatherItemsEl.innerHTML = 
    `
    <div class="weather-info">
    <div class="weather-item">
        <h1>Weather in ${name}</h1>
    </div>
    <div class="weather-item">
        <h1>${temp}°C</h1>
    </div>
    <div class="weather">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="" class="icon" />
        <div class="description"></div>
        <div>${description}</div>
    </div>
    <div class= "info">
    <div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${speed}km/h</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise*1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    </div>
    </div>
    `;
}

