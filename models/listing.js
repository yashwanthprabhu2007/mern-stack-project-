const mongoose = require("mongoose"); // Importing Mongoose to connect and interact with MongoDB
const Review = require("./review");
const Schema = mongoose.Schema; // Extracting the Schema class from mongoose

// Defining the structure for the 'Listing' (e.g., property, hotel, or Airbnb rental) collection
const listingSchema = new Schema({
    tittle: {
        type: String // Stores the title of the listing (Note: consider fixing typo to 'title')
    },
    description: {
        type: String // Stores the detailed text description of the property
    },
    image: {
         url:String,
         filename:String
    },
    price: {
        type: Number // Stores the price of the listing as a numeric value
    },
    location: {
        type: String // Stores the specific city, state, or neighborhood name
    },
    country: {
        type: String // Stores the country where the listing is located
    },
    reviews : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner : {
         type: Schema.Types.ObjectId,
         ref:"User",
    },
     category: {
        type: String, // e.g., 'Surfing', 'Trending', etc.
        required: true,
        enum: ['Surfing', 'Trending', 'Mountain', 'Pool', 'Camping', 'Farm', 'Arctic'] // Add more categories as needed
    },
    geometry : {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }

}
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
       let res =  await Review.deleteMany({_id: { $in: listing.reviews}})   
       
       console.log(res);
    }
})

// Compiles the schema into a Mongoose model named "Listing"
const Listing = mongoose.model("Listing", listingSchema);

// Exports the model so it can be imported and used in controllers or routing files
module.exports = Listing;
