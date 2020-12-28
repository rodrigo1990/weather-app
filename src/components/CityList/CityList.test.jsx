import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'


import CityList from './CityList'

const cities = [
    {city:"Buenos Aires",
    country:"Argentina",
    temperature:10,
    state:'sunny'},

    {city:"Formosa",
    country:"Argentina",
    temperature:15,
    state:'cloudy'},

    {city:"Medellin",
    country:"Colombia",
    temperature:5,
    state:'cloudy'},


]
test('CityList render', async() => {

    

    const {findAllByRole} = render(<CityList cities={cities}/>)


    const CityListComponents = await findAllByRole("button")

    expect(CityListComponents).toHaveLength(3)



})

test("CityList click on item", async () => {
    //debemos simular una accion del usuario: click sobre un item
    //para eso vamos a utulizar una funcion "mock"

    const fnClickOnItem = jest.fn()

    const {findAllByRole} = render(<CityList cities={cities} onClickCity={fnClickOnItem}/>)

    const items = await findAllByRole("button")

    //Ahora, para simular la accion, vamos a utilizar fireEvent
    //fireEvent es par de la libreria testing-Library/react
    fireEvent.click(items[0])

    //¿Ahora que tuvo que suceder?
    //Se debio llamar al afuncion fnCclickOnItem UNA unica vez

    expect(fnClickOnItem).toHaveBeenCalledTimes(1)
})