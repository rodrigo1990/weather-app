import React from 'react'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'
import CityInfo from './CityInfo' //subjet under testing


test("CityInfo-render", async () => {
    //AAA
    //Arrange
    //Act
    //Assert

    const city = "Buenos Aires"
    const country = "Argentina"
    
    //Renderiza el componente y retorna una serie de funciones de gran utilidad
    //En este caso utilizamos "findAllByRole" para consultar a nuestro componente  
    //Vamos a analizar su estado en el Assert

    //Arrange
    const {findAllByRole} = render(<CityInfo city={city} country={country}/>)
    

    //findAllByRole nos va a buscar en este caso todos los componentes que sean heading (h1,h2,h3, etc.)
    //El resultado es un array de componentes 

    //Act
    const cityAndCountryComponents = await findAllByRole("heading")


    //cuando el test va a ser correct ?
    //Definicion
    //Cuando en el primer elemento (heading) se encuentre la ciudad "Buenos Aires"
    //y cuando en el segundo se encuentre el pais "Argentina"
    //assert
    expect(cityAndCountryComponents[0]).toHaveTextContent(city)
    expect(cityAndCountryComponents[1]).toHaveTextContent(country)



}) 