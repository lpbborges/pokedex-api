import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

mongoose.connect(
  "mongodb+srv://admin:4rqRIh1U1bQsdOxA@cluster0.5gbrq.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server is running!"));
