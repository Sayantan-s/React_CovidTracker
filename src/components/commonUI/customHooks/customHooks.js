import React, { useState } from 'react'


export const useWindowResize = () => {
    const [resize,setSize] = useState([window.innerWidth,window.innerHeight]);
    const resizeHandler = () => {
        setSize(
            [window.innerWidth,window.innerHeight]
        )
    }
    React.useEffect(() => {
        window.addEventListener('resize',resizeHandler);
        return _ => {
            window.removeEventListener('resize',resizeHandler);
        }
    },[])

    return resize;
}


/*export const useFetch = (url,options) => {
    const [response,setResp] = React.useState([]);
    const [error,setErr] = React.useState('');
    React.useEffect(() => {
        (async() =>{
          try{
            const resp = await fetch(url,options);
            const respJSON = await resp.json();
            setResp(respJSON);
          }
          catch(error){
              setErr(error)
          }
        })();
    },[url,options])
    return {
        response,
        error
    }
}*/


export const useAxFetch = (AxURL,urlextention) => {
    const [resp,setResp] = React.useState([]);
    const [err,setErr] = React.useState('');
    const [loading,setLoading] = React.useState(false);
    React.useEffect(() => {
        setLoading(true)
        AxURL(urlextention)
        .then(resp => {
            setLoading(false)
            setResp(resp.data)
        })
        .catch(err => {
            setErr(err)
        })
    },[AxURL,urlextention])
    return {
        resp,
        err,
        loading
    }
}