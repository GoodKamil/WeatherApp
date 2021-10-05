const imgWeather = document.querySelector('.header__img');

const weather = async function (city) {
  try {
    const app = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=908629ff995a9d02c8cba9cf1d456ee3`
    );
    const data = await app.json();
    const { icon } = data.weather[0];

    await imageWeather(icon);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

weather('Oslo');

async function imageWeather(img) {
  try {
    const image = await fetch(`http://openweathermap.org/img/wn/${img}@4x.png`);
    const data = image.url;

    console.log(data);
  } catch (err) {}
}
