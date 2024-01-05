import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CommentCard.css";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentonPost } from "../../Actions/Book";
import { getAllPosts, getFollowingPosts, getMyPosts, getRecentlyAddedBook, getSingleBook, getTrendingBook } from "../../Actions/User";


const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  bookId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);  //login user access kar rahe hai
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    
    
    dispatch(deleteCommentonPost(bookId, commentId));

    if (isAccount) {
       dispatch(getMyPosts());
       dispatch(getSingleBook(bookId));
       dispatch(getTrendingBook());
       dispatch(getRecentlyAddedBook())
       
    } else {
      dispatch(getAllPosts());
      dispatch(getSingleBook(bookId));
      dispatch(getTrendingBook());
      dispatch(getRecentlyAddedBook())
    }
  };


   useEffect(()=>{
    console.log(avatar);
        
   })





  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax",marginRight:"5px" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
    

      {isAccount ? (
        <Button  onClick={deleteCommentHandle}>
          <Delete />
        </Button>
      ) : userId === user._id ? (    //user login waaala user hai ise hum asaani se state me se access karlenge
        <Button onClick={deleteCommentHandle} >
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;