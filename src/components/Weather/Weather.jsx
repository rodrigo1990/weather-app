import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Skeleton from '@mui/material/Skeleton';
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
                justifyContent="center">
                <IconContext.Provider value={{ size:'4em' }}>
                    {
                        state ? 
                        <IconState state={state} />
                        :
                        <Skeleton variant='circular' height={80} width={80}></Skeleton>

                    }
                    {
                        temperature ? 
                        <Typography display="inline" variant="h2">{temperature}°</Typography>
                        :
                        <Skeleton variant='rectangular' height={80} width={80}> </Skeleton>
                    }
                    

                </IconContext.Provider>
            </Grid>
        </div>
    )
}

Weather.propTypes = {
    temperature:PropTypes.number,
    state: PropTypes.oneOf(validValues)
    }

export default Weather
