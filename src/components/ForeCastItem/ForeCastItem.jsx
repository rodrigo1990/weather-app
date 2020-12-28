import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconState from './../IconState'

     
import {IconContext} from 'react-icons'


const ForeCastItem = ({weekDay, hour, state, temperature}) => {
    return (
        <div>
            <Grid
                container
                direction="column"
                alignItems="center">
                    <Grid item>
                        <Typography>{weekDay}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{hour}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>
                            <IconContext.Provider value={{ size:'4em' }}>
                                <IconState state={state} />

                            </IconContext.Provider>

                        </Typography>

                    </Grid>
                    <Grid item>
                        <Typography>{temperature}°</Typography>
                    </Grid>
            </Grid>
        </div>
    )
}

ForeCastItem.propTypes = {
    weekDay:PropTypes.string.isRequired,
    hour:PropTypes.number.isRequired,
    temperature:PropTypes.number.isRequired
}

export default ForeCastItem
