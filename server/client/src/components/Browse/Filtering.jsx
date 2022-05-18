import React, { useState } from 'react'

// import { FaSearch } from 'react-icons/fa'

import  {Slider, TextField} from '@mui/material'

const Filtering = ({setCategory, salaryRange, setSalaryRange}) => {

  const sliderMax = 100000

  const [checked, setChecked] = useState(false)
  // const [skillSearch, setSkillSearch] = useState('')

  const jobTypeList = [
    'Part-time Job', 'Fulltime Job', 'Work From Home', 'Company', 'Other'
  ]

  const handleChange = () => { 
    setChecked(!checked); 
  }; 

  const handlePriceInputChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...salaryRange];
      newRange[0] = Number(e.target.value);

      setSalaryRange(newRange);
    }

    if (type === "upper") {
      newRange = [...salaryRange];
      newRange[1] = Number(e.target.value);

      setSalaryRange(newRange);
    }
  };


  const handleClose =  ()  => {
    setCategory('')
    // setSkillSearch('')
    setSalaryRange([0, 100000])
  }

  return (
    <div className="filter-card">
      <div className="filter-header" style={{marginBottom: '25px'}}><h4>Filter by:</h4></div>
      <div className="filter-body">
      <form>
        <p>Job Type</p>
        
        { 
          jobTypeList.map((jobs, index) => (
            <div className="form-check" key={index}>
              <input className="form-check-input" type="checkbox" id="defaultCheck1" 
              value={`jobType=${jobs}`} onChange={e => handleChange(checked ? setCategory('') : setCategory(e.target.value))} />
              <label className="form-check-label" htmlFor="defaultCheck1" >
                {jobs}
              </label>
            </div>
          ))
        }
        

        <hr />
        <p>Salary rate</p>
        <div className="salary-filter" style={{padding: "0 10px 25px"}}>
          <Slider
            min={0}
            max={sliderMax}
            value={salaryRange}
            valueLabelDisplay="auto"
            onChange={e => setSalaryRange(e.target.value)}
            
          />
          <div className="hourly-form">
            <TextField size="small" id="lower" label="Min Price" variant="outlined" type="number" 
            value={salaryRange[0]}
            onChange={e => handlePriceInputChange(e, "lower")}/>

            <TextField size="small" id="upper" label="Max Price" variant="outlined" type="number" 
            value={salaryRange[1]}
            onChange={e => handlePriceInputChange(e, "upper")}/>
          </div>
          
        </div>
        <span style={{cursor: "pointer"}} onClick={handleClose}>Clear All</span>
        

        <hr />
        {/* <p>Skills</p>
        <input type="text" name="skillSearch" value={skillSearch} id="skillSearch"
          onChange={e => setSkillSearch(e.target.value.toLowerCase())} />
          <div className="search_icon" style={{opacity: skillSearch ? 0 : 0.3}}>
              <span className="material-icons"> <FaSearch /> </span>
              <span>Enter to Search</span>
          </div>

          <div className="close_search" style={{opacity: skillSearch.length === 0 ? 0 : 1}}
          onClick={handleClose}>
            &times;
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Default checkbox
          </label>
        </div>
        <hr /> */}
        
      </form>
      
    </div>
    </div>
    
  )
}

export default Filtering