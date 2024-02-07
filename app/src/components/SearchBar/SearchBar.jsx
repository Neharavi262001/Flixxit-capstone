import React from 'react'

const SearchBar = () => {
  return (
    
       <div className="search-container">
              
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search..."
                            onChange={(e)=>setQuery(e.target.value)}
                            onKeyUp={handleSearch}
                         />
                    </div>
            
            <div className="search-icon icons">
            
                <FaSearch />
                
            </div>
    </div>
  )
}

export default SearchBar
