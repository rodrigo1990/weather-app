import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Axios from 'axios' 
import CityInfo from '../CityInfo'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Weather from '../Weather'

//renderCityAndCountry se va a convertir en una funcion que retorna otra funcion
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    
    const {city,country} = cityAndCountry
    //const {temperature, state} = weather

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

                            {
                                weather ? 
                                <Weather temperature={weather.temperature} 
                                    state={weather.state} /> : ("No hay datos.")
                            
                            }
                        
                        </Grid>


                </Grid>                
                
            </ListItem>
            )

}

const CityList = ({ cities, onClickCity }) => {
    
    /*allWeather
    {
        [Buenos Aires - Argentina]: {temperature:10, state:"sunny"},
        [Bogotá - Colombia]: {temperature:10, state:"sunny"},
        [Madrid - España]: {temperature:10, state:"sunny"},
        [Ciudad de Mexico - Mexico]: {temperature:10, state:"sunny"},
    }

    */
    const [allWeather, setAllWeather] = useState({})

    useEffect(() => {

        const setWeather = ( city, country, countryCode  )=> {

            const appId = "49d7711fc745dd813b885b1c23e71a9e"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appId}`
            Axios
            .get(url)
            .then( response => {
            
                const{ data } = response
                const temperature  = data.main.temp
                const state = data.weather[0].main.toLowerCase()
                const propName = `${city}-${country}`// Ej: [Buenos Aires - Argentina]
                const propValue = {temperature, state}// Ej: {temperature:10, state:"sunny"}
                console.log('propName',propName)
                console.log('propValue',propValue)

                /*
                    allWeather 1er pasada:
                        [Buenos Aires - Argentina]: {temperature:10, state:"sunny"},
                    
                    allWeather 2da pasada:
                        [Buenos Aires - Argentina]: {temperature:10, state:"sunny"},
                        [Bogotá - Colombia]: {temperature:10, state:"sunny"},
                */
               //ACTUALIZACION FUNCIONAL
               // NO HACE FALTA AGREGARLA A LAS DEPENDENCIAS DE useEffect YA QUE DE ESTA MANERA
               //HACE REFERENCIA AL VALOR ANTERIOR QUE TENIA allWeather
               //set[VARIABLE_ESTADO](VARIABLE_ESTADO => VARIABLE_ESTADO)
                //Tambien podria:
                //setAllWeather(allWeather => ({...allWeather, [propName]: propValue}))
                setAllWeather(allWeather => {
                    const result = {...allWeather,[propName]: propValue }
                    return result 
                })
               

            })
        
        }

        cities.forEach(({ city, country, countryCode}) => {
            setWeather(city,country, countryCode)
        });

        
    }, [cities])
    
    //const weather = { temperature:10, state:"sunny" }

    return (
        <List>
            {
                //sobre cada elemento del array ejecuta un renderCityAndCountry
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                                             allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]))
            }
        </List>
    )

}

CityList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            city:PropTypes.string.isRequired,
            country:PropTypes.string.isRequired,
            countryCode:PropTypes.string.isRequired,
       })
    ).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList
