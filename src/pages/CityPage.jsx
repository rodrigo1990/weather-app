import React, {useMemo} from 'react'
import Grid from '@material-ui/core/Grid'
import { LinearProgress } from '@mui/material'
import AppFrame from './../components/AppFrame'
import CityInfo from './../components/CityInfo'
import useCityPage from '../hooks/useCityPage'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import ForeCastItemList from './../components/ForeCastItemList'
import Paper from '@material-ui/core/Paper'
import useCityList from '../hooks/useCityList'
import {getCityCode} from '../utils/utils'
import {getCountryNameByCountryCode} from '../utils/serviceCities'




const CityPage = ({allWeather,onSetAllWeather}) => {

    const { city,countryCode, chartData, forecastItemList } = useCityPage()

    //Se generara una nueva instancia de cities, solamente si cambio la informacion
    const cities = useMemo( () => {
        
            return [ { city, countryCode } ] 
        
        },[city, countryCode] //Dependencias donde almacenaran los valores (como en los otros hooks)
    )

    useCityList( cities, allWeather ,onSetAllWeather )
    
    const weather = allWeather[getCityCode(city, countryCode)]

    const country=getCountryNameByCountryCode(countryCode)
    

    const state= weather && weather.state
    const temperature=weather && weather.temperature
    
    const humidity=weather && weather.humidity
    const wind=weather && weather.wind
    //const data = forecastChartExample
    //const forecastItemList = forecastItemExample


    return (
        <AppFrame>
            <Paper elevation={4}>
                <Grid container
                    justifyContent="center"
                    direction="column"
                    spacing={2}>

                    <Grid item container xs={12} justifyContent="center" alignItems="flex-end">
                        <CityInfo city={city} country={country} />
                    </Grid>

                    <Grid item container xs={12}  justifyContent="center" direction="column" alignItems="center">

                            <Weather state={state} temperature={temperature} />
                            {
                                humidity && wind &&<WeatherDetails humidity={humidity} wind={wind} />
                            }
                        
                    </Grid>
                    <Grid item>
                        {
                            !chartData && !forecastItemList && <LinearProgress />   
                        }
                    </Grid>
                    <Grid item>
                        {
                            chartData && <ForecastChart data={chartData}/>
                        }
                    </Grid>

                    <Grid item container>
                        {
                            forecastItemList && <ForeCastItemList forecastList={forecastItemList}  />
                        }
                    </Grid>
                </Grid>
            </Paper>
        </AppFrame>
    )
}


export default CityPage
