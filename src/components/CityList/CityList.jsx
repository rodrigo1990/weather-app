import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import CityInfo from '../CityInfo'
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
                            {   weather ? //if(weather != 'undefined') 
                                ( <Weather 
                                temperature={weather.temperature}
                                state={weather.state} /> ) : ("No hay datos")
                             }
                        
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


    useEffect(() => {

        const setWeather = (city,country) => {

            const apiID = "49d7711fc745dd813b885b1c23e71a9e"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}` 
        
            axios
            .get(url)
            .then(response => {
                const { data } = response
                const temperature = data.main.temp
                const state = "sunny"

                const propName = `${city}-${country}` //Ej: [Buenos Aires-argentina] ==> INDICE
                const propValue = { temperature, state } //Ej: {temperature, 10, state: "sunny" } ==> VALUE
                
                //set[VARIABLE_ESTADO](VIARABLE_ESTADO => VARIABLE_ESTADO+1)
                setAllWeather(allWeather => {
                    
                    const result = {...allWeather,[propName] : propValue}
                    console.log(result)

                    return result
                    
                    })//deestructuring para agregar valores en objeto en una sola linea
                //Escrito de esta manera no es necesario ponerlo como depdencia
            })    
        
        }

        //deestrucuting
        cities.forEach( ( { city, country } ) =>{
            setWeather(city,country)
        });
        

    }, [cities])//[cities] ==> dependencia!, allWeather deberia ser una dependencia pero lo usamos de tal manera en el setAllWeather que no nescesario hacerlo

//    const weather = { temperature:10, state:"sunny" }

    return (
        <List>
            {
                //sobre cada elemento del array ejecuta un renderCityAndCountry
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                     allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`] ) )
            }
        </List>
    )

}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city:PropTypes.string.isRequired,
            country:PropTypes.string.isRequired
       })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList
