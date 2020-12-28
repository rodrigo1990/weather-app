import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

import WeatherDetails from './WeatherDetails'

test ('WeatherDetails Render', async () => {

    const humidity=10
    const wind=5

    const {findByText} = render(<WeatherDetails humidity={humidity} wind={wind} ></WeatherDetails>)

    const WeatherDetailsComponentHumidity = await findByText(/10/)

    expect(WeatherDetailsComponentHumidity).toHaveTextContent("10");

    const WeatherDetailsComponentWind = await findByText(/5/)

    expect(WeatherDetailsComponentWind).toHaveTextContent("5");


})