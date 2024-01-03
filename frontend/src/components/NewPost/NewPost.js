import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux";
import "./NewPost.css";
import { useNavigate } from 'react-router-dom';
import { createNewPost } from "../../Actions/Book";
import { getMyPosts, loadUser } from "../../Actions/User";
import deafultImage from "./default_image_2.png"

const NewPost = () => {
  const [image, setImage] = useState(deafultImage);
  const [title, setTitle ] = useState("");
  const [description, setDescription ] = useState("");
  const [author, setAuthor ] = useState("");
  const [category, setCategory ] = useState("");
  const [price, setPrice ] = useState("");
  const [binding, setBinding ] = useState("");
  const [language, setLanguage ] = useState("");
 


  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  // const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {   //2 signifies the reader process is complete
        setImage(Reader.result);
      }
    };
  };
 
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(title, image,author,description,category,price,language,binding));
    dispatch(loadUser());
    dispatch(getMyPosts())
    navigate('/account')
  };

  useEffect(() => {
    if (error) { //reducer lenge hum ye error
      console.log(error);
      
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost  dark:bg-darkbg1">
        {/* <Typography variant="h4">New Book</Typography> */}

      <form className="newPostForm dark:bg-darkpost" onSubmit={submitHandler}>
         <div className="imageContainer">
        {image && <img src={image} alt={deafultImage} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
         </div>
        <input type="file" accept="image/*" onChange={handleImageChange} /> 
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* description */}
        <input
          type="text"
          placeholder="Author..."
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      
      </form>
      <form className="newPostForm2 dark:bg-darkpost" onSubmit={submitHandler}>
        {/* description */}
       
        <input
          type="text"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         
      <select id="category" value={category} onChange={(e)=>setCategory(e.target.value)} >
        
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

      <input
          type="text"
          placeholder="Price(in ₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

<select className="dark:bg-darkpost" id="category" value={language} onChange={(e)=>setLanguage(e.target.value)} >
        
        <option value="" style={{font:'bold'}}>Select a language</option>
        <option value="english">english</option>
        <option value="hindi">hindi</option>
        
        {/* Add more options as needed */}
      </select>

      <select id="category" value={binding} onChange={(e)=>setBinding(e.target.value)} >
        
        <option value="" style={{font:'bold'}}>Select the binding</option>
        <option value="hardcover">hardcover</option>
        <option value="softcover">softcover</option>
        <option value="spiralbound">spiralbound</option>
      
        {/* Add more options as needed */}
      </select>
    
        <Button  className="dark:bg-black"style={{position:"relative",top:'60px',fontSize:'20px'}} disabled={loading} type="submit">
          Post 
        </Button>
      </form>
      <ToastContainer />
    </div>
  );

  // return (
    
  // );

};

export default NewPost;