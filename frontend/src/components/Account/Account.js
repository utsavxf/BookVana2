import React, { useEffect, useState } from 'react'
import "./Account.css"
import Book from '../Book/Book'
import {useDispatch, useSelector} from "react-redux"
import { deleteMyProfile, getMyPosts, loadUser, logoutUser } from '../../Actions/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader/Loader';
import { Avatar, Button, Dialog, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import User from '../User/User';


const Account = () => {
  

    const dispatch=useDispatch();
   
    const {user,loading:userLoading}=useSelector((state)=>state.user)
    const {loading,error,posts}=useSelector((state)=>state.myPosts)
    const {error:likeError,message,loading:deleteLoading}=useSelector((state)=>state.like)

    
    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);


    const deleteProfileHandler=async()=>{
      console.log('handler is called');
      
      await dispatch(deleteMyProfile());
      dispatch(logoutUser())
    }
     
    const logoutHandler=async()=>{
           await dispatch(logoutUser());
           toast.success("Logged Out Successfully")
    }


    useEffect(() => {
      if (user) {
        dispatch(getMyPosts());
      }
    }, [dispatch, user]);


    useEffect(()=>{
      // console.log(posts);
      
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


    return loading===true || userLoading===true ?(
      <Loader/>
    ) :(
     
      <div className="account">
        <div className="accountleft">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Book
              key={post._id}
              bookId={post._id}
              title={post.title}
              bookImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isDelete={true}
              isAccount={true}
              />
            ))
          ) : (
           <Typography variant="h6">You have not made any post</Typography>
          )
       } 
        </div>
        <div className="accountright">
          <Avatar
            src={user.avatar.url}
            sx={{ height: "8vmax", width: "8vmax" }}
          />
  
          <Typography variant="h5">{user.name}</Typography>
  
          <div>
            <button onClick={()=>setFollowersToggle(!followersToggle)}>
              <Typography>Followers</Typography>
            </button>
            <Typography>{user.followers.length}</Typography>
          </div>
  
          <div>
            <button onClick={()=>setFollowingToggle(!followingToggle)} >
              <Typography>Following</Typography>
            </button>
            <Typography>{user.following.length}</Typography>
          </div>
  
          <div>
            <Typography>Posts</Typography>
            <Typography>{user.books.length}</Typography>
          </div>
  
          <Button variant='contained' onClick={logoutHandler} >
            Logout
          </Button>
  
          <Link to="/update/profile">Edit Profile</Link>
          <Link to="/update/password">Change Password</Link>
  
          <Button
            variant="text"
            style={{ color: "red", margin: "2vmax" }}
            onClick={deleteProfileHandler}
            disabled={deleteLoading}   //as delete hone me time lagega,cloudinary se profile bhi to delete karni hai
          >
            Delete Profile
          </Button>
  
          <Dialog
            open={followersToggle}
            onClose={() => setFollowersToggle(!followersToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Followers</Typography>
  
              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You have no followers
                </Typography>
              )}
            </div>
          </Dialog>
  
          <Dialog
            open={followingToggle}
            onClose={() => setFollowingToggle(!followingToggle)}
          >
            <div className="DialogBox">
              <Typography variant="h4">Following</Typography>
  
              {user && user.following.length > 0 ? (
                user.following.map((follow) => (
                  <User
                    key={follow._id}
                    userId={follow._id}
                    name={follow.name}
                    avatar={follow.avatar.url}
                  />
                ))
              ) : (
                <Typography style={{ margin: "2vmax" }}>
                  You're not following anyone
                </Typography>
              )}
            </div>
          </Dialog>
        </div>
         <ToastContainer />
      </div>
    );
  };
export default Account
