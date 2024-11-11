require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const PORT =process.env.PORT|| 3001;
const urlRoute = require("./routes/user");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/user"); 
const { connectDB } = require("./db");

// Middleware
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// Routes
app.use("/url", urlRoute);
app.use("/", staticRouter);



app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  if (entry) {
    res.redirect(entry.redirectUrl);
  } else {
    res.status(404).json({ message: "URL not found" });
  }
});

// Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
