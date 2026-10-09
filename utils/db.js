const  mongoose  = require("mongoose");

const connectMongoose=async()=>{
  try {
    const connect=await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Database connect successfully");
    
  } catch (error) {
    console.log(error);
    
  }
}

module.exports={
   connectMongoose 
}