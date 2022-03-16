import {useState, useEffect} from 'react'
import axios from 'axios'
import convertUnits from 'convert-units'
import {getCityCode} from '../utils/utils'
import { getWeatherUrl } from '../utils/urls'

const useCityList = (cities) => {
    /* allWeather
 
     [Buenos Aires-argentina]: {temperature, 10, state: "sunny"}
     [Formosa-Argentina]: {temperature, 10, state: "sunny"},
     [Medellin-Colombia]: {temperature, 10, state: "sunny" }
 */
     const [allWeather, setAllWeather]   = useState({})
     const [error, setError] = useState(null)
 
 
     useEffect(() => {
 
         const setWeather =  async (city, countryCode) => {
 
             const url = getWeatherUrl({ city, countryCode }) 
             
             try {
                 const response = await axios.get(url)
                 const { data } = response
                 const temperature = Number(convertUnits(data.main.temp).from('K').to('C').toFixed(0))
                 const state = data.weather[0].main.toLowerCase()
 
                 const propName = getCityCode(city, countryCode) //Ej: [Buenos Aires-argentina] ==> INDICE
                 const propValue = { temperature, state } //Ej: {temperature, 10, state: "sunny" } ==> VALUE
                 
                 //set[VARIABLE_ESTADO](VIARABLE_ESTADO => VARIABLE_ESTADO+1)
                 setAllWeather(allWeather => ({...allWeather,[propName] : propValue}))//deestructuring para agregar valores en objeto en una sola linea    
             } catch (error) {
                 //Errores que nos responde el servidor
                 if( error.response ){
                     setError("Ha ocurrido un error en el servidor del clima") 
                 }else if(error.request){//Errores que suceden por no llegar al server
                     setError("Verifique la conexion a internet")
                 }else{//Errores imprevisibles
                     setError("Error al cargar los datos")
                 }
             }
         }
 
         //deestrucuting
         cities.forEach( ( { city, countryCode } ) =>{
             setWeather(city,countryCode)
         });
         
 
     }, [cities])//[cities] ==> dependencia!, allWeather deberia ser una dependencia pero lo usamos de tal manera en el setAllWeather que no nescesario hacerlo


     return {error,setError, allWeather}
}


export default useCityList