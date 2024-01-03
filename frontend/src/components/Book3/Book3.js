import { Avatar, Button, Typography ,Dialog} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import "./Book3.css"
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { addCommentOnPost, deletePost, likePost } from '../../Actions/Book';
import { getAllPosts, getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post3 = ({bookId,title,author,description,price,category,language,binding,bookImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete,isAccount}) => {
 
  const dispatch=useDispatch();

  const [liked,setLiked]=useState(false)
  const [likesUser,setLikesUser]=useState(false);
  const [commentValue,setCommentValue]=useState("");
  const [commentToggle,setCommentToggle]=useState(false);

  const { user } = useSelector((state) => state.user);

   
  useEffect(() => {
     
    // console.log(comments);
    // console.log(comments[0].user.avatar.url);
    // console.log(likes);
      //  console.log(liked);
       

    likes.forEach((item) => {
      
      if (item._id === user._id) {
        
        setLiked(true);
      }
    });
  }, [likes, user._id]);


  const handleLike=async(e)=>{
    e.preventDefault();
    try {

      setLiked(!liked);
      // Dispatch the likePost action and wait for it to complete
      await dispatch(likePost(bookId));
  

      if(isAccount){
        await dispatch(getMyPosts())
        
      }else{

        // Dispatch the getFollowingPosts action to update the state
        await dispatch(getAllPosts());
      }
      
      // After both actions are completed, set the liked state
      
    } catch (error) {
      console.log(error);
    }
  
  }


  const addCommentHandler=async(e)=>{
    
    // console.log('Comment Added');
    e.preventDefault();//
   await  dispatch(addCommentOnPost(bookId,commentValue))
    setCommentValue("");

    if(isAccount){
      await dispatch(getMyPosts())
      
    }else{

      // Dispatch the getFollowingPosts action to update the state
      await dispatch(getAllPosts());
    }
    
  }

  const deletePostHandler=async()=>{
   await dispatch(deletePost(bookId))
    dispatch(getAllPosts())
    dispatch(loadUser()) 
  }

 
  

 
  return (
    <div className='post3'>
        <img src={bookImage} alt="kyu nahi aarahi image" />
     </div>
   
  )
}

export default Post3
