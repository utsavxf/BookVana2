const express = require('express');
const User = require('../models/user');
const Book = require('../models/Book');
const { isAuthenticated } = require('../middlewares/auth');
const crypto=require("crypto");

const cloudinary=require("cloudinary");
const { sendEmail } = require('../middlewares/sendEmail');

const router = express.Router();


router.post("/register", async (req, res) => {

    try {
        const { name,phone, email, password,avatar } = req.body;

        let user = await User.findOne({ email })
        if (user) {
            console.log('user already exists');
           return  res.status(400).json({ message: "User already exists" })
        }

        const myCloud=await cloudinary.v2.uploader.upload(avatar,{
          folder:"avatars",
        })

        const newuser = new User({ name, email, password,phone,avatar:{public_id:myCloud.public_id,url:myCloud.secure_url} });
        await newuser.save();

        const token = await newuser.generateToken();
    
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
    
        res.status(200).cookie("token", token, options).json({
          success: true,
          newuser,
          token,
        });




    } catch (error) {
        console.log('error while registering the user');
        console.log(error);
        
        return res.status(500).json({ message: "Failed to register user" })

    }



})

router.post("/login",async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email })
          .select("+password").populate("books followers following")
    
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "User does not exist",
          });
        }
    
        const isMatch = await user.matchPassword(password);
    
        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect password",
          });
        }
    
        const token = await user.generateToken();
    
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        
        console.log(user);
        

        return res.status(200).cookie("token", token, options).json({
          success: true,
          user,
          token,
        });
      } catch (error) {
        console.log(error);
        
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
})

