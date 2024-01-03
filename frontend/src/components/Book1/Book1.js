import { Avatar, Button, Typography, Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import "./Book1.css"
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { addCommentOnPost, deletePost, likePost, updateBook } from '../../Actions/Book';
import { getAllPosts, getFollowingPosts, getMyPosts, getRecentlyAddedBook, getTrendingBook, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post1 = ({ bookId, title, author, description, price, category, language, binding, bookImage, likes = [], comments = [], ownerImage, ownerName, ownerId, isDelete, isAccount }) => {

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false)
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [authorValue, setAuthorValue] = useState(author);
  const [descriptionValue, setDecriptionValue] = useState(description);
  const [priceValue, setPriceValue] = useState(price);
  const [categoryValue, setCategoryValue] = useState(category);
  const [languageValue, setLanguageValue] = useState(language);
  const [bindingValue, setBindingValue] = useState(binding);


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


  const handleLike = async (e) => {
    e.preventDefault();
    try {

      setLiked(!liked);
      // Dispatch the likePost action and wait for it to complete
      await dispatch(likePost(bookId));


      if (isAccount) {
        await dispatch(getMyPosts())

      } else {

        // Dispatch the getFollowingPosts action to update the state
        await dispatch(getAllPosts());
        await dispatch(getRecentlyAddedBook());
        await dispatch(getTrendingBook());

      }

      // After both actions are completed, set the liked state

    } catch (error) {
      console.log(error);
    }

  }


  const addCommentHandler = async (e) => {

    // console.log('Comment Added');
    e.preventDefault();//
    await dispatch(addCommentOnPost(bookId, commentValue))
    setCommentValue("");

    if (isAccount) {
      await dispatch(getMyPosts())

    } else {

      await dispatch(getRecentlyAddedBook());
      await dispatch(getTrendingBook());
    }

  }

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updateBook(title, author, description, price, category, language, binding, bookId));
    dispatch(getMyPosts());
  };


  const deletePostHandler = async () => {
    await dispatch(deletePost(bookId))
    dispatch(getAllPosts())
    dispatch(loadUser())
  }





  return (
    <div className='post1 dark:bg-darkpost '>
      <div className="postHeader1">
        <div className="user1">
          <Link style={{ textDecoration: 'none' }} to={`/user/${ownerId}`}>
            <Typography className='dark:text-darkwhite' style={{ position: 'relative', fontSize: '14px', top: '10px', marginRight: '11px', textDecoration: 'none', color: 'black', left: "15px" }} fontWeight={400}>{ownerName}</Typography>
          </Link>
          <Avatar
            src={ownerImage}
            alt="User"
            sx={{
              height: "2.5vmax",
              width: "2.5vmax",
            }}
            style={{ position: 'relative', top: '2px', height: '35px', left: "10px", bottom: "4px" }}
          />
        </div>
      </div>
 


      {isAccount ? (

        <Button onClick={() => {
          console.log('MoreVert button clicked');
          setCaptionToggle(!captionToggle);
        }}>
          <MoreVert style={{ position: 'relative', left: '280px' }} />
        </Button>
      ) : null}

      <div className="imageContainer1">
        <Link to={`/book/${bookId}`} className='homeBook1'>
          <img src={bookImage} alt="kyu nahi aarahi image" />
        </Link>
      </div>

      <div className="postDetails1">

        <Typography
          fontWeight={700}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "start", marginRight: '10px', marginTop: '-10px', fontSize: '12px' }}
        >
          {title}
        </Typography>

        <Typography
          fontWeight={400}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "start", marginRight: '10px', marginTop: '-2px', fontSize: '12px' }}
        >
          {author}
        </Typography>
        <div className="pricedetails1">
          <div className="first1">
            <Typography
              fontWeight={400}
              color="rgba(0, 0, 0, 0.582)"
              style={{ alignSelf: "start", marginRight: '0px', marginTop: '6px', fontSize: '12px' }}
            >
              {category},{binding}
            </Typography>
          </div>
          <div className="second1">
            ₹{price}
          </div>

        </div>

      </div>




      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          margin: "1vmax 2vmax",
          marginTop: '-8px'
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}

      >
        <Typography style={{ fontSize: "0.8rem", position: "relative", top: "-15px", right: "13px" }}>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter1">

        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }}></Favorite> : <FavoriteBorder style={{color:'black'}} />}
        </Button>

        <Button onClick={() => setCommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>


        {isDelete ? <Button onClick={deletePostHandler}>
          <DeleteOutline />
        </Button> : null}
      </div>

      <Dialog open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <div className="DialogBox1">
          <Typography variant="h4">Liked By</Typography>

          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBox1">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm1" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />

            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>

      <Dialog open={commentToggle} onClose={() => setCommentToggle(!commentToggle)}>
        <div className="DialogBox1">
          <Typography variant="h4">Comments:</Typography>

          <form className="commentForm1" onSubmit={addCommentHandler} >
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
            comments.length > 0 ? (comments.slice().reverse().map((item) => <CommentCard userId={item.user._id}
              name={item.user.name}
              key={item._id}
              avatar={item.user.avatar.url}
              comment={item.comment}
              commentId={item._id}
              bookId={bookId}
              isAccount={isAccount} />)
            ) :
              (
                <Typography>No Comments Yet</Typography>
              )
          }
        </div>
      </Dialog>




    </div>
  )
}

export default Post1
