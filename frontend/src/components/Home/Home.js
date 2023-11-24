import React, { useEffect } from 'react'
import "./Home.css"
import User from '../User/User'
import Book from '../Book/Book'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'


const Home = () => {


  //get followingPosts
  const dispatch = useDispatch();

   const {user}=useSelector((state)=>state.user)

  const { error:likeError,message } = useSelector((state) => state.like);//for alert

  const { loading, books, error } = useSelector((state) => state.postOfFollowing)

  const { users, loading: usersLoading } = useSelector((state) => state.allUsers)


  useEffect(()=>{
    console.log(user.avatar.url);
    // console.log(books);
    
    
    if(likeError){
      toast.error("Error",{
        position:"bottom-center",
    })
    dispatch({type:"clearErrors"})
    }

   if(message){
    toast.success(`${message}`,{
      position:"bottom-center",
  })
  dispatch({type:"clearMessage"})
   }


},[error,message,likeError,dispatch]) 


  useEffect(() => {

    // console.log(books);
    
    dispatch(getFollowingPosts());
    dispatch(getAllUsers())



  }, [dispatch])




  return (
    loading === true || usersLoading === true ? <Loader /> : (
      <div className='home'>
        <div className="homeleft">

          {books && books.length > 0 ? (
            books.map((book) => (
              <Book
                key={book._id}
                bookId={book._id}
                title={book.title}
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
        <div className="homeright">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url} //maybe abhi bakiyo ke avatar nahi hai isiliye error aa raha hai
              />
            ))
          ) : (
            <Typography>No Users Yet</Typography>
          )}
        </div>
        <ToastContainer />
      </div>
      
    )
  )
}

export default Home
