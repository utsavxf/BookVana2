import React ,{ useEffect } from 'react'
import "./Slide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from '@mui/material'
import Book from '../Book/Book'
import Slider from '@mui/material/Slider';
// import { products } from './productdata';
import { Divider } from '@mui/material';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../Actions/User';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slide = ({books}) => {
//  const dispatch=useDispatch();
//  const { loading, posts:books, error } = useSelector((state) => state.allPosts)

 
//  useEffect(() => {

//     // console.log(books);
    
//     dispatch(getAllPosts());



//   }, [dispatch])
const [sliderValue, setSliderValue] = React.useState(30); // Initial value for the slider

const handleSliderChange = (event, newValue) => {
  setSliderValue(newValue); // Update the slider value when it changes
};

    return (
        <div className="products_section">
        {/* ... other content ... */}
        <div className="slider-container">
          <Typography id="slider-label" gutterBottom>
            Adjust Slider Value
          </Typography>
          <Slider
            value={sliderValue}
            onChange={handleSliderChange}
            aria-labelledby="slider-label"
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />
          <Typography>Slider Value: {sliderValue}</Typography>
        </div>
  
        {/* Render Book components based on books */}
        {books && books.length > 0 ? (
          books.map((book) => (
            <Book
              key={book._id}
              // Pass book details as props to the Book component
              // ... other book details
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
    )
}

export default Slide
