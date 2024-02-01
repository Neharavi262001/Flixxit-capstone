import {fetchContent} from '../utils/tmdb'

import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [content,setContent]=useState(null)
    const [loading,setLoading]=useState(null)
    const [error,setError]=useState(null)

    useEffect(()=>{
        setLoading('Loading ....')
        setContent(null)
        setError(null)

        fetchContent(url)
        .then((response)=>{
           
            setContent(response)
            setLoading(null)
        })
        .catch(
            (err)=>{
               
                setError('Something went wrong')
                setLoading(null)
            }
        )
    },[url])
  return {content,error,loading}
   
}
export default useFetch
