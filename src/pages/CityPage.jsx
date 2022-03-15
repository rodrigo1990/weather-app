import React, {useState, useEffect} from 'react'
import axios from 'axios'
import convertUnits from 'convert-units/lib'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import 'moment/locale/es'

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


    const {city, countryCode} = useParams()

    console.log("city param", city)
    console.log("countyCode param", countryCode)

    useEffect( () => {

        const getForecast = async () => {
            const apiID = "67e480613b70c9ce77febdb75c011b3e"
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&&appid=${apiID}` 
            const toCelsius = (temp) => Number(convertUnits(temp).from('K').to('C').toFixed(0))
            try{

                const {data} = await axios.get(url)
                console.log("data", data);
                const daysAhead = [ 1 , 2, 3 , 4,5]

                const days = daysAhead.map(d => moment().add(d,'d'))
                //Forecast chart
                //{ "dayHour": "Jue 18", "min": 14, "max": 22, },
                const dataAux = days.map(day => {
                    const tempObjArray = data.list.filter(item => {
                        const dayOfYear = moment.unix(item.dt).dayOfYear()
                        return dayOfYear === day.dayOfYear()
                    })

                    const temps = tempObjArray.map(item => item.main.temp)
                    
                    
                    
                    return ({
                        dayHour: day.format('ddd'),
                        min: toCelsius(Math.min(...temps)),
                        max: toCelsius(Math.max(...temps))
                    })
                })
                setData(dataAux)




                //{weekDay:"monday", hour:13, state:"clouds", temperature:25},
                const interval = [4, 8, 12, 16, 20, 24]
                const forecastItemListAux = data.list
                    .filter((item, index) => interval.includes(index))
                    .map(item => {
                        return ({
                            hour:moment.unix(item.dt).hour(),
                            weekDay: moment.unix(item.dt).format('dddd'),
                            state: item.weather[0].main.toLowerCase(),
                            temperature:toCelsius(item.main.temp)
                        })
                    })
                
                console.log("forecastItemListAux",forecastItemListAux)
                setForecastItemList(forecastItemListAux)
                
            }catch(error){
                console.log("error", error)
            }
            
            
        }

        getForecast()

    },[city,countryCode])
   

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
