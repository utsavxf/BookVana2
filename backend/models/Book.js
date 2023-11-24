const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Pls enter a title"]
    },

    author:{
        type:String,
        required:[true,"Pls enter name of author"]
    },

    description: {
        type: String
    },

    category: {
        type: String,
        required: [true, "Pls enter the category"]
    },

    price:{
       type:String,
       required:[true,"Pls enter the price"]
    },

    language:{
        type:String,
        required:[true,"Pls enter the language"]
     },

     binding:{
        type:String,
        required:[true,"Pls enter the type of binding"]
     },

    image: {
        public_id: String,
        url: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    createdAt: {
        type: Date,
        default: Date.now,
      },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],



})

module.exports = mongoose.model("Book", BookSchema);