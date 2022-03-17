import React from 'react'
import PropTypes from 'prop-types'

import Alert  from '@mui/material/Alert'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import CityInfo from '../CityInfo'
import useCityList from '../../hooks/useCityList'
import Weather from '../Weather'
import {getCityCode} from '../../utils/utils'




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

const CityList = ({ cities, onClickCity, onSetAllWeather }) => {
 
    const { error, setError, allWeather } = useCityList(cities, onSetAllWeather)

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
