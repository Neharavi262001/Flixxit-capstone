import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import'./login.css'
import navLogo from '../../images/flixxit_logo.png'

import { setCredentials } from '../../redux/auth/authSlice'
import { useLoginMutation } from '../../redux/user/userApiSlice'

const Login = () => {
    const [formData,setFormData]=useState({
        email:'',
        password:''
        
    })
    const {email,password}=formData

    const navigate=useNavigate()
    const dispatch =useDispatch()

    const [login,{isLoading,error}]=useLoginMutation()

    const {userInfo}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if (userInfo){
            navigate('/')
        }
    },[navigate,userInfo])

    const handleOnChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await login(formData).unwrap()
            dispatch(setCredentials({...response}))
            
            navigate('/')
        } catch (err) {
            toast(err.data?.message || err.error);
        }
    }
  return (
    <div className='login'>
    <div className="nav-top">
      <img src={ navLogo || "https://app.gemoo.com/share/image-annotation/604743199318691840?codeId=vzxlEYOROQBX9&origin=imageurlgenerator&card=604743196353318912"} alt="logo" width='150px' height='35px' />
          <button className='signin-btn btn-block'>Register</button>
      </div>
      <div className="login-container">
          <div className="heading">
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
         
      </div>
      <div className="form">
          <div className="form-group">
          <p>Sign in to start watching</p>
          </div>
      
          <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <input 
                      type="email"
                      className='form-control'
                      id='email'
                      name='email'
                      value={email}
                      placeholder='Enter your email address'
                      onChange={handleOnChange} />
              </div>
              <div className="form-group">
                  <input type="password"
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter your password'
                  onChange={handleOnChange} />
              </div>
            {isLoading && <h3>Loading....Please wait !</h3>}
              <div className="form-group">
                  <p> Doesn't have an account ? <Link to='/register'>Register</Link></p>
                  <button className="btn-block">Sign in</button>
              </div>
          </form>
      </div>
          
      </div>
  </div>
  )
}

export default Login
