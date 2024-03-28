import './Main.css'
import axios from "axios"
import React, { memo, useEffect, useState } from "react"
import clear_day from "./sun.png"
import clear_night from "./total-eclipse.png"
import few_cloud_night from "./cloudy-night.png"
import few_cloud_day from "./clouds-and-sun.png"
import cloud from "./cloud.png"
import rain_day_cloud from "./rainy (1).png"
import rain_night_cloud from "./rainy.png"
import thunderstrom_day from "./thunderstorm (1).png"
import thunderstrom_night from "./thunderstorm.png"
import snow from "./snowflake.png"
import mist_day from "./icons8-mist-100.png"
import mist_night from "./icons8-mist-100 (1).png"
import cloud1 from "./cloud1.png"
import cloudy1n from "./cloudy1n.png"
let object = {
    "01d": clear_day,
    "02d": few_cloud_day,
    "04d": cloud1,
    "09d": rain_day_cloud,
    "10d": rain_day_cloud,
    "03d": cloud,
    "11d": thunderstrom_day,
    "13d": snow,
    "50d": mist_day,
    "01n": clear_night,
    "02n": few_cloud_night,
    "03n": cloud,
    "04n": cloudy1n,
    "09n": rain_night_cloud,
    "10n": rain_night_cloud,
    "11n": thunderstrom_night,
    "13n": snow,
    "50n": mist_night
}
function Main(props) {
    const [state, setState] = useState("")
    const [weather, setweather] = useState({})
    const [weatherIcon, setWeatherIcon] = useState()
    const [weatherName,setWeatherName] = useState("")
    const [time, setTime] = useState()
    var a = ""
    var b = new Date()
    // console.log(props.data)
    const effect = useEffect(()=>{
        setweather(props.data)
        setWeatherIcon(props.info.icon)
        setWeatherName(props.info.main)
        setTime(`${b.getHours()}:${b.getMinutes()}`)
    },[props])

    
    async function countryWeather() {
        if (state!== "") {
            const api = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state}&units=Metric&appid=8ad6552129445c43422deff6423dc0f5`)
            .then((position) => {
                setweather(position.data)
                setWeatherIcon(position.data.weather[0].icon)
                setWeatherName(position.data.weather[0].main)
                    // console.log(position.data)
                })
                .catch((error) => { console.log("error") })
            } else {
                console.log("error")
        }
    }
    for (let i in object) {
        if (weatherIcon === i) {
            a = object[i]
        }
    }
    return (
        <>
            <div className="main">
                <div className="search">
                    <labal className="label">Location : <input onChange={(e) => { setState(e.target.value) }} className="input" value={state} placeholder="search" /></labal>
                    <button onClick={() => { countryWeather() }} className="searchButton"><img className="searchImg" src="https://www.pngfind.com/pngs/m/617-6173786_small-icon-png-search-icon-svg-transparent-png.png" /></button>
                </div>
                 <div>
                <div><img style={{filter: "brightness(0) saturate(100%) invert(100%) sepia(8%) saturate(57%) hue-rotate(315deg) brightness(113%) contrast(92%)", border : "rgb(227, 227, 227)", height: "25vh", width: "25vh", marginTop: "2vh", marginLeft:"-70vh" }} src={a}></img></div>
                <div>
                    <p style={{marginLeft:"-35vh", marginTop:"-21vh"}}>{Math.floor(weather.main?.temp_max)}°</p><br/>
                    <p style={{marginLeft:"-35vh", marginTop:"-10px"}}>{Math.floor(weather.main?.temp_min)}°</p>
                </div>
                 </div>   
                <div className="top">
                 <h3>{0+Math.floor(weather.main?.temp)}°C</h3>
                 </div>
                 <div>
                    <p style={{marginTop:"-14vh", marginLeft:"-30vh"}}>{weatherName}</p>
                    <p style={{marginTop:"-1vh", marginLeft:"-25vh", fontWeight :"normal", fontSize:"2.5vh"}}>Feels like <span>{Math.floor(weather.main?.feels_like)}</span>°</p>
                </div>
                <h3 style={{marginLeft:"-60vh", marginTop :"10vh"}}>{weather.name}<sup style={{ fontSize: "20px", marginLeft: "10px" }}>({weather.sys?.country})</sup></h3>
                <div>
                    <p style={{marginLeft:"-77vh", marginTop :"-2vh"}}>{time} <span>{b.getHours > 11 ? "PM" : "AM"}</span></p>
                    <div className="about">
                        <div>Wind<br /><span>{Math.floor(weather.wind?.speed)}km/h</span></div>
                        <div>Humidity<br /><span>{weather.main?.humidity}%</span></div>
                        <div>Visibility<br /><span>{weather.visibility / 1000}</span>km</div>
                        <div>Pressure<br /><span>{weather.main?.pressure}mb</span></div>
                    </div>
                </div>

            </div>
         
        </>
    )
}
export default memo(Main)