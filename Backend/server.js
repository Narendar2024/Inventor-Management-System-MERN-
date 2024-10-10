const dotEnv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const userRoute = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

dotEnv.config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(upload.none());
app.use(cookieParser());

// Routes Middleware
app.use("/api/users", userRoute);

// Default Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("DB Connection Error: ", err));
