import React from 'react'
import '@testing-library/jest-dom'
import {findAllByAltText, render} from '@testing-library/react'
import ForeCastItem from './ForeCastItem'

test('ForeCastItem render', async () => {
    
    //Tarea, se deben renderizar los diferentes textos
    const weekDay = "monday"
    const hour = 2
    const state = "clear"
    const temperature = 20

    const {findByText} = render(<ForeCastItem 
                                    weekDay = {weekDay}
                                    hour = {hour}  
                                    state = {state}
                                    temperature={temperature} />)

    const ForeCastItemComponents = await findByText(/monday/)

    expect(ForeCastItemComponents).toHaveTextContent("monday")
    

})