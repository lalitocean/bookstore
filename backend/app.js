import dotenv from 'dotenv';
dotenv.config();
import connection from './conn/db.js';
import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
import userrouter from './routes/user.js';
import bookrouter from './routes/books.js';
import favouriterouter from './routes/favourites.js';
import cartrouter from './routes/cart.js';
import orderrouter from './routes/order.js';
// ^ middlewares ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/v1", userrouter)
app.use("/api/v1", bookrouter)
app.use("/api/v1", favouriterouter)
app.use("/api/v1", cartrouter)
app.use("/api/v1", orderrouter)




// *connecting the database 
connection();
const port = process.env.PORT || 3000;




app.get("/api/v1/", (req, res) => {
    res.send('Hello World!');
});





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
