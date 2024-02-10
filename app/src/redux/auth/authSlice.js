import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
    //token: localStorage.getItem("token") || null,
    
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo=action.payload
            state.token = action.payload
            localStorage.setItem('userInfo',JSON.stringify(action.payload))
            //localStorage.setItem("token", action.payload.token);
        },
        clearCredentials:(state,action)=>{
            state.userInfo=null,
            state.token = null
            localStorage.removeItem('userInfo')
            //localStorage.removeItem("token");
        },
    }
})

export const {setCredentials,clearCredentials } =authSlice.actions
export default authSlice.reducer