import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { GLOBALTYPES } from '../redux/actions/globalTypes'
// import { getDataAPI } from '../utils/fetchData'
// import { useSelector, useDispatch } from 'react-redux'
// import { getAllPosts } from '../redux/actions/postAction'


import {VscListSelection} from 'react-icons/vsc'

import useQuery from '../hook/useQuery'

import Pagination from '../components/Browse/Pagination'
import Result from '../components/Browse/Result'
import Sorting from '../components/Browse/Sorting'
import SearchForm from '../components/Browse/SearchForm'
import FilterSort from '../components/Browse/FilterSort'
import Filtering from '../components/Browse/Filtering'


const BrowseJobs = () => {

  const searchBottom = [
    {label: 'Employees', path: '/browseUser'},
    {label: 'Jobs', path: '/browseJobs'}
  ]
  
  const [posts, setPosts] = useState([])
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  
  const [salaryRange, setSalaryRange] = useState([0, 100000])



  const [limit, setLimit] = useState(5)
  const [page, setPage] =  useState(1)
  const [sort, setSort] = useState('')

  
  const [onSelection, setOnSelection] = useState(false)
 
  // const { auth, homePosts }  = useSelector(state => state)
  const dispatch = useDispatch()

  const {data} = useQuery(`/api/allposts?title[regex]=${keyword}&sort=${sort}&${category}&page=${page}&limit=${limit}&salary[gte]=${salaryRange[0]}&salary[lte]=${salaryRange[1]}`)
  useEffect(() => {
    if(data?.posts) setPosts(data.posts)
  }, [data?.posts])

  
  const totalPages = useMemo(() => {
    if (data?.result < limit) return 1
    
    if (!data?.total) return 0

    return Math.ceil(data.total / limit)
    

  }, [data?.result, data?.total, limit])


  useEffect(() => {
    if (onSelection) {
      dispatch({type: GLOBALTYPES.MODAL, payload: true})
    } else {
      dispatch({type: GLOBALTYPES.MODAL, payload: false})
    }
  }, [dispatch, onSelection])

  const handleLimitChange = (e) => {
    setLimit(e.target.value) 
    setPage(1)
  }


  return (
    <section className="browse-container">
      <div className="browse">      
        <div className="breadcrumb"></div>
        <div className="search-bar">

          <div className="search-header">
            <h3>Browse</h3>
          </div>

          <div className="search-body">
            <SearchForm postSearch={keyword} setPostSearch={setKeyword}/>
            <Sorting sort={sort} setSort={setSort}/>

            <div className="list_selection" onClick={() => setOnSelection(true)}>
              <VscListSelection/>
            </div>
            {
              onSelection && 
              <FilterSort
              setOnSelection={setOnSelection}
              sort={sort} setSort={setSort}
              setCategory={setCategory}
              salaryRange={salaryRange} setSalaryRange={setSalaryRange}
              />
            }

          </div>
          
          <div className="search-footer">
            <nav className="navbar navbar-expand-sm">
                  <div className="container"> 
                      <ul className="navbar-nav flex-row mb-0">
                          {   
                              searchBottom.map((link, index) => (
                                  <li className="nav-item" key={index}>
                                      <Link className="nav-link" to={link.path}>
                                          {link.label}
                                      </Link>
                                      
                                  </li>
                              ))
                          }
                      </ul>
                  </div>
              </nav>
          </div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-content-container">
          <div className="search-content">

            <div className="filter-container">
              <Filtering setCategory={setCategory} salaryRange={salaryRange} setSalaryRange={setSalaryRange} />
            </div>

            <div className="result-container">
              <div className="result-header">
                <div className="limit" >
                  <span style={{marginRight: "10px"}}>Limit: </span>
                  <select value={limit} onChange={handleLimitChange} className="form-select">
                      <option defaultValue="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      
                  </select>

                </div>
                <Pagination totalPages={totalPages} page={page} setPage={setPage} limit={limit}/>
                
              </div>
              
              <div className="result-list" style={{minHeight: "1600px"}}>
                <Result posts={posts} />
              </div>
              
              <Pagination totalPages={totalPages} page={page} setPage={setPage} limit={limit}/>
                            
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default BrowseJobs