import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({
    baseUrl:''
})

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User','Rate','Watchlist','WatchHistory'],
    endpoints:(builder)=>({
        
    })
})