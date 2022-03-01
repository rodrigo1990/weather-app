import React from 'react'
import '@testing-library/jest-dom'
import {findAllByAltText, render} from '@testing-library/react'
import ForeCastItemList from './ForeCastItemList'

const list = [
    {weekDay:"monday", hour:13, state:"clouds", temperature:25},
    {weekDay:"tuesday", hour:12, state:"fog", temperature:5},
    {weekDay:"wednesday", hour:14, state:"clear", temperature:25},
    {weekDay:"thursday", hour:115, state:"drizzle", temperature:5},
]


test('ForeCastItemList render', async() => {

    
    // ¿como encontrar los items ?
    // findAllByTestId nos va apermitir encontrar cada item con esa marca
    const {findAllByTestId} = render(
                            <ForeCastItemList 
                                forecastList={list}/>
                            )


    const forecastItems = await findAllByTestId("forecast-item-container")
    expect(forecastItems).toHaveLength(4)



})