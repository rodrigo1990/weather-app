import React from 'react'
import PropTypes from 'prop-types'
import AppFrame from './../components/AppFrame'
import { useHistory } from 'react-router-dom'
import CityList from './../components/CityList'
import Paper from '@material-ui/core/Paper'
import { getCities } from '../utils/serviceCities'

const MainPage = ({allWeather, onSetAllWeather}) => {
    const history = useHistory()
    
    const onClickHander = (city, countryCode) => {
        console.log("city",city)
        console.log("countryCode", countryCode)
        history.push(`/city/${countryCode}/${city}`)
    }

    
    return (
        <AppFrame>
            <Paper elevation={4}>
                <CityList 
                    cities={getCities()}
                    onClickCity={onClickHander}
                    onSetAllWeather={onSetAllWeather}
                    allWeather={allWeather}
                    />
            </Paper>           
        </AppFrame>
    )
}


export default MainPage
