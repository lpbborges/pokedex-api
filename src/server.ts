import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server is running!"));
