import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import {Link as LinkRouter} from 'react-router-dom'
import {IconContext} from 'react-icons'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import {WiDaySunny} from 'react-icons/wi'

//children = palabra reservada, para componentes compuestos (<comp1> <comp2 /> </comp1)
const AppFrame = ({children}) => {
    return (
        <Grid container 
                justify="center">
                    <AppBar position="stasit">
                        <Toolbar variant="dense">
                            <IconButton 
                                    color="inherit"
                                    arial-label="menu">

                                <Link   
                                    component={LinkRouter}
                                    to="/"   
                                    aria-label="menu">

                                    <IconContext.Provider value={{size:"2em"}}>
                                        <WiDaySunny color="white" />
                                    </IconContext.Provider>

                                </Link>
                                
                            </IconButton>
                            <Typography 
                                    variant="h6"
                                    color="inherit">
                                Weather App
                            </Typography>
                        </Toolbar>
                    </AppBar>


            <Grid   item
                    xs={12}
                    sm={11}
                    md={10}
                    lg={8}>

                {children}
            
            </Grid>
            
        </Grid>
    )
}

AppFrame.propTypes = {
    children:PropTypes.node
}

export default AppFrame
