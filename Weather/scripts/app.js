const querycity = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const cityDeets = data.cityDeets;
    const weather = data.weatherDeets;


    //update night and day and icon
    let iconsrc = `img/icons/${weather.WeatherIcon}.svg`;
    
    let timesrc = null;
    if(weather.IsDayTime){
        timesrc = 'img/day.svg';
    }else{
        timesrc = 'img/night.svg';
    }
    time.setAttribute('src',timesrc);
    icon.setAttribute('src',iconsrc);



    details.innerHTML = `
    <h5 class="my-3">${cityDeets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};



// function to update city and get deets
 const updateCity = async (city) => {
   const cityDeets = await getCity(city);
   const weatherDeets = await getWeather(cityDeets.Key);
  return {
       cityDeets,
       weatherDeets
  };
 };



querycity.addEventListener('submit', (e) =>{
    e.preventDefault();
    const city = querycity.city.value.trim();
    querycity.reset();
    // update the city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
    //to store data
    localStorage.setItem('city',city);
});

//check if the storage is set and use it as default to load the weather app

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}