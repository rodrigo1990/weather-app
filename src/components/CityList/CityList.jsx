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


//renderCityAndCountry se va a convertir en una funcion que retorna otra funcion
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    
    const {city,country} = cityAndCountry

    return (
            <ListItem button key={city} onClick={eventOnClickCity} >
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

        const setWeather =  async (city,country, countryCode) => {

            const apiID = "49d7711fc745dd813b885b1c23e71a9e"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&&appid=${apiID}` 
            
            try {
                const response = await axios.get(url)
                const { data } = response
                const temperature = Number(convertUnits(data.main.temp).from('K').to('C').toFixed(0))
                const state = data.weather[0].main.toLowerCase()

                const propName = `${city}-${country}` //Ej: [Buenos Aires-argentina] ==> INDICE
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
        cities.forEach( ( { city, country, countryCode } ) =>{
            setWeather(city,country, countryCode)
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
                            allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`] ) )
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
