const apiID = "67e480613b70c9ce77febdb75c011b3e"

export const getForecastrUrl = ({city, countryCode}) => `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&&appid=${apiID}` 

export const getWeatherUrl = ({city, countryCode}) => `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&&appid=${apiID}` 
