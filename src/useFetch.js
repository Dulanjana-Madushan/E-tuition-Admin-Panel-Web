import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(url, {signal:abortCont.signal})
            .then(res =>{
                // if(!res.ok){
                //     throw Error('Could not fetch data');
                // }
                return res.json();
            })
            .then(data => {
                if(data['success']){
                    setData(data);
                }else{
                    setError(data['error'])
                }
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === "AbortError"){
                    console.log('Fetch aborted');
                }else{
                    setIsLoading(false);
                    setError(err.message);
                }
            })

            return () => abortCont.abort();

    },[url])

    return {data, isLoading, error}
}

export default useFetch;