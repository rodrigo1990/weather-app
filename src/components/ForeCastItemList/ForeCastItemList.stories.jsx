import React from 'react'
import ForeCastItemList from './ForeCastItemList'
import 'typeface-roboto'

export default {
    title: "ForeCastItemList",
    component: ForeCastItemList
}

const list = [
    {weekDay:"monday", hour:13, state:"clear", temperature:25},
    {weekDay:"tuesday", hour:12, state:"clouds", temperature:5},
    {weekDay:"wednesday", hour:14, state:"clear", temperature:25},
    {weekDay:"thursday", hour:115, state:"clouds", temperature:5},
]
export const ForeCastItemListExample = () => <ForeCastItemList forecastList={list}  />