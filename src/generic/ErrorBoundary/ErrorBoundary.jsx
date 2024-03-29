import React, {Component} from "react";

class ErrorBoundary extends Component {
    
    
    constructor(props){
        super(props)
        this.state = {
            hasError: false
        }
    }

    // this.setState( getDerivedStateFromError( error ) )
    static getDerivedStateFromError( error ) {
        
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log("Error", info)
    }
    
    
    
    render(){// metodo sin parametros
        return (
            this.state.hasError ? 
                (<h1>Hubo un error</h1>)
            :
               ( this.props.children)
        )
    }
}


export default ErrorBoundary