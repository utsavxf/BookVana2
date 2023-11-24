import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux";
import "./NewPost.css";
import { createNewPost } from "../../Actions/Book";
import { getMyPosts, loadUser } from "../../Actions/User";
const NewPost = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle ] = useState("");

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

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(title, image));
    dispatch(loadUser());
    dispatch(getMyPosts())
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
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Book</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} /> 
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NewPost;