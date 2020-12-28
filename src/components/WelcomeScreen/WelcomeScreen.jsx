import React, {useRef, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Clouds from 'vanta/dist/vanta.clouds.min'
import * as THREE from 'three'

const WelcomeScreen = ({ children }) => {
  
    const myRefDiv = useRef(null)//valor incial
    const [vanta, setVanta] = useState(0)//vanta a va ser incializado en 0
    //En la primer renderziacion "myRefDiv.current" es igual a nulo, el valor inicial
    console.log("myRefDiv.current", myRefDiv.current)

    useEffect (()=>{
        console.log("myRefDiv.current (en useEffect )", myRefDiv.current)

        //solamente pase una sola vez por dentro del if
        //Si vanta es igual a false, LO MISMO
        if( !vanta ){
            //SOLO PASA UNA VEZ
            //donde vamos a ahcer la inicializacion del componente
            //activo el efecto de clouds sobre el div referenciado
            //ESTAMOS MODIFICANDO EL ESTADO CON ESTA LINEA
            setVanta(Clouds({
                THREE,
                el:myRefDiv.current
            }))
            console.log("establezco vanta en un valor diferente de 0")
        }
        // al salir de la pantalla vamos a detener el efecto
        //y desasociar todos los recursos (div + vanta effect)

        return () => {
            //dentro de esta se va a realizar la tarea de destruir todos los recursos
            //tomados por vanta

            if(vanta){
                vanta.destroy()
                console.log("libero los recursos")
            }
        }


    }, [vanta]) //vanta es en este caso la dependencia actualizada
                // de esta manera me aseguro un funcionamiento
                //correcto de la aplicacion


    return (
        <div className="full" ref={myRefDiv}>
            {children}
        </div>
    )
}

WelcomeScreen.propTypes = {
    children: PropTypes.node,
}

export default WelcomeScreen
