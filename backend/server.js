const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/connectDb");

connectDb();

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin : ["https://todo-app-omega-liard.vercel.app", "http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser());


// routes
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);


// errorHandler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
