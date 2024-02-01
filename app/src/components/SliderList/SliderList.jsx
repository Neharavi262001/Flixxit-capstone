import React, { useRef ,useEffect,useState} from 'react'
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa'
import './sliderList.css'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Filter from '../Filter/Filter'


export default React.memo(
    function SliderList({title,endpoint,category}) {
        const [slideNumber,setSlideNumber]=useState(0)
        const [moved,setMoved]=useState(false)
        const listRef = useRef();
        const navigate=useNavigate()

        const handleClick = (action) => {
            setMoved(true)
            let distance = 250;
            //let distance=listRef.current.getBoundingClientRect().x-10
            if (action === 'left' && slideNumber>0) {
              setSlideNumber(slideNumber-1)
              //listRef.current.style.transform = `translateX(${250 + distance}px)`;
            }
        
            if (action === 'right' && slideNumber<4) {
              //listRef.current.style.transform = `translateX(${-250 + distance}px)`;
              setSlideNumber(slideNumber+1)
             
            }
            distance *= slideNumber;

            listRef.current.style.transform = `translateX(${-distance}px)`;
          }

          
          const {url}=useSelector((state)=>state.content)
          const {content,loading}= useFetch(endpoint)
    
        return (
            <div className='movie-list'>
            <span className="list-title">{title}</span>
            <div className="list-wrapper">
              <FaChevronLeft style={{display: !moved && "none" }} className='slider-arrow left-arrow' onClick={()=>handleClick("left")}/>
              <div className="list-container" ref={listRef}>
              {content?.results?.slice(0,10).map((item) => {
                const posterUrl=item.poster_path ? url.poster + item.poster_path : url.backdrop + item.backrop_path
                return (
                  <>
                 
                   <Card 
                      key={item.id} 
                      id={item.id}
                      title={item.title || item.name} 
                      imageUrl={posterUrl} 
                      handleNavigate={()=>navigate(`/${item.media_type || category}/${item.id}`)}
                      itemGenre={item.genre_ids}
                      />

                     
                  </>

                )

              }
              
            )}
                
      
              </div>
              <FaChevronRight className='slider-arrow right-arrow' onClick={()=>handleClick("right")}/>
            </div>
          </div>
        )
      }
)



