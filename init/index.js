const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing");
const user = require("../models/user");


main()
.then(res => console.log("Connected to MongoDb"))
.catch(err => console.log(err))

async function  main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Airbnb")
};

const initDb = async () => {
   await Listing.deleteMany({});
   initdata.data = initdata.data.map((obj) => ({...obj, owner:user._id}))
   await Listing.insertMany(initdata.data);
   console.log("data was initilized");

}        

initDb();



