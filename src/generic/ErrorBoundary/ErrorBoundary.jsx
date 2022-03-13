import React, {Component} from "react";

class ErrorBoundary extends Component {
    render(){// metodo sin parametros
        return <h1>ErrorBoundary {this.props.saludo}</h1>
    }
}


export default ErrorBoundary