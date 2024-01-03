import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./Book4.css"

const Book4 = ({bookId,title,bookImage}) => {
    
  
  return (
    <Link to={`/book/${bookId}`} className='searchBook'>
      <img src={bookImage} alt={title} />
      <Typography>{title}</Typography>
    </Link>
  )
}

export default Book4
