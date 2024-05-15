import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// although export name is router we can give any name in import it will receive router only
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';

const app = express();
//using express m/w to connect to our application
dotenv.config(); // .env is not going to be saved on github

// set up requests body parser

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // put this above use routes

//set up starting path for all the routes inside posts.js
app.use('/posts', postRoutes); // this means every route inside posts.js will start from /posts
app.use('/user', userRoutes); // route for users

// connect to database

//const CONNECTION_URL = 'mongodb+srv://someshnayak2903:somesh123123@cluster0.pkwwb3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)));
