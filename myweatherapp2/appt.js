const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const { readdirSync } = require("fs")
const https=require("https")
const { response } = require("express")
const app=express()

 app.use(bodyParser.urlencoded({extended:true}))


app.listen(3000,function(){
    console.log("server is working")
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})
 app.post("/",function(req,res){  
   console.log("server is making perfect post request")
   const cityName=req.body.cityName
   const url="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&&appid=06a2e9f35ed2fde1502d4a7a639fed45&units=metric";
   

   https.get(url,(response)=>{
    console.log(response.statusCode);
   

   response.on("data",function(data){
    const weatherdata=JSON.parse(data)
    console.log(weatherdata);
    const temp=weatherdata.main.temp
    const  windSpeed=weatherdata.wind.speed
    const icon=weatherdata.weather[0].icon
    const imgURL= "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    

    res.write("<h1>Temperature of " + cityName + " is "+temp+" degree celcius, windspeed is "+windSpeed +"</h1>")
    res.write("<img src="+imgURL+">")
    res.send();

    
})
   })
  
})
