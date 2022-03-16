const cities = [
    {city:"Buenos Aires", country:"Argentina", countryCode: "AR"},
    {city:"Formosa", country:"Argentina", countryCode: "AR"},
    {city:"Medellin", country:"Colombia", countryCode:"CO"},
]

export const getCities = () => {
    return cities
}

export const getCountryNameByCountryCode = (countryCode) =>
    cities.filter( c => c.countryCode === countryCode )[0].country