import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import CityInfo from '../CityInfo'

import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Weather from '../Weather'

//renderCityAndCountry se va a convertir en una funcion que retorna otra funcion
const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    
    const {city,country} = cityAndCountry
    const {temperature, state} = weather

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

                            <Weather temperature={temperature} state={state} />
                        
                        </Grid>


                </Grid>                
                
            </ListItem>
            )

}

const CityList = ({ cities, onClickCity }) => {
    
    const weather = { temperature:10, state:"sunny" }

    return (
        <List>
            {
                //sobre cada elemento del array ejecuta un renderCityAndCountry
                cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry, weather))
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
