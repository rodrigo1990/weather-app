import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getForecastrUrl } from '../utils/urls'
import getChartData from '../utils/transform/getChartData'
import 'moment/locale/es'
import getForecastItemList from '../utils/transform/getForecastItemList'


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

                setForecastItemList( getForecastItemList( data) )
                
            }catch(error){
                console.log("error", error)
            }
            
            
        }

        getForecast()

    },[city,countryCode])

    return {city,chartData,forecastItemList}
}


export default useCityPage;