import React from 'react'
import WelcomeScreen from './../components/WelcomeScreen'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import {IconContext} from 'react-icons'
import { Link as RouterLink } from 'react-router-dom'
import {WiRain} from 'react-icons/wi'

export const NotFoundPage = () => {
    return (
        <Grid container
        direction="column"
        justifyContent="center"
        className="full">
        
        <div className="highlight">

            <Grid item container xs={12}
            justifyContent="center"
            alignItems="center">

                <Grid item>
                    <IconContext.Provider value={{ size:"6em" }}>
                        <WiRain />
                    </IconContext.Provider>
                </Grid>

                <Grid item 
                        container 
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                    <Typography variantz="h4" color="inherit">
                        La pagina no existe
                    </Typography>
                    <Link color="inherit"
                            aria-label="menu"
                            component={RouterLink}
                            to="/main">
                                Volver a inicio
                    </Link>
                </Grid>
            
            </Grid>

        </div>
    </Grid>
    )
}

export default NotFoundPage