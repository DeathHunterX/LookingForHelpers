import React from 'react'
import Filtering from './Filtering'
import Sorting from './Sorting'

const FilterSort = ({setOnSelection, sort, setSort, setCategory, salaryRange, setSalaryRange}) => {
  return (
    <div className="filter_sort">
      
      <div className="filter_sort_container">
        <button className="btn btn-danger btn_close"
          onClick={() => setOnSelection(false)}>
              Close
        </button>
        <Sorting sort={sort} setSort={setSort}/>

        <Filtering setCategory={setCategory} salaryRange={salaryRange} setSalaryRange={setSalaryRange} />
      </div>

      

    </div>
  )
}

export default FilterSort