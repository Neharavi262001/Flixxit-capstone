import React from 'react';
import { useSelector } from 'react-redux';

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.content);

  return (
    <div>
      {data?.map((genre) => {
        const genreName = genres[genre]?.name;
        if (genreName) {
          return (
            <span key={genre} className="genre">
              {genreName}
            </span>
          );
        }
        return null; // Skip rendering if genre name is not available
      })}
    </div>
  );
};

export default Genres;
