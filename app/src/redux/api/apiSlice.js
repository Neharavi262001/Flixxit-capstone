import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({
    baseUrl:'https://flixxit-backend-x6u9.onrender.com',
    credentials:'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User','Rate','Watchlist','WatchHistory'],
    endpoints:(builder)=>({
        
    })
})