const api_key="0dafd344d46baa3f908548c9d93f9f06";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

async function  getData(){
  
   try{

    let city =document.getElementById("city").value
    let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    let res = await fetch(url);

    let data= await res.json();

    append(data);
    console.log(data);
   }
   catch(err){
       console.log(err);
   }



}
getData()

function append(data){
    let container=document.getElementById("container")
    container.innerHTML=null;
   
        let h3 =document.createElement("h3")
        h3.innerText=data.name;

        let temp= document.createElement("p")
        temp.innerText=`Current temp: ${Math.floor(data.main.temp-273)} c`;

        let max=document.createElement("p")
        max.innerText=`max temp: ${Math.floor(data.main.temp_max-273)} c`;

        let min=document.createElement("p")
        min.innerText=`min temp: ${Math.floor(data.main.temp_min-27)} c`;

        let wind =document.createElement("p")
        wind.innerText=`Wind:${data.wind.speed} km/h`;

        let clouds=document.createElement("p")
        clouds.innerText=`clouds :${data.clouds.all}`;

        let sunrise=document.createElement("p")
        sunrise.innerText=`Sunrise :${data.sys.sunrise}`;

        let sunset=document.createElement("p")
        sunset.innerText=`Sunset :${data.sys.sunset}`;



   
        container.append(h3,temp,max,min,wind,clouds,sunrise,sunset);

        forecast(data.name)

        let iframe=document.getElementById("gmap_canvas");
        iframe.src =`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

}

// function getLocationWeather(){
//     navigator.geolocation.getCurrentPosition(success);

//     function success(position){
//         const latitude = position.coords.latitude;
//         const longitude = postion.coords.longitude;

//         console.log(latitude)
//         console.log(longitude)
//     }
// }

// getLocationWeather();

//http://api.weatherapi.com/v1/forecast.json?key=a4f70c362d8c4427b4c133733222805 &q=London&days=7&aqi=no&alerts=no

async function forecast(name){
    try{
        let url=`http://api.weatherapi.com/v1/forecast.json?key=a4f70c362d8c4427b4c133733222805&q=${name}&days=7&aqi=no&alerts=no`
    
        let res=await fetch(url);
        let info=await res.json();
        console.log(info.forecast.forecastday);
        appendforecast(info.forecast.forecastday)
    }
    catch(err){
        console.log(err);
    }
}


 function appendforecast(fore){
    let forecast=document.querySelector("#forecast")
    forecast.innerHTML=""
    fore.forEach(function(el){

        let div=document.createElement("div")

        let div1=document.createElement("div")
        div1.setAttribute("id","div1")

        let date=document.createElement("p")
        date.innerText=`Date :${el.date}`;

        let img=document.createElement("img")
        img.src=el.day.condition.icon;
        div1.append(date,img)

        let maxtemp=document.createElement("p")
        maxtemp.innerText=`Max Temp :${el.day.maxtemp_c} C`

        let mintemp=document.createElement("p")
        mintemp.innerText=`Min Temp :${el.day.mintemp_c} C`

        div.append(div1,maxtemp,mintemp)

        forecast.append(div)

    })
 }



