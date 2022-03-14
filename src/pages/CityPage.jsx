import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import { useParams } from 'react-router-dom'
import AppFrame from './../components/AppFrame'
import CityInfo from './../components/CityInfo'
import Weather from './../components/Weather'
import WeatherDetails from './../components/WeatherDetails'
import ForecastChart from './../components/ForecastChart'
import ForeCastItemList from './../components/ForeCastItemList'
import Paper from '@material-ui/core/Paper'


const forecastItemExample = [
    {weekDay:"monday", hour:13, state:"clouds", temperature:25},
    {weekDay:"tuesday", hour:12, state:"thunderstorm", temperature:5},
    {weekDay:"wednesday", hour:14, state:"drizzle", temperature:25},
    {weekDay:"thursday", hour:15, state:"clouds", temperature:5},
    {weekDay:"friday", hour:9, state:"fog", temperature:5},
    {weekDay:"saturday", hour:2, state:"rain", temperature:25},
    {weekDay:"sunday", hour:13, state:"thunderstorm", temperature:5},
]

const forecastChartExample = [
    { "dayHour": "Jue 18", "min": 14, "max": 22, },
    { "dayHour": "Vie 06", "min": 18, "max": 27, },
    { "dayHour": "Vie 12", "min": 18, "max": 28, },
    { "dayHour": "Vie 18", "min": 18, "max": 25, },
    { "dayHour": "Sab 06", "min": 15, "max": 22, },
    { "dayHour": "Sab 12", "min": 12, "max": 19, }
]

const CityPage = () => {

    const [data, setData] = useState(null)
    const [forecastItemList, setForecastItemList] = useState(null)


    const params = useParams()

    console.log(params)

    useEffect(() => {
        setData(forecastChartExample)
        setForecastItemList(forecastItemExample)
    },[])
   




    const city="Buenos Aires"
    const country="Argentina"
    const state="clouds"
    const temperature=20
    const humidity=80
    const wind=20
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
                            <WeatherDetails humidity={humidity} wind={wind} />
                        
                    </Grid>

                    <Grid item>
                        {
                            data && <ForecastChart data={data}/>
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
