import React from 'react'
import SliderList from '../../components/SliderList/SliderList'

const Series = () => {
  return (
    <div className='movies-container'>
        <SliderList  title='Trending series' endpoint='/trending/tv/week'/>
        <SliderList  title='Popular series' endpoint='/tv/popular'/>
        <SliderList title='Top Rated TV Series' endpoint='/tv/top_rated' />

    </div>
  )
}

export default Series
