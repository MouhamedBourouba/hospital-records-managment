import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute.js";
import RecordRoute from "./routes/RecordRoute.js";
import Events from "./routes/EventStream.js";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import AnonymRoute from "./routes/AnonymRoute.js";
import Organizations from "./routes/OrganizationsRoute.js";
import morgan from "morgan";

const PORT = 5000;

dotenv.config();
const app = express();

app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api/", AuthRoute);
app.use("/api/events/", Events);
app.use("/api/", RecordRoute);
app.use("/api/", AnonymRoute);
app.use("/api/", Organizations);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server running ${PORT}`);
  } catch (err) {
    console.log(err.message);
  }
});
