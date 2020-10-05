import Axios from "axios";
export const GlobeInfo = Axios.create({
    baseURL : `https://corona.lmao.ninja/v2`
});

export const CovUrl = Axios.create({
    baseURL : `https://api.covid19tracking.narrativa.com/api`
})
export const PlotURl = Axios.create({
    baseURL : `https://www.trackcorona.live/api`
})
export const FirebasePost = Axios.create({
    baseURL : `https://corona-tracker-7af4e.firebaseio.com/`
})

export const GlobeV3URL = Axios.create({
    baseURL : `https://disease.sh/v3/covid-19/`
})

export const date = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getUTCDate()}`


export const newURL = (params,moreParams) => `https://disease.sh/v3/covid-19/${params}/${moreParams}`

//https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&sort=cases&allowNull=false

//https://disease.sh/v3/covid-19/historical/all?lastdays=30