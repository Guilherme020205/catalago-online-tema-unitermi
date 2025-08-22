import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello, Word!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is ruinning on http://localhost:${port}`);
});
