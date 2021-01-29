import React from 'react'
import CityList from './CityList'
import 'typeface-roboto'
import { action } from '@storybook/addon-actions'

export default {
    title: "CityList",
    component: CityList
}

const cities = [
    {city:"Buenos Aires",
    country:"Argentina",
    temperature:10,
    state:'clear'},

    {city:"Formosa",
    country:"Argentina",
    temperature:15,
    state:'clouds'},

    {city:"Medellin",
    country:"Colombia",
    temperature:5,
    state:'clouds'},


]
export const CityListExample = () => <CityList cities={cities} onClickCity={action('Click en city')} />