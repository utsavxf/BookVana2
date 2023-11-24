const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const Book = require('../models/Book');
const cloudinary=require("cloudinary");
const User = require('../models/user');
const router = express.Router();

router.post('/upload', isAuthenticated, async (req, res) => {

    try {
        const { title,author, description, category, price, language, binding } = req.body;

        const book = new Book({ title,author, description, category, price, language, binding })


        const user = req.user;

        book.owner = user._id;

        user.books.push(book);


        await user.save();
        await book.save();

        res.status(200).json({ message: "Book added successfully" })


    } catch (error) {
        // console.log(error);

        res.status(500).json({ message: "Error while uploading book",error:error })
    }




})

router.post('/createPost',isAuthenticated,async(req,res)=>{
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "posts",
    });
    const newPostData = {
      title: req.body.title,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      author:"b",
      description:"j",
      category:"j",
      price:0,
      language:"j",
      binding:"h",
      owner: req.user._id,
    };

    const book = await Book.create(newPostData);

    const user = await User.findById(req.user._id);

    user.books.unshift(book._id);  //push me end me add hota hai ,while unshift se starting me ho jaayega

    await user.save();
    res.status(201).json({
      success: true,
      message: "Book Created",
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const user = req.user;
        const bookId = req.params.id;

        // Retrieve the book from the database
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Check if the user owns the book
        if (book.owner.toString() !== user._id.toString()) {
            return res.status(401).json({ message: "You cannot delete someone else's book" });
        }

        //Delete the book from cloudinary database
         await cloudinary.v2.uploader.destroy(book.image.public_id)
         

        // Delete the book from the database
        await Book.findByIdAndRemove(bookId);

        // Find the index of the book to be deleted in the user's books array
        const index = user.books.indexOf(bookId);

        if (index !== -1) {
            // Remove the book from the user's books array
            user.books.splice(index, 1);
            await user.save();
        }

        return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while deleting a book" });
    }
});

//get all books of users I am following
router.get('/getBooksOfFollowing',isAuthenticated,async(req,res)=>{
    try {
        
      const user=req.user;
      const books = await Book.find(
        {
          owner: {
            $in: user.following,
          },
        }
      ).populate("owner likes comments.user"); // Replace '-password' with the fields you want to include/exclude from the 'owner' document
      

      res.status(200).json({
        success: true,
        books: books.reverse(),  //as latest post hume baadme chahiye beta
      });
  


    } catch (error) {
        console.log('');
        
        res.status(500).json({message:"error while getting books of users I am following"})
    }
})

//like andUnlike a book
router.get("/:id",isAuthenticated,async(req,res)=>{
   try {
    const bookId = req.params.id;

    // Fetch the book document from the database
    const book = await Book.findById(bookId);

    if (!book) {
      // Return an error response if the book doesn't exist
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
      if (book.likes.includes(req.user._id)) {
        const index = book.likes.indexOf(req.user._id);
  
        book.likes.splice(index, 1);
  
        await book.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Unliked",
        });
      } else {
        book.likes.push(req.user._id);
  
        await book.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
        });
      }



    
   } catch (error) {
    console.log(error);
    
     res.status(500).json({message:"error while liking and unliking a post"})
   }              
})

//add a comment to a book /or update already existing comment

router.put("/comment/:id",isAuthenticated,async(req,res)=>{
  try {
    
  //first we will extract the user who is commenting and the book on which comment is being added
  const user=req.user._id;
  const book=await Book.findById(req.params.id);

  if(!book){
    return res.status(400).json({success:false,message:"Book not Found"})
  }

  let commentIndex=-1;

  //Checking if comment already exists
  book.comments.forEach((item,index)=>{
     if(item.user.toString()===user.toString()){
      commentIndex=index;
     }
  })

if(commentIndex!==-1){

   console.log('iske andar to aagay');
   

 book.comments[commentIndex].comment=req.body.comment;

 await book.save();
 return res.status(200).json({
  success:true,
  message:"Comment Updated",
 })

}
  else{

    book.comments.push({
      user:user,
      comment:req.body.comment
    })

    await book.save();
 return res.status(200).json({
  success:true,
  message:"comment added"

 })
  }


 
  } catch (error) {
    console.log(error);
    
    res.status(500).json({message:"error while commenting on a post"})
  }
})

//delete a particular comment (2 cases will be there)
router.delete("/deleteComment/:id",isAuthenticated,async(req,res)=>{
   try {
     const book=await Book.findById(req.params.id);
     
     if(!book){
       return res.status(404).json({
        success:false,
        message:"Post not Found",
       })
     }

     
  


    
     if(book.owner.toString()===req.user._id.toString()){
  
       
      if(req.body.commentId==undefined){
        return res.status(400).json({
          success:false,
          message:"Comment Id is required"
        })
      }





      book.comments.forEach((item,index)=>{
        if(item._id.toString()===req.body.commentId.toString()){
        return  book.comments.splice(index,1);  //yaha par ye return basically anologous hai break ke
        }
     })      
 
     await book.save();

     res.status(200).json({
       success:true,
       message:" Selected Comment deleted by user"
     })
    


     }else{

      book.comments.forEach((item,index)=>{
        if(item.user.toString()===req.user._id.toString()){
        return  book.comments.splice(index,1);  //yaha par ye return basically anologous hai break ke
        }
     })

    await book.save();

    res.status(200).json({
      success:true,
      message:" Your Comment Deleted"
    })

     }

   } catch (error) {
    // console.log('hello');
    
      res.status(500).json({
        success:false,
        message:error.message,
      })
   }
})










module.exports = router;