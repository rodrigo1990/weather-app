import {useState, useEffect} from 'react'
import axios from 'axios'
import { getWeatherUrl } from '../utils/urls'
import getAllWeather from '../utils/transform/getAllWeather'


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
                 
                 setAllWeather(allWeather => ({...allWeather,...getAllWeather( response, city, countryCode ) } ) )//deestructuring para agregar valores en objeto en una sola linea    

                
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