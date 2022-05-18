import React, { useMemo } from 'react'


const Pagination = React.memo(({totalPages, page, setPage, limit}) => {
  const { firstArr, lastArr } = useMemo(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)

    if(totalPages < 4)
      return {
        firstArr: newArr,
        lastArr: []
      }

    if(totalPages - page >= 4){
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1)
      }
    }else{
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: []
      }
    }
  }, [totalPages, page])
  

  const isActive = (index) => {
    if(index === page) return "active"
    return ""
  }

  const prev = () => {
    const newPage = Math.max(page - 1, 1)
    setPage(newPage)
  }

  const next = () => {
    const newPage = Math.min(page + 1, totalPages)
    setPage(newPage)
  }

  const jump = (num) => {
    setPage(num)
  }

  return (
    <div className='pagination'>

      <button onClick={prev}>&laquo;</button>
      {
        firstArr.map(num => (
          <button key={num} className={`${isActive(num)}`}
          onClick={() => jump(num)}>
            {num}
          </button>
        ))
      }

      { lastArr.length > 0 && <button>...</button> }
      
      {
        lastArr.map(num => (
          <button key={num} className={`${isActive(num)}`}
          onClick={() => jump(num)}>
            {num}
          </button>
        ))
      }

      <button onClick={next}>&raquo;</button>
    </div>
  )
})

export default Pagination