const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const API = "4a231ae49dcb5b44fe460f9e1287b113";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(url);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, please try again!";
  }
  res.render("index", { weather, error });
});

app.get("/joke", async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Key': '8162deab3cmsh9baff6c1ab06c6ep191b81jsnd643cb83a784',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const joke = response.data.value;
    res.render('chuckNorrisJoke', { joke });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/gamerelease", async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://new-videogames-releases.p.rapidapi.com/getMonthGames',
    headers: {
      'X-RapidAPI-Key': '8162deab3cmsh9baff6c1ab06c6ep191b81jsnd643cb83a784',
      'X-RapidAPI-Host': 'new-videogames-releases.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    const games = response.data;
    res.render("newgames", { games })
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});