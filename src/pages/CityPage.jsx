import React from 'react'
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


let cities = null

const CityPage = () => {

    const { city,countryCode, chartData, forecastItemList } = useCityPage()

    //Esta es la solucion parcial, ya que no es escalable
    if(!cities || !cities[0] || ( cities[0].city !== city || cities[0].countryCode !== countryCode ) ){
        cities = [ {  city, countryCode } ]
    }

    const { allWeather } = useCityList( [ cities ] )
    //

    //Al crear una instancia nueva de city, countryCode por mas que la informacion sea identica, el hook re-renderiza una y otra vez al detectar una nueva instancia
    //generado asi, infinitas requests al servivodr
    //const { allWeather } = useCityList( [ { city, countryCode } ] )
    
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
                    justify="center"
                    direction="column"
                    spacing={2}>

                    <Grid item container xs={12} justify="center" alignItems="flex-end">
                        <CityInfo city={city} country={country} />
                    </Grid>

                    <Grid item container xs={12}  justify="center" direction="column" alignItems="center">

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
