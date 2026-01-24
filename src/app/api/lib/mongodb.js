const mongoose = require ("mongoose");

const dbConnect = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/resume");
        console.log("Connected successfully");
    }
    catch(err){
        console.log(err?.message);
        console.log("not connected");
    }
}
module.exports = dbConnect;