import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Weather from './Weather'


import {render} from '@testing-library/react'


test('Weather Render Sunny', async () => {

    const temperature=10

    const {findByRole} = render(<Weather temperature={temperature} state="clear"></Weather>)

    const temperatureComponent = await findByRole("heading")

    expect(temperatureComponent).toHaveTextContent(temperature)



}

)
