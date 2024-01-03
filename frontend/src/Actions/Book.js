import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/book/${id}`);
    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const addCommentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "addCommentRequest",
    });

    const { data } = await axios.put(
      `/book/comment/${id}`,
      {
        comment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "addCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addCommentFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteCommentonPost = (id, commentId) => async (dispatch) => {
  try {
    // console.log(commentId);
    
    dispatch({
      type: "deleteCommentRequest",
    });
 
    const { data } = await axios.delete(
      `/book/deleteComment/${id}`,{  //ek comment id bhi to bhejni thi idhar
        data:{commentId}
      }
      
    );
    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};
export const createNewPost = (title, image,author,description,category,price,language,binding) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
 
    const { data } = await axios.post(
      `/book/createPost/`,{  //ek comment id bhi to bhejni thi idhar
        title,
        image,author,description,category,price,language,binding
      },{
        headers: {
          "Content-Type": "application/json",
        },
      }
      
      
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateBook=(title,author,description,category,price,language,binding,id)=>async (dispatch)=>{
  try {
    // console.log('request is here');
    
    dispatch({
      type: "  updateBookRequest",
    });

    const { data } = await axios.put(
      `/book/updatePost/${id}`,
      {
        title,author,description,category,price,language,binding
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "  updateBookSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "  updateBookFailure",
      payload: error.response.data.message,
    });
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/book/delete/${id}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};