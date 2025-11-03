import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/note.js";
import path from "path";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/notes", notesRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectToDb().then(() => {
  console.log("MongoDb connected");
});
app.listen(5000, () => {
  console.log("Server started at port 5000");
});
