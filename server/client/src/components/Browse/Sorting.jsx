import React from 'react'

const Sorting = React.memo(({sort, setSort}) => {

    return (
        <div className="sorting">
            <div className="sorting_header"><h5>Sort By: </h5></div>
            <select className="form-select" value={sort} onChange={e =>  setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="title">Sort A to Z</option>
                <option value="-title">Sort Z to A</option>
                <option value="salary">Salary: Low-High</option>
                <option value="-salary">Salary: High-Low</option>
            </select>

        </div>
  )
})

export default Sorting