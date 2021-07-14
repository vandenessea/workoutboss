const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require('./models');
mongoose.connect(
    // process.env.MONGODB_URI || 'mongodb://localhost/workout' , 
'mongodb+srv://alex-user:1234password@cluster0.goisb.mongodb.net/workoutDB?retryWrites=true&w=majority' , 

    {   
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false
    });

// routes

app.use(require("./routes/getRoutes.js"));//server needs to know where to go to find these get routes
app.use(require("./routes/api-routes.js"));//server needs to know where to go to find these get routes

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
