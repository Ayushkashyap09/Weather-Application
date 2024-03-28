import logo from './logo.svg';
import './App.css';

import React, { useCallback, useEffect, useMemo, useState } from "react"
import axios from 'axios';
import Main from './components/Main';
import Frontpage from './components/Frontpage';

function App() {
  const [location, setLocation] = useState(null)
  const [user, setUser] = useState({})
  const [info,setinfo]= useState({})
 

  const call = useEffect(() => {
    const location = navigator.geolocation.getCurrentPosition((position) => { setLocation(position) }, (error) => { console.log("error") })
  }, [])

  const getWeather = useMemo(() => {
    if(location){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords?.latitude}&lon=${location.coords?.longitude}&units=Metric&appid=8ad6552129445c43422deff6423dc0f5`).then((weather) => {
        setinfo(weather.data.weather[0])
        setUser(weather.data)
      }).catch((error) => { console.log("error") })
    }else{
      console.log("hello")
    }
  }, [location]) 


  return (
    <div className='background-image'>
    <div className="App">
      {location ? <Main data={user} loc={location} info={info} />:
      <Frontpage />}
    </div>
    </div>
  );
}

export default App;
