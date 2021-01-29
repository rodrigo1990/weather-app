import React from 'react'
import PropTypes from 'prop-types'
import AppFrame from './../components/AppFrame'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import Paper from '@material-ui/core/Paper'

const MainPage = () => {
    const history = useHistory()
    
    const onClickHander = () => {
        history.push("/city")
    }

    const cities = [
        {city:"Buenos Aires", country:"Argentina", countryCode:"AR"},
        {city:"Bogota", country:"Colombia", countryCode:"CO"},
        {city:"Madrid", country:"España", countryCode:"ES"},
        {city:"Ciudad de Mexico", country:"Mexico", countryCode:"MX"},
    ]

    return (
        <AppFrame>
            <Paper elevation={4}>
                <CityList 
                    cities={cities}
                    onClickCity={onClickHander}/>
            </Paper>           
        </AppFrame>
    )
}


export default MainPage
