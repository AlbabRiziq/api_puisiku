import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import SigUp from "./models/User.js";
const dbName = "Puisiku";

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(`mongodb://localhost:27017/${dbName}`).then(() => {
  app.use(cors());

  app.get("/", (req, res) => {
    res.send("dssd");
  });
  app.get("/api", (req, res) => {
    res.json({
      message: "Masukan query",
    });
  });
  app.get("/api/puisi", async (req, res) => {
    fs.readFile("./puisi.json", "utf-8", (err, data) => {
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/register", async (req, res) => {
    const { username, namaLengkap, password } = req.query;
    console.log(req.query);
    const user = new SigUp({
      username,
      namaLengkap,
      password,
    });
    await user.save();
    res.json({
      message: "Berhasil",
    });
  });

  app.get("/api/puisi/acak", async (req, res) => {
    fs.readFile("./puisi.json", "utf-8", (err, data) => {
      const panjangData = JSON.parse(data).length;
      const acak = Math.floor(Math.random() * panjangData);
      res.json({
        index: acak,
        data: JSON.parse(data)[acak],
      });
      console.log(JSON.parse(data)[acak]);
    });
  });
  app.get("/api/puisi/:id", async (req, res) => {
    fs.readFile("./puisi.json", "utf-8", (err, data) => {
      res.json(JSON.parse(data)[req.params.id]);
      console.log(JSON.parse(data)[req.params.id]);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
