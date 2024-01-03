import { Avatar, Button, Typography ,Dialog} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import "./Book.css"
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { addCommentOnPost, deletePost, likePost, updateBook } from '../../Actions/Book';
import { getAllPosts, getFollowingPosts, getMyPosts, getUserPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({bookId,title,author,description,price,category,language,binding,bookImage,likes=[],comments=[],ownerImage,ownerName,ownerId,isDelete,isAccount}) => {
 
  const dispatch=useDispatch();

  const [liked,setLiked]=useState(false)
  const [likesUser,setLikesUser]=useState(false);
  const [commentValue,setCommentValue]=useState("");
  const [commentToggle,setCommentToggle]=useState(false);
  const [captionToggle, setCaptionToggle] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [authorValue, setAuthorValue] = useState(author);
  const [descriptionValue, setDecriptionValue] = useState(description);
  const [priceValue, setPriceValue] = useState(price);
  const [categoryValue, setCategoryValue] = useState(category);
  const [languageValue, setLanguageValue] = useState(language);
  const [bindingValue, setBindingValue] = useState(binding);

  const { user } = useSelector((state) => state.user);

  const params = useParams();
   
  const handleLike=async()=>{
    try {

      setLiked(!liked);
      // Dispatch the likePost action and wait for it to complete
      await dispatch(likePost(bookId));
  

      if(isAccount){
        await dispatch(getMyPosts())
        await dispatch(getUserPosts(params.id))// kisa user ka id,jiski post par humne like kiya hai uski
        
      }else{

        // Dispatch the getFollowingPosts action to update the state
        await dispatch(getFollowingPosts());
        await dispatch(getUserPosts())
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
      await dispatch(getUserPosts(params.id))
      
    }else{

      // Dispatch the getFollowingPosts action to update the state
      await dispatch(getAllPosts());
      await dispatch(getUserPosts(params.id))
    }
    
  }

  const updateCaptionHandler=async(e)=>{
    
    // console.log('inside update post ');
    e.preventDefault();//
    await dispatch(updateBook(titleValue,authorValue,descriptionValue,categoryValue,priceValue,languageValue,bindingValue,bookId))
    dispatch(getMyPosts())  
    setCaptionToggle(!captionToggle) //so that ek dum hi close ho jaaye

    
  }

  const deletePostHandler=async()=>{
   await dispatch(deletePost(bookId))
    dispatch(getMyPosts())
    dispatch(loadUser()) 
  }


 
  useEffect(() => {
    
    
    
    
    likes.forEach((item) => {
      
      if (item._id === user._id) {
        
        setLiked(true);
      }
    });
  }, [likes, user._id]);

 
  return (
    <div className='post dark:bg-darkpost'>
      <div className="postHeader">
         <div className="user">
         <Link style={{textDecoration:'none'}} to={`/user/${ownerId}`}>
            <Typography style={{position:'relative',fontSize:'20px',top:'17px',marginRight:'15px',textDecoration:'none',color:'black'}} className='dark:text-darkwhite' fontWeight={400}>{ownerName}</Typography>
          </Link>
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
          style={{position:'relative',top:'10px',height:'40px'}} 
        />
      </div>
         </div>
      
        

      {isAccount ? (
           <Button onClick={() => {
            console.log('MoreVert button clicked');
            setCaptionToggle(!captionToggle);
          }}>
            <MoreVert style={{ position: 'relative', left: '280px', top:"-30px" }} />
          </Button>
        ) : null} 

      <div className="imageContainer">
      <Link to={`/book/${bookId}`} className='homeBook'>
      <img src={bookImage} alt="kyu nahi aarahi image" />
      </Link>
      </div>
 
      <div className="postDetails">

      <Typography
          fontWeight={700}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "start",marginRight:'10px',marginTop:'-10px',fontSize:'17px' }}
        >
          {title}
        </Typography>
        
      <Typography
          fontWeight={400}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "start",marginRight:'10px',marginTop:'-5px',fontSize:'15px' }}
        >
          {author}
        </Typography>
        <div className="pricedetails">
           <div className="first">
           <Typography
          fontWeight={400}
          color="rgba(0, 0, 0, 0.582)"
          style={{ alignSelf: "start",marginRight:'10px',marginTop:'15px',fontSize:'15px' }}
        >
          {category},{binding}
         </Typography>
           </div>
           <div className="second">
              ₹{price}
           </div>
        
        </div>
      
        </div>



      
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
          marginTop:'-8px'
        }}
        onClick={()=>setLikesUser(!likesUser)}
        disabled={likes.length===0?true:false}
    
      >
        <Typography className='dark:bg-darkpost'>{likes.length} Likes</Typography>
      </button>

      <div className="postFooter">

        <Button  onClick={handleLike}>
          {liked?<Favorite className='dark:bg-darkpost' style={{color:"red"}}></Favorite >:<FavoriteBorder className='dark:bg-darkpost'/>}
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
                 comments.length>0?(comments.slice().reverse().map((item)=><CommentCard   userId={item.user._id}
                name={item.user.name}
                key={item._id}
                avatar={item.user.avatar.url}
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

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="DialogBoxUpdate">
          <Typography variant="h4">Update Book Details</Typography>

          <form className="commentFormUpdate" onSubmit={updateCaptionHandler}>
            <div className="inputcomponent">
              <h4>Title</h4>
              <input
              type="text"
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            </div>
            <div className="inputcomponent">
              <h4>Author</h4>
              <input
              type="text"
              value={authorValue}
              onChange={(e) => setAuthorValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            </div>
            <div className="inputcomponent">
              <h4>Description</h4>
              <input
              type="text"
              value={descriptionValue}
              onChange={(e) => setDecriptionValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            </div>
            <div className="inputcomponent">
              <h4>Category</h4>
              <select id="category" value={categoryValue} onChange={(e)=>setCategoryValue(e.target.value)} >
        
        <option value="" style={{font:'bold'}}>Select a category</option>
        <option value="horror">horror</option>
        <option value="thriller">thriller</option>
        <option value="romantic">romantic</option>
        <option value="crime">crime</option>
        <option value="poetry">poetry</option>
        <option value="self-help">self-help</option>
        <option value="spiritual">spiritual</option>
        <option value="fantasy">fantasy</option>
        <option value="mystery">mystery</option>
        <option value="magic">magic</option>
        <option value="kids">kids</option>
        <option value="comedy">comedy</option>
        {/* Add more options as needed */}
      </select>
            </div>
            <div className="inputcomponent">
              <h4>Language</h4>
              <select id="category" value={languageValue} onChange={(e)=>setLanguageValue(e.target.value)} >
        
        <option value="" style={{font:'bold'}}>Select a language</option>
        <option value="english">english</option>
        <option value="hindi">hindi</option>
        
        {/* Add more options as needed */}
      </select>
            </div>
            <div className="inputcomponent">
              <h4>Binding</h4>
              <select id="category" value={bindingValue} onChange={(e)=>setBindingValue(e.target.value)} >
        
        <option value="" style={{font:'bold'}}>Select the binding</option>
        <option value="hardcover">hardcover</option>
        <option value="softcover">softcover</option>
        <option value="spiralbound">spiralbound</option>
      
        {/* Add more options as needed */}
      </select>
            </div>
            <div className="inputcomponent">
              <h4>Price</h4>
              <input
              type="text"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              placeholder="Caption Here..."
              required
            />
            </div>
    
            <Button className='dark:bg-darkwhite' type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>

    </div>
  )
}

export default Post
