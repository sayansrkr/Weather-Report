const timel=document.getElementById("time");
const datel=document.getElementById("date");
const currentweatherItem=document.getElementById("current-weather-items");
const timezone=document.getElementById('time-zone');
const country= document.getElementById('country');
const weatherforecast=document.getElementById('weather-forecast');
const currenttempl=document.getElementById("current-temp");

const days=['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun',"July",'Aug','Sep','Oct','Nov','Dec'];

 const key='b3f9f8d5c625455fdf4ce17ac98337b4';
setInterval(() =>{
    const time=new Date();
    const month=time.getMonth();
    const day=time.getDay();
    const date=time.getDate();
    const hour=time.getHours();
    const hoursIn12Hr=hour >=13 ? hour %12 :hour
    const minutes=time.getMinutes();
    const ampm=hour >=12 ? 'PM' : 'AM'

    timel.innerHTML=(hoursIn12Hr<10?'0'+hoursIn12Hr:hoursIn12Hr) + ':'+(minutes <10? '0'+minutes:minutes)+ ' '+`<span id=am-pm>${ampm}</span>`
    datel.innerHTML=days[day]+ ',' +date+ ' ' +months[month]

    
},1000)


function getWeather(){
    navigator.geolocation.getCurrentPosition((success)=>{
        

        let{latitude, longitude}=success.coords;

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${key}`).then(res => res.json()).then(data => {
            console.log(data)
            showweather(data);
        })
    
    })
}

getWeather();

function showweather(data){
    let {humidity,pressure,temp, wind_speed, sunrise, sunset}= data.current;

    timezone.innerHTML=data.timezone;
    country.innerHTML=data.lat+ 'N'+data.lon+'E'
 
   
    currentweatherItem.innerHTML=
    `   <div class="weather-items">
        <div>temparature</div>
        <div>${temp}%</div>
        </div>
        <div class="weather-items">
            <div>Humidity</div>
            <div>${humidity}%</div>
        </div>
        
        <div class="weather-items">
            <div>wind speed</div>
            <div>${wind_speed}</div>
        </div>
        <div class="weather-items">
            <div>Sunrise</div>
            <div>${sunrise}}</div>
        </div>
        <div class="weather-items">
            <div>Sunset</div>
            <div>${sunset}</div>
        </div>`;
        

    
    data.daily.forEach((day, idx) => {
        if(idx==0){
            currenttempl.innerHTML=`

            <div class="today" id="current-temp">
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather" class="w-icon">
            <div class="others">
            <div class="day">${day.dt}</div>
            <div class="temp">Night - ${day.temp.night}&#176; C</div>
            <div class="temp">day - ${day.temp.day}&#176; C</div>
            </div>`
            
            

        }else{
            weatherforecast.innerHTML=`
                <div class="weather-forecast-item">
                <div class="day">${day.dt}</div>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather" class="w-icon">                
                <div class="temp">Night - ${day.temp.night}&#176; C</div>
                <div class="temp">day - ${day.temp.day}&#176; C</div>
                </div>
            
            `
        }
    })

    // weatherforecast.innerHTML=otherdayforcast;
}