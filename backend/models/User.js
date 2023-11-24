const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const crypto=require("crypto");  //for forgotPassword purpose,inbuilt module in node

require("dotenv").config();

const UserSchema=new mongoose.Schema(
    {
        
       name:{
        type:String,
        required:[true,"Pls enter a name"]
       },

       email:{
         type:String,
         required:[true,"Pls enter an email"]
       },

       avatar: {
        public_id: String,
        url: String,
      },
    
       password:{
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false,    
       },

       phone:{
        type:String,
        required:[true,"pls enter you phone no."],
        minlength:[10,"Phone no. must be 10 digits long"],
        maxlength:[10,"Phone no. must be 10 digits long"]
       },

       books:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
          },
       ],

       followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

      resetPasswordToken:String,
      resetPasswordExpire:Date,
      

    }
)


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
  });


  UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  


  UserSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  };

  UserSchema.methods.getResetPasswordToken=function(){

   const resetToken=crypto.randomBytes(20).toString("hex"); //a token is generated
     
   this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex") //resetToken ko humne aur zyaada hash kiya ,kyu patanahi and save it in the user
   this.resetPasswordExpire=Date.now()+10*60*1000  //10 minute ke liye valid hoga bas ye token
   
   return resetToken;

  }
  

module.exports = mongoose.model("User", UserSchema);