import Axios from 'axios';


export const covidURL = Axios.create({
    baseURL : `https://api.covid19tracking.narrativa.com/api`
})

export const GlobalUrl = Axios.create({
    baseURL : `https://corona.lmao.ninja/v2`
})
