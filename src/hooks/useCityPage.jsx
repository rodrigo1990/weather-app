import {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { getForecastrUrl } from '../utils/urls'
import { toCelsius } from '../utils/utils'
import getChartData from '../utils/transform/getChartData'
import 'moment/locale/es'


const useCityPage = () => {

    const [chartData, setChartData] = useState(null)
    const [forecastItemList, setForecastItemList] = useState(null)


    const {city, countryCode} = useParams()

    console.log("city param", city)
    console.log("countyCode param", countryCode)

    useEffect( () => {

        const getForecast = async () => {
            
            const url = getForecastrUrl({city, countryCode}) 
                        
            try{

                const {data} = await axios.get(url)
                
                setChartData ( getChartData( data ) )




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

    return {city,chartData,forecastItemList}
}


export default useCityPage;