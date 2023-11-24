
import axios from "axios"

export const loginUser = (email, password) => async (dispatch) => {

   try {


      dispatch({
         type: "LoginRequest"
      })


      const { data } = await axios.post("/user/login", { email, password }, {  //await isiliye taaki aage ka code proceed na ho until we get our data back from the response
         headers: {
            "Content-Type": "application/json"
         }
      })
      console.log(data);
      

      dispatch({
         type: "LoginSuccess",
         payload: data.user  // as data me hume milega success user,token
      })



   } catch (error) {
      dispatch({
         type: "LoginFailure",
         payload: error,
      })
   }






}
export const registerUser = (name,email, password,avatar,phone ) => async (dispatch) => {

   try {
  

      dispatch({
         type: "RegisterRequest"
      })


      const { data } = await axios.post("/user/register", {name, email, password,avatar,phone }, {  //await isiliye taaki aage ka code proceed na ho until we get our data back from the response
         headers: {
            "Content-Type": "application/json"
         }
      })
      console.log(data);
      

      dispatch({
         type: "RegisterSuccess",
         payload: data.user  // as data me hume milega success user,token
      })



   } catch (error) {
      dispatch({
         type: "RegisterFailure",
         payload: error,
      })
   }






}


export const logoutUser = () => async (dispatch) => {

   try {


      dispatch({
         type: "LogoutUserRequest"
      })


     await axios.get("/user/logout")
      

      dispatch({
         type: "LogoutUserSuccess",
      })



   } catch (error) {
      dispatch({
         type: "LogoutUserFailure",
         payload: error,
      })
   }






}

export const loadUser = () => async (dispatch) => {

   try {


      dispatch({
         type: "LoadUserRequest"
      })


      const { data } = await axios.get("/user/me");

      // console.log(data);
      

      dispatch({
         type: "LoadUserSuccess",
         payload: data.user  // as data me hume milega success user,token
      })



   } catch (error) {
      dispatch({
         type: "LoadUserFailure",
         payload: error.message
      })
   }






}

export const getFollowingPosts = () => async (dispatch) => {
   try {
      dispatch({
         type: "postOfFollowingRequest",
      });

      const { data } = await axios.get("/book/getBooksOfFollowing");
      dispatch({
         type: "postOfFollowingSuccess",
         payload: data.books,
      });
   } catch (error) {
      console.log(error);

      dispatch({
         type: "postOfFollowingFailure",
         payload: error.response.data.message,
      });
   }
}


export const getMyPosts = () => async (dispatch) => {
   try {
      dispatch({
         type: "myPostRequest",
      });

      const { data } = await axios.get("/user/mybooks");
      dispatch({
         type: "myPostsSuccess",
         payload: data.mybooks,
      });
   } catch (error) {
      console.log(error);

      dispatch({
         type: "myPostsFailure",
         payload: error.response.data.message,
      });
   }
}

export const getAllUsers =() =>
      async (dispatch) => {
         try {
            dispatch({
               type: "allUsersRequest",
            });

            const { data } = await axios.get(`/user/getAllUsers`);
            dispatch({
               type: "allUsersSuccess",
               payload: data.users,
            });
         } catch (error) {
            dispatch({
               type: "allUsersFailure",
               payload: error.response.data.message,
            });
         }
}

 export const updateProfile = (name,email,avatar,phone ) => async (dispatch) => {

         try {
        
      
            dispatch({
               type: "updateProfileRequest"
            })
      
      
            const { data } = await axios.put("/user/updateProfile", {name, email,avatar,phone }, {  //await isiliye taaki aage ka code proceed na ho until we get our data back from the response
               headers: {
                  "Content-Type": "application/json"
               }
            })
            console.log(data);
            
      
            dispatch({
               type: "updateProfileSuccess",
               payload: data.message  // as data me hume milega success user,token
            })
      
      
      
         } catch (error) {
            dispatch({
               type: "updateProfileFailure",
               payload: error,
            })
         }
       
 }     

 
export const updatePassword =(oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });

    const { data } = await axios.put(
      "/user/updatePassword",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updatePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const forgotPassword =(email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

   const {data}=await axios.post("/user/forgotPassword",{
      email
   },{
      headers:{
         "Content-Type":"application/json" 
      },
   })

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
   console.log(error);
   
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const resetPassword =(token,email) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

   const {data}=await axios.put(`/user/password/reset/${token}`,{
      email
   },{
      headers:{
         "Content-Type":"application/json" 
      },
   })

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
   console.log(error);
   
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteMyProfile =() => async (dispatch) => {
  try {
   console.log('Request has reached here');
   
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete("/user/deleteProfile")
      

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
   try {
      dispatch({
         type: "userPostRequest",
      });

      const { data } = await axios.get(`/user/userbooks/${id}`);
      dispatch({
         type: "userPostsSuccess",
         payload: data.mybooks,
      });

      console.log(data.mybooks)
   } catch (error) {
      console.log(error);

      dispatch({
         type: "userPostsFailure",
         payload: error.response.data.message,
      });
   }
}
export const getUserProfile = (id) => async (dispatch) => {
   try {
      dispatch({
         type: "userProfileRequest",
      });

      const { data } = await axios.get(`/user/getUserProfile/${id}`);
      dispatch({
         type: "userProfileSuccess",
         payload: data.user,
      });
   } catch (error) {
      console.log(error);

      dispatch({
         type: "userProfileFailure",
         payload: error.response.data.message,
      });
   }
}

export const followAndUnfollowUser = (id) => async (dispatch) => {
   try {
      dispatch({
         type: "followUserRequest",
      });

      const { data } = await axios.get(`/user/follow/${id}`);
      dispatch({
         type: "followUserSuccess",
         payload: data.message,
      });
   } catch (error) {
      console.log(error);

      dispatch({
         type: "followUserFailure",
         payload: error.response.data.message,
      });
   }
}