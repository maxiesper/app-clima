import {useState} from "react"

const api = {
  key: "d80a8a18bce6a353d60f41f31fbf1545",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if (e.key === "Enter") {
      fetch (`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result)
        console.log(result)}
        )
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[d.getDay()]; // Returns a number between 0 and 6
    let date = d.getDate(); // Returns the current local date
    let month = months[d.getMonth()] // Returns a number between 0 and 11
    let year = d.getFullYear() // Returns current year

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 10) ? (weather.main.temp > 20) ? ('App warm') : 'App' : 'App cold') : 'App'}>
      <main>
        <div className="search-box">
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search a location..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <section>
        <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">
            {dateBuilder(new Date())}
          </div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
        </section>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;