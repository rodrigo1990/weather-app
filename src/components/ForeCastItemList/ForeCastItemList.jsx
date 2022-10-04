import React from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'


import ForeCastItem from './../ForeCastItem'



const renderCityAndCountry = ForeCastList => {

    const {weekDay, hour, state, temperature} = ForeCastList
    var i=1

    return (
           
       //hay que poner un identificador unico
       //vamos a poner una "marca" para encontrar cada item (forecastItem)
        <Grid   item data-testid="forecast-item-container" key={`${weekDay}${hour}`}>

            <ForeCastItem  weekDay={weekDay} hour={hour} state={state} temperature={temperature}></ForeCastItem>

        </Grid>
        
    )
}

const ForeCastItemList = ({ forecastList }) => (
    <Grid   container
            direction="row"
            justifyContent="space-around"
            alignItems="center">

        {
            //sobre cada elemento del array ejecuta un renderCityAndCountry
            forecastList.map(forecastItem => renderCityAndCountry(forecastItem))
        }
    </Grid>
)
//forecastItemList es un array de elementos
//tales deben tener una "forma" en particular
//las siguientes propiedades:

/*
 weekDay:PropTypes.string.isRequired,
    hour:PropTypes.number.isRequired,
    state: PropTypes.oneOf(validValues).isRequired
    temperature:PropTypes.number.isRequired
*/
ForeCastItemList.propTypes = {
    forecastList: PropTypes.arrayOf(PropTypes.shape({
        weekDay:PropTypes.string.isRequired,
        hour:PropTypes.number.isRequired,
        temperature:PropTypes.number.isRequired
    })).isRequired

}

export default ForeCastItemList
