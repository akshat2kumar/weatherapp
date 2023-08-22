 //fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=kochi&appid=1a46211313901e242cbc23622ddd9592`)
 //.then(response =>console.log(response.json()))

const searchBtn=document.getElementById('search-btn');
searchBtn.addEventListener('click',weatherapp);

const myDiv = document.getElementById('content');

myDiv.style.backgroundImage = 'url("/weather/img/r0_3_1200_678_w1200_h678_fmax.jpg")';
myDiv.style.backgroundSize = 'cover';

function weatherapp(){
let searchInputTxt =document.getElementById('search').value.trim();
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInputTxt}&appid=1a46211313901e242cbc23622ddd9592`)
.then(response => response.json())
  .then(data => {
    const searchInput = document.getElementById('search');
    const name = data.name;
    const Weather=data.weather[0].main
    const weatherIcon = data.weather[0].icon;
    const temp= data.main.temp- 273.15
    const unixTimestamp = data.dt;
    
    const unisunrise =data.sys.sunrise;
    const unisunset =data.sys.sunset;
    const humidity=data.main.humidity;
    const pressure=data.main.pressure;
    const windspeed=data.wind.speed;
    const originalTime = new Date(unixTimestamp * 1000);// Convert to milliseconds
    const sunrisetime = new Date(unisunrise * 1000);
    const sunsettime = new Date(unisunset * 1000);

    const timezoneOffset = data.timezone;
    originalTime.setUTCSeconds(originalTime.getUTCSeconds() +timezoneOffset);
    sunrisetime.setUTCSeconds(sunrisetime.getUTCSeconds() +timezoneOffset);
    sunsettime.setUTCSeconds(sunsettime.getUTCSeconds() +timezoneOffset);

    const dayofmonth = originalTime.getDate();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(originalTime);
    const month = originalTime.toLocaleString('en-US', { month: 'long' });
    const hour = originalTime.getUTCHours();
    const minute = originalTime.getUTCMinutes();
  

    const risehour = sunrisetime.getUTCHours();
    const riseminute = sunrisetime.getUTCMinutes();
    const sethour = sunsettime.getUTCHours();
    const setminute = sunsettime.getUTCMinutes();

    const amPM = hour >= 12 ? 'PM' : 'AM';
    const time0= minute>=9?'':'0';
    const risetime0= riseminute>=9?'':'0';
    const settime0= setminute>=9?'':'0';
    console.log('Minute:', minute);
    console.log('Hour:', hour);
    console.log('Weekday:', weekday);
    console.log('AM/PM:', amPM);
    
    const myDiv = document.getElementById('content');
    if (hour <= 10) {

      myDiv.style.backgroundImage = 'url("/weather/img/dawid-zawila--G3rw6Y02D0-unsplash.jpg")';
      myDiv.style.backgroundSize = 'cover';
    } else if (hour > 10 && hour <= 16) {

      myDiv.style.backgroundImage = 'url("/weather/img/noaa-kYREfnSxq94-unsplash.jpg")';
      myDiv.style.backgroundSize = 'cover';
    } else if (hour > 16 && hour <= 19) {
  
      myDiv.style.backgroundImage = 'url("/weather/img/ganapathy-kumar-9kbsq91NFwg-unsplash.jpg")';
      myDiv.style.backgroundSize = 'cover';
    } else {
      searchInput.style.backgroundColor = "white";
      myDiv.style.backgroundImage = 'url("/weather/img/garrett-patz-JS9zhEh4mqc-unsplash.jpg")';
      myDiv.style.backgroundSize = 'cover';
    }
    const timedata = document.getElementById('timedata');
    timedata.innerHTML = `
      <img class="weather-img" src="http://openweathermap.org/img/w/${weatherIcon}.png">
      <h2 class="weather">${Weather}</h2>
      <h3 class="place">${name}</h3> <!-- You might want to update this with the correct city name -->
      <h1 class="temp">${temp.toFixed(2)}°C</h1>
      <div class="time">
       <h1 class="currenttime">${hour > 12 ? hour-12 : hour}:${time0}${minute}</h1>
        <h3 class="ampm">${amPM}</h3>
      </div>
      <div class="week-date">
       <h5 class="week">${dayofmonth}</h5>
       <h5 class="week">${month},</h5>
       <h5 class="week">${weekday}</h5>
     </div>
    `;
    const todays = document.getElementById('todays');
    todays.innerHTML = `
    <div class="humidity">
       <img src="/weather/img/humidity (1).png"> 
       <div class="humidity-type">
           <h3>Humidity</h3>
           <h2>${humidity}%</h2>
       </div>
    </div>
    <div class="airpressure">
       <img src="/weather/img/pressure.png"> 
       <div class="airpressure-type">
           <h3>Air pressure</h3>
           <h2>${pressure}Pa</h2>
       </div>
    </div>
    <div class="windspeed">
       <img src="/weather/img/wind.png"> 
       <div class="windspeed-type">
           <h3>Windspeed</h3>
           <h2>${windspeed}meter/sec</h2>
       </div>
    </div>
    <div class="sunrise">
    <img src="/weather/img/sunrise.png"> 
    <div class="sunrise-type">
        <h3>Sunrise</h3>
        <h2>${risehour}:${risetime0}${riseminute}am</h2>
    </div>
    </div>
    <div class="sunset">
      <img src="/weather/img/sunset.png"> 
      <div class="sunset-type">
          <h3>Sunset</h3>
          <h2>${sethour > 12 ? sethour-12 : sethour}:${settime0}${setminute}pm</h2>
      </div>
    </div>
      `;
     
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}