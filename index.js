const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetalis = document.querySelector('.weather-detalis')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', ()=> {
    const APIkey = '1a89fbdb44a9bb5b1fbcbfdeaefc19d1';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`).then(response => response.json()).then(json => {
        if (json.cod == '404') {
            container.style.height= '400px';
            weatherBox.classList.remove('active');
            weatherDetalis.classList.remove('active');
            error404.classList.add('active')
            return;
        }

        container.style.height= '555px';
        weatherBox.classList.add('active');
        weatherDetalis.classList.add('active');
        error404.classList.remove('active')


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-detalis .humidity span');
        const wind = document.querySelector('.weather-detalis .wind span');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'img/clear.png';
                break;

            case 'Rain':
                image.src = 'img/rain.png';
                break;
        
            case 'Snow':
                image.src = 'img/snow.png';
                break;

            case 'Clouds':
                image.src = 'img/cloud.png';
                break;

            case 'Mist':
                image.src = 'img/mist.png';
                break;

            case 'Haze':
                image.src = 'img/mist.png';
                 break;

            default:
                image.src = 'img/cloud.png';
        }

        temperature.innerHTML= `${parseInt(json.main.temp)-273.15.toFixed()} <span>°C</span>`;
        description.innerHTML= `${json.weather[0].description}`;
        humidity.innerHTML= `${json.main.humidity}%`;
        wind.innerHTML= `${parseInt(json.wind.speed)}Km/h`;

    })
})
