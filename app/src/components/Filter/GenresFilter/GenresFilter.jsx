import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { fetchContent,fetchGenres } from '../../../utils/tmdb';
import { useDispatch, useSelector } from 'react-redux';

const GenresFilter = () => {
    const dispatch = useDispatch();
    const { genres } = useSelector((state) => state.content);
    const [selectedGenre, setSelectedGenre] = useState(null);
  
    const fetchGenresData = async () => {
      try {
        const categories = ['tv', 'movie'];
        let allGenres = {};
  
        const promises = categories.map(async (category) => {
          const response = await fetchContent(`/genre/${category}/list`);
          return response.genres;
        });
  
        const genresArrays = await Promise.all(promises);
        genresArrays.forEach((genres) => {
          allGenres = Object.assign(allGenres, genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre }), {}));
        });
  
        dispatch(fetchGenres(allGenres));
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
  
    useEffect(() => {
      fetchGenresData();
    }, [dispatch,genres]);
  
    const handleGenreChange = (selectedOption) => {
      setSelectedGenre(selectedOption);
      onChange(selectedOption, { name: "genre" });
      // Dispatch an action to filter movies based on the selected genre if needed
      // You can use the selectedOption value to filter your movie list
    };
  
    const options = Object.values(genres).map((genre) => ({
      value: genre.id,
      label: genre.name,
    }));
  return (
    <div>
       <Select
        value={selectedGenre}
        onChange={handleGenreChange}
        options={options}
        isClearable
        placeholder="Select a genre..."
        className="react-select-container genreDD"
        classNamePrefix="react-select"
      />
    
      
    </div>
  )
}

export default GenresFilter

