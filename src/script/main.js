const searchButton = document.querySelector('[data-option="search"]');
const inputCityName = document.querySelector('[data-option="city"]');
const countryView = document.querySelector('.weather');

const data = new Date();
const day = `${data.getDate()}`.padStart(2, '0');
const month = `${data.getMonth() + 1}`.padStart(2, 0);
const year = data.getFullYear();

const renderView = function (data, main, weather, wind) {
  const html = ` 
  <div class="country">
  <h1 class="country__name">${day}.${month}.${year}</h1>
                        <p class="country__city">${data.name}</p>
                        <div class="country__img">
                            <div class="img">
                                <img src='https://openweathermap.org/img/wn/${
                                  weather[0].icon
                                }@4x.png' alt="weather"
                                    class="img__weather">
                                <p class="img__text">
                                  ${weather[0].description}
                                </p>
                            </div>
                            <p class="country__img--temp">${main.temp.toFixed(
                              1
                            )}°c</p>
                        </div>
                        <div class="packet">
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite.svg#icon-wind"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data"> ${
                                  wind.speed
                                }km/h</p>
                            </div>
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite.svg#icon-thermometer-full"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data">${(
                                  (main.temp_max + main.temp_min) /
                                  2
                                ).toFixed(1)}+/-</p>
                            </div>
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite1.svg#icon-cloud"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data"> 
                                 ${data.clouds.all}%</p>
                            </div>
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite.svg#icon-barometer"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data "> ${
                                  main.pressure
                                }mb</p>
                            </div>
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite.svg#icon-eye"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data "> ${
                                  data.visibility / 1000
                                }km</p>
                            </div>
                            <div class="atmospheric">
                                <button class="atmospheric__button">
                                    <svg class="atmospheric__icon">
                                        <use xlink:href="src/img/sprite.svg#icon-droplet"></use>
                                    </svg>
                                </button>
                                <p class="atmospheric__data "> ${
                                  main.humidity
                                }%</p>
                            </div>
                        </div>
                        </div>`;
  countryView.innerHTML = '';
  countryView.insertAdjacentHTML('afterbegin', html);
};
const messageError = 'not found weather data your city.Try again !! 🛑🛑🛑';

const weatherApi = async function (city) {
  try {
    const app = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=eb9bcc986ad27181924599e7ccb233aa`
    );
    console.log(app);

    //check fetched api
    if (!app.ok) throw new Error('Not found . Try again!!!!');

    const data = await app.json();

    const { main, weather, wind } = data;

    //Render view data weather
    renderView(data, main, weather, wind);
  } catch (err) {
    countryView.textContent = `${messageError}`;
  }
};

const Weather = function (e) {
  e.preventDefault();
  const cityName = inputCityName.value;
  if (!cityName || Number(cityName)) return;
  console.log(cityName);

  weatherApi(cityName);
  inputCityName.value = '';
};

searchButton.addEventListener('click', Weather);

// https://openweathermap.org/img/wn/10d@4x.png
