const mongoose = require ("mongoose");

const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Connected successfully");
    }
    catch(err){
        console.log(err?.message);
        console.log("not connected");
    }
}
module.exports = dbConnect;