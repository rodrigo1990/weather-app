import moment from 'moment'
import { toCelsius } from '..//utils'

const getChartData = (data) => {
    console.log("data", data);
    const daysAhead = [ 1 , 2, 3, 4]//Se puede solucionar de otra manera viendo 294. contemplamos dia sin datos de la temperatura
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

    return dataAux;
}

export default getChartData