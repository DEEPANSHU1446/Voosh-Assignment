const express = require("express");
const route = require("./routes/routes.js");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true); 
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://FARINEKHAN:EXtlAhONzagSoJCy@cluster0.wge8afd.mongodb.net/voosh",{
  useNewUrlParser: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));


app.use("/", route); 

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});


