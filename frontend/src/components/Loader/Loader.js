import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import "./Loader.css"

const Loader = () => {
  return (
    <div className="circle">
                  <CircularProgress />
                  <h2> Loading....</h2>
               </div>
  )
}

export default Loader
