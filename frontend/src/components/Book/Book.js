import { Avatar, Button, Typography ,Dialog} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import "./Book.css"
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { addCommentOnPost, deletePost, likePost } from '../../Actions/Book';
import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({bookId,title,bookImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete,isAccount}) => {
 
  const dispatch=useDispatch();

  const [liked,setLiked]=useState(false)
  const [likesUser,setLikesUser]=useState(false);
  const [commentValue,setCommentValue]=useState("");
  const [commentToggle,setCommentToggle]=useState(false);

  const { user } = useSelector((state) => state.user);

   
  const handleLike=async()=>{
    try {

      setLiked(!liked);
      // Dispatch the likePost action and wait for it to complete
      await dispatch(likePost(bookId));
  

      if(isAccount){
        await dispatch(getMyPosts())
        
      }else{

        // Dispatch the getFollowingPosts action to update the state
        await dispatch(getFollowingPosts());
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
      await dispatch(getFollowingPosts());
    }
    
  }

  const deletePostHandler=async()=>{
   await dispatch(deletePost(bookId))
    dispatch(getMyPosts())
    dispatch(loadUser()) 
  }

 
  useEffect(() => {

    
    likes.forEach((item) => {
      
      if (item === user._id) {
        
        setLiked(true);
      }
    });
  }, [likes, user._id]);

 
  return (
    <div className='post'>
      <div className="postHeader"></div>


      {isAccount ? (
          <Button >
            <MoreVert />
          </Button>
        ) : null} 

      
      <img src={bookImage} alt="kyu nahi aarahi image" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight={100}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "center" }}
        >
          {title}
        </Typography>
      </div>

      
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={()=>setLikesUser(!likesUser)}
        disabled={likes.length===0?true:false}
    
      >
        <Typography>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">

        <Button  onClick={handleLike}>
          {liked?<Favorite style={{color:"red"}}></Favorite>:<FavoriteBorder/>}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline/>
        </Button>

      
        {isDelete?  <Button onClick={deletePostHandler}>
          <DeleteOutline/>
        </Button>:null}
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like}
              userId={like}
              name={like}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
        <div className="DialogBox">
          <Typography variant="h4">Comments:</Typography>

          <form className="commentForm" onSubmit={addCommentHandler} >
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>
              {  //see 2:18:16 from video
                comments.length>0?(comments.map((item)=><CommentCard   userId={item.user._id}
                name={item.user.name}
                key={item._id}
                avatar={item.user.url}
                comment={item.comment}
                commentId={item._id}
                bookId={bookId}
                isAccount={isAccount} />)
                ):
                (
                  <Typography>No Comments Yet</Typography>
                )
              }
        </div>
      </Dialog>


    </div>
  )
}

export default Post
