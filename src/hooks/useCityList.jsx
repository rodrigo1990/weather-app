import {useState, useEffect} from 'react'
import axios from 'axios'
import { getWeatherUrl } from '../utils/urls'
import getAllWeather from '../utils/transform/getAllWeather'
import { getCityCode } from '../utils/utils'



const useCityList = (cities, allWeather, onSetAllWeather) => {
    /* allWeather
 
     [Buenos Aires-argentina]: {temperature, 10, state: "sunny"}
     [Formosa-Argentina]: {temperature, 10, state: "sunny"},
     [Medellin-Colombia]: {temperature, 10, state: "sunny" }
 */
     //const [allWeather, setAllWeather]   = useState({})
     const [error, setError] = useState(null)
 
 
    useEffect(() => {

        const setWeather =  async (city, countryCode) => {
 
             const url = getWeatherUrl({ city, countryCode }) 
            
             try {
                 const response = await axios.get(url)
                 const allWeatherAux = getAllWeather( response, city, countryCode )
                 //setAllWeather(allWeather => ({...allWeather,...allWeatherAux } ) )//deestructuring para agregar valores en objeto en una sola linea    
                //onSetAllWeather "sube" entre las distintas paginas y componentes y se ejecuta en App.jsx
                console.log("allWeatherAux",allWeatherAux)
                onSetAllWeather( allWeatherAux )
                
             } catch (error) {
                 //Errores que nos responde el servidor
                 if( error.response ){
                     setError("Ha ocurrido un error en el servidor del clima") 
                 }else if(error.request){//Errores que suceden por no llegar al server
                     setError("Verifique la conexion a internet")
                 }else{//Errores imprevisibles
                    console.log(error)
                     setError("Error al cargar los datos")
                 }
             }
        }
 
         //deestrucuting
         cities.forEach( ( { city, countryCode } ) =>{
            if(!allWeather[getCityCode(city, countryCode)])
                setWeather(city,countryCode)
         });
         
 
    }, [cities,onSetAllWeather, allWeather])

    return {error,setError}
}


export default useCityList