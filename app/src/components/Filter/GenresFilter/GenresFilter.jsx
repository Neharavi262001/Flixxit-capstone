import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { fetchContent,fetchGenres } from '../../../utils/tmdb';
import { useDispatch, useSelector } from 'react-redux';

const GenresFilter = () => {
    const dispatch = useDispatch();
  const [options, setOptions] = useState([]);

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
      setOptions(Object.values(allGenres));
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenresData();
  }, [dispatch]);
      
      const onChange = (selectedItems) => {
        setGenre(selectedItems);
      };
  return (
    <div>
        genres
      
    </div>
  )
}

export default GenresFilter

