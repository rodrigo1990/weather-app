import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import CityInfo from '../CityInfo'
import Alert  from '@mui/material/Alert'
import convertUnits from 'convert-units'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Weather from '../Weather'

const getCityCode = (city, countryCode) => `${city}-${countryCode}`
//renderCityAndCountry se va a convertir en una funcion que retorna otra funcion
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    
    const {city,countryCode, country} = cityAndCountry

    return (
            <ListItem button key={getCityCode(city, countryCode)} onClick={ () => eventOnClickCity(city, countryCode)} >
                <Grid container
                    justify="center"
                    alignItems="center">

                        <Grid item
                            container
                            alignItems="center"
                            md={9}
                            xs={12}>

                             <CityInfo city={city} country={country}></CityInfo>

                        </Grid>
                        <Grid item
                            md={3}
                            xs={12}>
                             
                            <Weather 
                                temperature={ weather && weather.temperature}
                                state={weather && weather.state} /> 
                               
                             
                        
                        </Grid>


                </Grid>                
                
            </ListItem>
            )

}

const CityList = ({ cities, onClickCity }) => {
    /* allWeather
    
        [Buenos Aires-argentina]: {temperature, 10, state: "sunny"}
        [Formosa-Argentina]: {temperature, 10, state: "sunny"},
        [Medellin-Colombia]: {temperature, 10, state: "sunny" }
    */
    const [allWeather, setAllWeather]   = useState({})
    const [error, setError] = useState(null)


    useEffect(() => {

        const setWeather =  async (city, countryCode) => {

            const apiID = "67e480613b70c9ce77febdb75c011b3e"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&&appid=${apiID}` 
            
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

//    const weather = { temperature:10, state:"sunny" }

    return (
        <div>
            {
                error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            }
            <List>
                {
                    //sobre cada elemento del array ejecuta un renderCityAndCountry
                    cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                            allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)] ) )
                }
            </List>
        </div>
    )

}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city:PropTypes.string.isRequired,
            country:PropTypes.string.isRequired,
            countryCode:PropTypes.string.isRequired
       })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList
