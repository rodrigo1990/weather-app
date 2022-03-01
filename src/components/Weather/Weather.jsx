import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import {IconContext} from 'react-icons'
import IconState from './../IconState'


const validValues = [
    "rain",
    "thunderstorm",
    "drizzle",
    "snow",
    "clear",
    "clouds",
    "fog"
]


const Weather = ({ temperature, state }) => {
    return (
        <div>
            <Grid container item
                justify="center">
                <IconContext.Provider value={{ size:'4em' }}>
                    <IconState state={state} />
                    <Typography display="inline" variant="h2">{temperature}</Typography>

                </IconContext.Provider>
            </Grid>
        </div>
    )
}

Weather.propTypes = {
    temperature:PropTypes.number.isRequired,
    state: PropTypes.oneOf(validValues).isRequired
    }

export default Weather
