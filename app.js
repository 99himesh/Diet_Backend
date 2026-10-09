require("dotenv").config();
const express=require("express");
const { connectMongoose } = require("./utils/db");
const aiRouter=require("./routes/aiRoute")
const cors=require("cors")
const app=express();

app.use(express.json());
app.use(cors())
app.use("/diet-workout",aiRouter)



app.listen(process.env.PORT,async()=>{
    await connectMongoose();
    console.log(`Server is listning on ${process.env.PORT}`);
})