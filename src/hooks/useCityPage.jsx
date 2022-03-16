import {useState, useEffect} from 'react'
import axios from 'axios'
import convertUnits from 'convert-units/lib'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import 'moment/locale/es'


const useCityPage = () => {

    const [chartData, setChartData] = useState(null)
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
                const daysAhead = [ 1 , 2, 3, 4, 5]//Se puede solucionar de otra manera viendo 294. contemplamos dia sin datos de la temperatura

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
                setChartData(dataAux)




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