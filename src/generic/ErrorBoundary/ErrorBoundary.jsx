import React, {Component} from "react";

class ErrorBoundary extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            activo: false
        }
    }
    
    estaActivo = () => {
        return this.state.activo ? "Activo" : "No activo"
    }

    onClickHandler = () => {
        //setState
        //this.state.activo = true
        this.setState({activo: !this.state.activo}) // el estado siempre se cambia a travez de setState
    }

    componentDidMount() {
        console.log('El componente se ha montado')
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('estado previo:', prevState.activo)
        console.log('Estado actual: ', this.state.activo)
        console.log('El componente se ha actualizo')
    }

    componentWillUnmount() {
        console.log('El component se ha desmontado')
    }
    
    render(){// metodo sin parametros
        return (
            <div>
                <button onClick={this.onClickHandler}>
                    Activar
                </button>
                <h1> 
                    ErrorBoundary {this.props.saludo}
                    {
                        this.estaActivo()
                    }        
                </h1>
            </div>
            
        )
    }
}


export default ErrorBoundary