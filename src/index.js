const env = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const useRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin/auth");
const cors = require('cors');
const path = require("path");
// import router from './routes/user';

//initializing environment variables
env.config();


//MongoDB connection
//mongodb+srv://root:<password>@cluster0.anmlv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.anmlv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
    console.log('DataBase Connected');
});
app.use(cors());
app.use(express.json());
app.use('/api', useRoutes);
app.use('/api', adminRoutes);

// Serve the frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "../", "frontend", "build", "index.html")
      )
    );
  } else {
    app.get("/", (req, res) => res.send("Please set to production"));
  }

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});