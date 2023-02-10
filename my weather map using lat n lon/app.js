const { response } = require("express");
const express= require("express")
const app=express()
const https=require("https");
const bodyParser=require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
res.sendFile(__dirname+"/index1.html")
    })

app.post("/",function(req,res){
    const latt=Number(req.body.lattitude);
    const longg=Number(req.body.longitude);;
    const appkey="06a2e9f35ed2fde1502d4a7a639fed45";
    
    const url="https://api.openweathermap.org/data/2.5/weather?lat=" + latt + "8&lon=" + longg + "8&appid=" + appkey + "&&units=metric";


    https.get(url , (response) => {
        console.log(response.statusCode);
   

    response.on("data",function(data){
       const weatherData= JSON.parse(data)             //covert json to any type of code(hexadecimal,binary) than convert to javascript object
       console.log(weatherData)
       const tempp=weatherData.main.temp;
       const windSpeed=weatherData.wind.speed
       const icon=weatherData.weather[0].icon
       const imgURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
       res.write("<h1>The temperature in given lattitude and longitude is"+ tempp +" degree</h1>")
       res.write("<h1>The wind speed in given lattitude and longitude is "+ windSpeed  + " </h1>")
       res.write("<img src=" +imgURL+">");
       res.send();
 })
 })
})

   

    app.listen(3000,function(){
        console.log("server is running on port 3000")
    })
    

    