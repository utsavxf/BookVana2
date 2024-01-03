import { useParams } from 'react-router-dom';
import Book3 from '../Book3/Book3';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getMyPosts, getSingleBook, getUserPosts } from '../../Actions/User';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader/Loader';
import "./BookProfile.css"
import CommentCard from '../CommentCard/CommentCard';
import { Button, Typography } from '@mui/material';
import { addCommentOnPost } from '../../Actions/Book';

const BookProfile = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { user: me } = useSelector((state) => state.user);
    const { loading, error, book } = useSelector((state) => state.book);

    const [commentValue,setCommentValue]=useState("");

    const addCommentHandler=async(e)=>{
    
        // console.log('Comment Added');
        e.preventDefault();//
       await  dispatch(addCommentOnPost(params.id,commentValue))
        setCommentValue("");
    
        if(true){
          await dispatch(getMyPosts())
          dispatch(getSingleBook(params.id));
        //   await dispatch(getUserPosts(params.id))
          
        }else{
            dispatch(getSingleBook(params.id));
          // Dispatch the getFollowingPosts action to update the state
          await dispatch(getAllPosts());
        //   await dispatch(getUserPosts(params.id))
        }
        
      }

    useEffect(() => {

        dispatch(getSingleBook(params.id));
        console.log(book);
    }, [dispatch, params.id]);

    useEffect(() => {
        console.log(book);

        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }

    }, [error, dispatch]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                book ? ( // Check if book is available before rendering Book component
                    <>
                        <div className="homecomponent">
                            <div className="homeContainer">
                                <div className="bookFirst">
                                    <div className="bookleft">
                                        <div className="bookpehla">
                                            <Book3
                                                key={book._id}
                                                bookId={book._id}
                                                title={book.title}
                                                author={book.author}
                                                description={book.description}
                                                price={book.price}
                                                category={book.category}
                                                language={book.language}
                                                binding={book.binding}
                                                bookImage={book.image.url}
                                                likes={book.likes}
                                                comments={book.comments}
                                                ownerImage={book.owner.avatar.url}
                                                ownerName={book.owner.name}
                                                ownerId={book.owner._id}
                                            />
                                        </div>
                                        <div className="bookdusra">
                                            <div className="titleAndAuthor">
                                                <div className="title">
                                                    {book.title}
                                                </div>
                                                <div className="author">
                                                    {book.author}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="bookright">
                                        <div className="description">
                                            <div className="about-heading">About:</div>
                                            <div className="description-content">{book.description}.</div>
                                        </div>
                                        <div className="category">
                                            <div className="about-heading">Category:</div>
                                            <div className="description-content">{book.category}</div>
                                        </div>
                                        <div className="language">
                                            <div className="about-heading">Language:</div>
                                            <div className="description-content">{book.language}</div>
                                        </div>
                                        <div className="binding">
                                            <div className="about-heading">Binding:</div>
                                            <div className="description-content">{book.binding}</div>
                                        </div>
                                        <div className="price">
                                            <div className="about-heading">Price:</div>
                                            <div className="description-content">₹{book.price}</div>
                                        </div>
                                        <div className="likes">
                                            <div className="about-heading">Likes:</div>
                                            <div className="description-content">{book.likes.length}</div>
                                        </div>
                                    </div>

                                </div>
                                <div className="bookSecond">
                                    <div className='commentHeading'>Comments:</div>
                                    <div className="Addcommment">
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
                                    </div>
                                    <div className='comments'>
                                    {
                                        book.comments.length > 0 ? (book.comments.slice().reverse().map((item) => <CommentCard userId={item.user._id}
                                            name={item.user.name}
                                            key={item._id}
                                            avatar={item.user.avatar.url}
                                            comment={item.comment}
                                            commentId={item._id}
                                            bookId={params.id}
                                             />) //isAccount abhi ke liye hata rakha hai
                                        ) :
                                            (
                                                <Typography>No Comments Yet</Typography>
                                            )
                                    }
                                </div>
                                </div>

                            </div>
                        </div>


                        <ToastContainer />
                    </>
                ) : (
                    <p>No book data available</p>
                )
            )}
        </>
    );
};

export default BookProfile;


