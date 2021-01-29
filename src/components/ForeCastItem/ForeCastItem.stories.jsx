import React from 'react'
import ForeCastItem from './ForeCastItem'

export default {
    title:"ForeCasteItem",
    component: ForeCastItem
}

export const lunesSoleado = () => (
    <ForeCastItem hour={10} state="clear" temperature={23} weekDay="Lunes" />
)