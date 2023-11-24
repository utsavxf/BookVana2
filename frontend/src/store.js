import { getDefaultMiddleware } from '@reduxjs/toolkit';
import {configureStore} from "@reduxjs/toolkit";
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User";
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Book';
const initialState={}


const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

const store=configureStore({
    reducer:{
        user:userReducer , //user ke naam se pehla reducer hai
        postOfFollowing:postOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPosts:myPostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostsReducer
    }

})

export default store;