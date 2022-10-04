import React,{ useMemo, useState } from 'react'
//alias: "as Router"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from 'react-router-dom'
import CityPage from './pages/CityPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import WelcomePage from './pages/WelcomePage'
import Typography from '@material-ui/core/Typography'




const App = () => {
    const [allWeather, setAllWeather]   = useState({})
    
    const onSetAllWeather =useMemo(() =>  ((weatherAux) => {
        setAllWeather(allWeather => {
            return ({ ...allWeather, ...weatherAux})
        })
    }),[setAllWeather])
    //Switch Evalua las condiciones de arriba a abajo
    // Por lo tanto va a mostrar la ruta que mas se asemeje al path ingresado
    //Usamos el exact en la vista Welcome para de esta forma evaluar que siempre
    //tiene que ser si o si igual a esa condicion "/"
    //Sino la utilizara, siempre que ingrese "/main" o "/city"
    //va a mostrar welcome porque al empezar con "/" es la que mas
    //se asemeja a la primer condicion
    return(
            <Router>
                
                <Switch>

                    <Route exact path="/">
                        <WelcomePage />
                    </Route>

                    <Route path="/main">
                        <MainPage allWeather={allWeather} onSetAllWeather={onSetAllWeather} />
                    </Route>

                    <Route path="/city/:countryCode/:city">
                        <CityPage allWeather={allWeather} onSetAllWeather={onSetAllWeather} />
                    </Route>

                    <Route>
                        <NotFoundPage />
                    </Route>
                </Switch>
            </Router>

    )
    
}

export default App;