router.get("/logout",(req,res)=>{
    try {
        res
          .status(200)
          .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
          .json({
            success: true,
            message: "Logged out",
          });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
})

//get all other users except me
router.get("/getAllUsers",isAuthenticated,async(req,res)=>{
  try {
    
   const loggedInUser=req.user;

    // Use the User model to find all users except the logged-in user
    const users = await User.find({ _id: { $ne: loggedInUser._id } });

    // Send the list of users as a JSON response
    res.status(200).json({
      success: true,
      users
    });
 

  } catch (error) {
    console.log(error);
    
    res.status(500).json({message:"error while retrieving all users"})
  }
})


router.get("/follow/:id",isAuthenticated,async(req,res)=>{
    try {
        const userToFollow = await User.findById(req.params.id);
        const loggedInUser = await User.findById(req.user._id);
    
        if (!userToFollow) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        if (loggedInUser.following.includes(userToFollow._id)) {
          const indexfollowing = loggedInUser.following.indexOf(userToFollow._id);
          const indexfollowers = userToFollow.followers.indexOf(loggedInUser._id);
    
          loggedInUser.following.splice(indexfollowing, 1);
          userToFollow.followers.splice(indexfollowers, 1);
    
          await loggedInUser.save();
          await userToFollow.save();
    
          res.status(200).json({
            success: true,
            message: "User Unfollowed",
          });
        } else {
          loggedInUser.following.push(userToFollow._id);
          userToFollow.followers.push(loggedInUser._id);
    
          await loggedInUser.save();
          await userToFollow.save();
    
          res.status(200).json({
            success: true,
            message: "User followed",
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }

})

//my profile
router.get("/me",isAuthenticated,async (req,res)=>{
  try {
    // const user = await User.findById(req.user._id).

   const user=await User.findById(req.user._id).populate("books followers following");

    // console.log(req.user._id);
    

    res.status(200).json({
      success: true,
      user
    });


  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

//get profile of a particular user
router.get("/getUserProfile/:id",async(req,res)=>{
 
  try {
     const user=await User.findById(req.params.id).populate("books followers following");

    if(!user){
      return res.status(404).json({
        success:false,
        message:"User does not exist",
      })
    }
    
    res.status(200).json({
      success:true,
      user,
    })
 


  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    })
  }

})


router.get("/mybooks",isAuthenticated,async(req,res)=>{
  try {
    const user=req.user;

    const mybooks=[];

    for(let i=0;i<user.books.length;i++){
         const post= await Book.findById(user.books[i]).populate("likes comments.user owner");
         mybooks.push(post)
    }

    return res.status(200).json({
      message:"all books uploaded by the user",
      mybooks,
    })
  } catch (error) {
    console.log('unable to fetch all books of user');
    res.status(500).json({message:"unable to fetch books"})
    
  }
    



})

//get books of a particular user

router.get("/getbooks/:id",isAuthenticated,async(req,res)=>{
  try {
    const userId=req.params.id;

    const thatuser=await User.findById(userId);
    
    if(!thatuser){
      return res.status(400).json({message:"the user doesn't exist"})
    }

    const hisbooks=[];

    for(let i=0;i<thatuser.books.length;i++){
         const post= await Book.findById(thatuser.books[i]);
         hisbooks.push(post)
    }

    return res.status(200).json({
      message:"all books uploaded by the user",
      hisbooks,
    })


  } catch (error) {
    console.log(error);
    
    return res.status(500).json({message:"error while getting books of a particular user"})
  }
})

router.put("/updateProfile",isAuthenticated,async(req,res)=>{
  try {
    const user = await User.findById(req.user._id);

    const { name, email, avatar,phone } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if(phone){
      user.phone=phone;
    }

    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

router.put("/updatePassword",isAuthenticated,async(req,res)=>{
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    const isMatch = await user.matchPassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
})

router.delete("/deleteProfile",isAuthenticated,async(req,res)=>{
  try {


  // console.log("I am called");
  

   const user=await User.findById(req.user._id);
   const books=user.books
   
   const followers = user.followers;
   const following = user.following;
   const userId = user._id;



   console.log(user);
   
   //ISKO TAB UNCOMMENT KARNA JAB USER WITH VALID AVATAR LOGIN HO
   await cloudinary.v2.uploader.destroy(user.avatar.public_id);

   
   await user.deleteOne();

     //now logout user after deleting profile
     res
     .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
  
   
   //sabse pehle to remove his posts
   for(let i=0;i<books.length;i++){
     const book=await Book.findById(books[i])
     await cloudinary.v2.uploader.destroy(post.image.public_id);

     await book.deleteOne();
   }

   //now remove himself from list of following of his followers
    for(let i=0;i<followers.length;i++){
      const follower=await User.findById(followers[i]);

      const index=follower.following.indexOf(user._id);
      follower.following.splice(index,1);
      await follower.save();
    }

    //now reverse
    for(let i=0;i<following.length;i++){
      const follows=await User.findById(following[i]);
      const index=follows.followers.indexOf(userId);
      follows.followers.splice(index,1);
      await follows.save();
    }

    //removing all the comments of the user from all posts
    const allBooks=await Book.find();

   // removing all comments of the user from all posts

   for (let i = 0; i < allBooks.length; i++) {
     const book = await Book.findById(allBooks[i]._id);

     for (let j = 0; j < allBooks.comments.length; j++) {
       if (book.comments[j].user === userId) {
         book.comments.splice(j, 1);
       }
     }
     await book.save();
   }
   // removing all likes of the user from all posts

   for (let i = 0; i < allBooks.length; i++) {
     const book = await Book.findById(allBooks[i]._id);

     for (let j = 0; j < book.likes.length; j++) {
       if (book.likes[j] === userId) {
         book.likes.splice(j, 1);
       }
     }
     await book.save();
   }




   return res.status(200).json({
    success: true,
    message: "Profile Deleted",
  });

    
  } catch (error) {
    console.log(error);
    
    res.status(500).json({success:false,message:error.message}) 
  }
})

router.post("/forgotPassword",async(req,res)=>{
  try {
    // console.log('pahuchi yaha pe');
    
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } 

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;  //user hata diya kyuki request frontend par jaani hai

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }

})

router.put("/password/reset/:token",async(req,res)=>{
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {  //implies token is expired
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}) 

//to get all the books of a particular user
router.get("/userbooks/:id",isAuthenticated,async(req,res)=>{
  try {
    const user=await User.findById(req.params.id);

    const mybooks=[];

    for(let i=0;i<user.books.length;i++){
         const post= await Book.findById(user.books[i]).populate("likes comments.user owner");
         mybooks.push(post)
    }

    return res.status(200).json({
      message:"all books uploaded by the user",
      mybooks,
    })
  } catch (error) {
    console.log('unable to fetch all books of user');
    res.status(500).json({message:"unable to fetch books"})
    
  }
    
})

//to get all books except that of the user himself
router.get('/allbooks/',isAuthenticated,async(req,res)=>{
  try {
    
    const userId = req.user._id;

   const user=await User.findById(req.user._id);
   
   if(!user){
    return res.status(404).json({
      success:false,
      message:"User does not exist",
    })
  }


  
  const books = await Book.find({
    owner: { $ne: userId },
    title: { $regex: req.query.title, $options: 'i' }
  }).populate("likes owner comments.user");
  
 

  // console.log(books);
  
  res.status(201).json({message:"all the books",books})


  } catch (error) {
    console.log(error);
    
    console.log('unable to fetch all books');
    res.status(500).json({message:"unable to fetch all books"})
  }
})

//get 4 most recently added books
router.get('/recentBooks', async (req, res) => {
  try {
    const recentlyAddedBooks = await Book.find()
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .limit(4) // Limit the result to 4 books
      .populate("owner likes comments.user"); 
    res.status(200).json({
      success: true,
      message: "Four most recently added books",
      book: recentlyAddedBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching recently added books",
    });
  }
});
router.get('/trendingbooks', async (req, res) => {
  try {
    const mostLikedBooks = await Book.find()
    .sort({ likes: -1 }) // Sort in descending order based on likes
    .limit(4) // Limit the result to 4 books
    .populate("owner likes comments.user");
    res.status(200).json({
    success: true,
    message: "Four books with the most likes",
    book: mostLikedBooks,
  });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while fetching trending books",
    });
  }
});

















module.exports = router;