import { Button, Typography } from "@mui/material";
// import Form from 'react-bootsrap/Form'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers, getFollowingPosts, getMyPosts, getUserPosts } from "../../Actions/User";
import User from "../User/User";
import Book1 from "../Book1/Book1";
import "./SearchBook.css";
import Book4 from "../Book4/Book4";
import Loader from "../Loader/Loader";
import Transition from "../Transition";

const SearchBook = () => {
  const [name, setName] = useState("");

  const { posts, loading } = useSelector((state) => state.allPosts);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState("")
  const [binding, setBinding] = useState("")
  const [priceRange, setPriceRange] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
    ;



  const handleSearch = (query) => {
    setName(query); // Update the search query state


    // Filter posts based on the title
    const filtered = posts.filter(
      (post) => post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered); // Update filteredPosts state with the filtered data
  };

  const getPostsByCategory = (category) => {
    const isChecked = filteredPosts.includes(category); // Check if the category is already in the filter
  
    let updatedFilter = [...filteredPosts]; // Create a copy of the current filtered posts
  
    if (isChecked) {
      updatedFilter = updatedFilter.filter((cat) => cat !== category); // Remove the category from the filter if it's checked
    } else {
      updatedFilter.push(category); // Add the category to the filter if it's unchecked
    }
  
    setFilteredPosts(updatedFilter); // Update the filtered posts state
  };
  
  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllPosts(name))
  }




  // const SearchBookHandler = (query) => {

  //   const filtered = posts.filter((post) =>
  //     post.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredPosts(filtered);
  // };


  




  const clearFilters = () => {
    setName("");
    setCategory("");
    setLanguage("");
    setBinding("");
    setPriceRange(0);
    setFilteredPosts(posts);
  };



  return (
    loading === true ? <Loader /> :
      <div className="searchBookmain">
        <Transition/>
        <div className="sbfirst">
          <input
            type="text"
            value={name}
            placeholder="Name"
            required
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={submitHandler} >
            Search
          </button>
        </div>
        <div className="sbsecond">
          <div className="sbleft1">
            <div className="heading1">Filters</div>
            <hr /> 


            <div className="range-filter">
              <label htmlFor="priceRange" style={{fontSize:'18px',margin:'7px',fontWeight:'bold'}}>Price Range:</label>
              <input
                type="range"
                id="priceRange"
                min="0"
                max="1000"
                step="1"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{width:'80%',position:'relative',left:'15px'}}
              />
              <span id="rangeValue" style={{position:'relative',left:'15px'}}>{priceRange}</span>
              <span style={{position:'absolute', left:"180px" ,top:'230px'}}>1000</span>
            </div>

            <hr /> 
             <span style={{fontSize:'18px',fontWeight:"bold",position:"relative",left:'10px',marginTop:"10px"}}>Category</span>
            <div className="deatailSb">
              {/* category */}
              {['horror', 'thriller', 'romantic', 'crime', 'poetry', 'self-help', 'spiritual', 'magic', 'mystery'].map((category) => (
                <div style={{marginBottom:'10px'}} key={category}>
                  <input
                    type="checkbox"
                    id={category}
                    value={category}
                    onChange={() => getPostsByCategory(category)}
                  />
                  <label style={{fontSize:'18px'}} htmlFor={category}>{category}</label>
                </div>
              ))}
              {/* language */}
              {/* <span style={{fontSize:'18px',fontWeight:"bold",position:"relative",left:'10px',}}>Language</span> */}
              <select style={{fontSize:'16px', position:"relative",top:'10px'}} id="category" value={language} onChange={(e) => setLanguage(e.target.value)} >

                <option value="" style={{ font: 'bold' }}>Select a language</option>
                <option value="english">english</option>
                <option value="hindi">hindi</option>

                {/* Add more options as needed */}
              </select>
              {/* binding*/}
              {/* <span style={{fontSize:'18px',fontWeight:"bold",position:"relative",left:'10px',}}>Binding</span> */}
              <select style={{fontSize:'16px', position:"relative",top:'40px'}} id="category" value={binding} onChange={(e) => setBinding(e.target.value)} >

                <option value="" style={{ font: 'bold' }}>Select the binding</option>
                <option value="hardcover">hardcover</option>
                <option value="softcover">softcover</option>
                <option value="spiralbound">spiralbound</option>

                {/* Add more options as needed */}
              </select>
            </div>
          </div>
          <div className="sbright">
            {(name?filteredPosts:posts)?.length > 0 ? (
              (name?filteredPosts:posts).map((book) => (
                <Book1
                  key={book._id}
                  bookId={book._id}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  price={book.price}
                  category={book.category}
                  language={book.language}
                  binding={book.binding}
                  bookImage={book.image.url}
                  likes={book.likes}
                  comments={book.comments}
                  ownerImage={book.owner.avatar.url}
                  ownerName={book.owner.name}
                  ownerId={book.owner._id}
                />
              ))
            ) : (
              <Typography variant="h6">No posts yet</Typography>
            )}
          </div>
        </div>

      </div>
  );
};

export default SearchBook;
