// This is review schema 
const mongoose = require("mongoose"); // Importing Mongoose to interact with MongoDB
const Schema = mongoose.Schema; // Extracting the Schema class from mongoose

// Defining the structure for the 'Review' collection
const reviewSchema = new Schema({
    comment: String, // Stores the text of the user's review
    rating: { 
        type: Number, // Stores the review score as a number
        min: 1,       // Validation: Minimum allowed rating is 1
        max: 5,       // Validation: Maximum allowed rating is 5
    },
    createdAt: {
        type: Date,          // Stores the timestamp of when the review was made
        default: Date.now,   // Automatically sets to current date/time if not provided
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

// Compiles the schema into a model named "Review" and exports it for use in other files
module.exports = mongoose.model("Review", reviewSchema);
