import React from 'react'
import PropTypes from 'prop-types'

import {
    WiDayCloudy,
    WiDayFog,
    WiDaySunny,
    WiSnow,
    WiRaindrop,
    WiRain,
    WiThunderstorm} from 'react-icons/wi'
     

const stateByName = {
    clouds: WiDayCloudy,
    fog: WiDayFog,
    clear: WiDaySunny,
    rain: WiRain,
    snow: WiSnow,
    drizzle:WiRaindrop,
    thunderstorm:WiThunderstorm
}

const IconState = ({state}) => {
    const StateByName = stateByName[state] ? stateByName[state] : stateByName['clear']
    return (
        <StateByName />
    )
}

IconState.propTypes = {

}

export default IconState
