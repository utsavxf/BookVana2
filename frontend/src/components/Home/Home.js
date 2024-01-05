import React, { useEffect } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./Home.css"
import User from '../User/User'
import Book from '../Book/Book'
import Book1 from '../Book1/Book1'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux"
import { getAllPosts, getAllUsers, getFollowingPosts, getRecentlyAddedBook, getTrendingBook } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import Slide from '../Slide/Slide';
import { Link } from 'react-router-dom'
import ImgSlider from '../ImgSlider'
import Banner from './Banner';


const Home = () => {


  //get followingPosts
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  // let peopleIFollow=[]; redundant ,we can straight awayb use the map function on user.following

  const { error: likeError, message } = useSelector((state) => state.like);//for alert

  const { loading, posts: books, error } = useSelector((state) => state.reccentlyAddedPosts)
  const { loading1, posts: bookst, error1 } = useSelector((state) => state.trendingPosts)

  const { users, loading: usersLoading } = useSelector((state) => state.allUsers)

  useEffect(() => {
    console.log(user);
    // peopleIFollow=user.following
    
    console.log(books);



    dispatch(getRecentlyAddedBook());
    dispatch(getTrendingBook());
    dispatch(getAllUsers());



  }, [dispatch])


  useEffect(() => {
    // console.log(user.avatar.url);
    console.log(books);

    toast.success(`${message}`, {
      position: "bottom-center",
    })

    if (likeError) {
      toast.error("Error", {
        position: "bottom-center",
      })
      dispatch({ type: "clearErrors" })
    }

    if (message) {
      // console.log(message);

      toast.success(`${message}`, {
        position: "bottom-center",
      })
      dispatch({ type: "clearMessage" })
    }


  }, [error, message, likeError, dispatch])







  return (
    loading === true || usersLoading === true  ? <Loader /> : (
      <div className='home' >
        <div className="  homeleft dark:bg-darkbg1">
          <Banner/>
          <div style={{marginTop:'20px',height:'370px',}} className="homeleftsection">
            <h1 className='dark:text-darkwhite' >Trending</h1>
            <div className="  showingBooks dark:bg-darkbg1">
              {bookst && bookst.length > 0 ? (


                bookst.map((book) => (
                  <Book1
                    key={book._id}
                    bookId={book._id}
                    title={book.title} author={book.author}
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
          <div className="imagesection flex p-10 h-48 mt-5   ">
             <div className='p-10'>
              <h1>Pass the Story Forward: Donate Books</h1>
              <p style={{fontSize:'20px',marginTop:'10px'}}>Your Books, Their Adventures - Donate!</p>
              <p style={{fontSize:'20px',marginTop:'10px'}} className='ml-18'>A Book Given, A Universe Explored.</p>
             </div>
             <div className='w-full/3'>
             <img className='relative left-40' style={{height:'220px',width:'400px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0pXOJ6jkeiUGz1z8a8LJVZmgrSu8Luzx5YQ&usqp=CAU" alt="" />
             </div>
        
          </div>
          <div style={{marginTop:'20px',height:"370px"}} className="homeleftsection">
            <h1 className='dark:text-darkwhite' >Newly Added</h1>
            <div className="  showingBooks dark:bg-darkbg1">
              {books && books.length > 0 ? (


                books.map((book) => (
                  <Book1
                    key={book._id}
                    bookId={book._id}
                    title={book.title} author={book.author}
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
          <div className="imagesection flex p-10 h-48 mt-5  ">
             <div className='p-10'>
              <h1>Rent & Read Unlimitedly</h1>
              <p style={{fontSize:'20px',marginTop:'10px'}}>Explore a vast collection of books with uninterrupted access.</p>
              <p style={{fontSize:'20px',marginTop:'10px'}} className='ml-18'>Make learning fun and immersive</p>
             </div>
             <div className='w-full/3'>
             <img className='relative left-40' style={{height:'220px',width:'400px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzO4W6dDZEzc2ge8kT53LHhWs3SyWi39RkOA&usqp=CAU" alt="" />
             </div>
        
          </div>
         
          <div style={{marginTop:'20px',height:"370px"}} className="homeleftsection">
            <h1 className='dark:text-darkwhite' >Recommended</h1>
            <div className="  showingBooks dark:bg-darkbg1">
              {books && books.length > 0 ? (


                bookst.map((book) => (
                  <Book1
                    key={book._id}
                    bookId={book._id}
                    title={book.title} author={book.author}
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
        <div className="homeright background2 dark:bg-darkright">
          <div className='' style={{ fontSize: '20px', fontWeight: '800' }}>People You Follow</div>
          {user.following && user.following.length > 0 ? (
            user.following.map((user) => (
            
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url} //maybe abhi bakiyo ke avatar nahi hai isiliye error aa raha hai
              />
            ))
          ) : (
            <Link to={'/searchPerson'} style={{ textDecoration: 'none' }}>
              <Typography className='dark:text-darkwhite' style={{ position: 'relative', top: '50px' }}>Connent with People</Typography>
            </Link>
          )}
        </div>
        <ToastContainer />
      </div>

    )
  )
}

export default Home
