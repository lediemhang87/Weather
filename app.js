const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static('public'));

app.listen(process.env.PORT || 3000, function(){
  console.log("App is running on port 3000");
})

app.get("/", function(req, res){
  res.sendFile('/index.html' , { root : __dirname});
})

app.post("/", function(req, res){
  const query = req.body.cityName;
  const api = "d9bfd75a25e0c37c1c39b6c8246f942f";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=" + api;

  https.get(url, function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<h1> The weather in "+ query +" is currently " + description + "</h1>");
      res.write("<h1> The temperature is " + temp + " degree celcius </h1>");
      res.write("<img src='http://openweathermap.org/img/wn/"+ icon + "@2x.png' >")
      res.send();
    })

})
});
