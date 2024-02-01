import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { fetchContent } from '../../utils/tmdb';
import { fetchGenres } from '../../utils/tmdb';
import { useDispatch, useSelector } from 'react-redux';

const Filter = ({ genre,setGenre }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState([]);
  const { genres } = useSelector((state) => state.content);

  const fetchGenresData=async()=>{
    let promises=[]
    let categories=['tv','movie']
    let allGenres={}
  
    categories.forEach(async(category)=>{
      promises.push(fetchContent(`/genre/${category}/list`))
    })
  
    const response=await Promise.all(promises);
    console.log(response)
    response.map(({genres})=>{
      return genres.map((genre)=>(allGenres[genre.id]=genre))
    })
  
    console.log(allGenres)
    dispatch(fetchGenres(allGenres))
    setOptions(Object.values(allGenres));
  }

  useEffect(()=>{
    fetchGenresData()
  },[dispatch])
  const onChange = (selectedItems) => {
    setGenre(selectedItems);
  };
 
  return (
    <Select
    isMulti
      name="genres"
      value={genre}
      closeMenuOnSelect={false}
      options={options}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      onChange={onChange}
      placeholder="Select genres"
      className="react-select-container genresDD"
      classNamePrefix="react-select"
/>
  )
}

export default Filter

