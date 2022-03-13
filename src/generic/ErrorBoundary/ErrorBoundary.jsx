import React, {Component} from "react";

class ErrorBoundary extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            activo: false
        }
    }
    
    estaActivo = () => {
       // return this.props.activo ? "Activo" : "No activo"
    }
    
    render(){// metodo sin parametros
        return (
            <h1> 
                ErrorBoundary {this.props.saludo}
                {
                    this.estaActivo()
                }        
            </h1>
        )
    }
}


export default ErrorBoundary