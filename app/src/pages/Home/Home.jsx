import React, { useEffect } from 'react'
import './home.css'
import Navbar from '../../components/NavBar/NavBar'
import {fetchContent} from '../../utils/tmdb'
import {fetchUrl,fetchGenres} from '../../redux/content/contentSlice'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../../components/Banner/Banner'
import SliderContainer from '../../components/sliderContainer/SliderContainer'



const Home = () => {

  // const dispatch=useDispatch()

  // const {url} =useSelector((state)=>state.content)
  // console.log(url)

 

  // const fetchConfig = async () => {
  //   try {
  //     const res = await fetchContent('/configuration');
  //     const imageUrls = {
  //       backdrop: res.images.secure_base_url + 'original',
  //       poster: res.images.secure_base_url + 'original',
  //       profile: res.images.secure_base_url + 'original',
  //     };
  //     dispatch(fetchUrl(imageUrls));
  //     console.log(res);
  //   } catch (error) {
  //     console.error('Error fetching configuration:', error);
  //   }
  // };




  // const fetchGenresData=async()=>{
  //   let promises=[]
  //   let categories=['tv','movie']
  //   let allGenres={}

  //   categories.forEach(async(category)=>{
  //     promises.push(fetchContent(`/genre/${category}/list`))
  //   })

  //   const response=await Promise.all(promises);
  //   console.log(response)
  //   response.map(({genres})=>{
  //     return genres.map((genre)=>(allGenres[genre.id]=genre))
  //   })

  //   console.log(response)
  //   dispatch(fetchGenres(response))

  // }

  // useEffect(() => {
  //   fetchConfig();
  //   fetchGenresData()
  // }, [dispatch]);

 

  return (
    <div className='home'>
      <header>
      <Navbar/>
      </header>
      <main>
       <Banner/>
       <SliderContainer/>
      </main>
    </div>
  )
}

export default Home
