import React from 'react'
import Select from "react-select";

const Sort = ({ value, onChange }) => {
    const sortByData=[
        
            { 
                value: "popularity.desc", 
                title: "Most Popular" 
            },
            {
                value: "vote_average.desc", 
                title: "Top Rated"
            },
            {
                value: "primary_release_date.desc",
                title: "New Releases", 
            },
            { 
                value: "original_title.asc", 
                title: "Title (A-Z)"
            }
        
    ]
  return (
    <div>
       <Select
      name="sortby"
      value={value}
      options={sortByData}
      onChange={onChange}
      isClearable={true}
      placeholder="Sort by"
      className="react-select-container sortbyDD"
      classNamePrefix="react-select"
    />
    </div>
  )
}

export default Sort
