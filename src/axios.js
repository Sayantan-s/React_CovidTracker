import Axios from "axios";

export const GlobeV3URL = Axios.create({
    baseURL : `https://disease.sh/v3/covid-19/`
})

export const date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getUTCDate()}`


//https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=false

//https://disease.sh/v3/covid-19/historical/all?lastdays=30