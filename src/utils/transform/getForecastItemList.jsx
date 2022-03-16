import moment from 'moment'
import { toCelsius } from '..//utils'

const getForecastItemList = (data) => {
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

    return forecastItemListAux
}

export default getForecastItemList;