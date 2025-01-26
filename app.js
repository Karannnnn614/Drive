import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './config/db.js'
import cookieParser from 'cookie-parser';

dotenv.config();

connectToDB();

const app = express();

//Linking routers 
import UserRouter from './routes/user.routes.js';
import IndexRouter from './routes/index.routes.js';

//Configuration to load template pages
app.set('view engine','ejs');   
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Route level middleware to load routes as per base path
app.use("/",IndexRouter);
app.use("/user",UserRouter);

app.listen(3000)
console.log("Server Invoked Successfully at http://localhost:3000")
