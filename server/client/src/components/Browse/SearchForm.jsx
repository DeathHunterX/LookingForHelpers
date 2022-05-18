import React from 'react'
// import useCustomRoute from '../../hook/useCustomRoute'

import { FaSearch } from 'react-icons/fa'

const SearchForm = ({postSearch, setPostSearch}) => {
    
    return (
        <form className="search_form" style={{width: "100%"}}>  
            <input type="text" name="search" value={postSearch} id="search" title="Enter to search"
            onChange={e => setPostSearch(e.target.value)} />
            <div className="search_icon" style={{opacity: postSearch ? 0 : 0.3}}>
                <span className="material-icons"> <FaSearch /> </span>
                <span>Enter to Search</span>
            </div>

            <div className="close_search" style={{opacity: postSearch.length === 0 ? 0 : 1}}
            onClick={() => setPostSearch('')}>
                &times;
            </div>
            {/* <button>Search</button> */}
        </form>

  )
}

export default SearchForm