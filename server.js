const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/User");

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/formdata", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// Serve the HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "temo_all.html"));
});

app.listen(port, () => {
    console.log(`server is started on ${port}`);
});

app.post("/submit", async (req, res) => {
    try {
      console.log(req.body); // Log the incoming request data to debug
      const { email, password, dob, number, gender } = req.body;
  
      const user = new User({ email, password, dob, number, gender });
      await user.save();
  
      res.status(200).send("Form submitted successfully and data saved to database!");
    } catch (err) {
      res.status(500).send("Error saving data to database.");
      console.error(err);
    }
  });
  
