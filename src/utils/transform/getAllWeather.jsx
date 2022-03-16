import {getCityCode, toCelsius} from '../../utils/utils'


const getAllWeather = (response, city, countryCode ) => {
    const { data } = response
    const temperature = toCelsius(data.main.temp)
    const state = data.weather[0].main.toLowerCase()

    const propName = getCityCode(city, countryCode) //Ej: [Buenos Aires-argentina] ==> INDICE
    const propValue = { temperature, state } //Ej: {temperature, 10, state: "sunny" } ==> VALUE


     //set[VARIABLE_ESTADO](VIARABLE_ESTADO => VARIABLE_ESTADO+1)
     return ( { [propName] : propValue } )//deestructuring para agregar valores en objeto en una sola linea    
}


export default getAllWeather;