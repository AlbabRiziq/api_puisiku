import express from "express";
import cors from "cors";
import fs from "fs";
import mongoose from "mongoose";
import SigUp from "./models/User.js";
import Puisi from "./models/Puisi.js";
const dbName = "Puisiku";

const app = express();
const PORT = process.env.PORT || 8080;

mongoose
  .connect(`mongodb://localhost:27017/${dbName}`, {
    autoIndex: true,
  })
  .then(() => {
    app.use(cors());

    app.get("/", (req, res) => {
      res.json({
        message: "Hayoo ngapain?",
      });
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

    app.get("/api/confirmUsername/:username", (req, res) => {
      const username = req.params.username;
      SigUp.findOne({ username }, (err, data) => {
        if (data) {
          res.json({
            message: false,
          });
        } else {
          res.json({
            message: true,
          });
        }
      });
    });

    app.post("/api/login", async (req, res) => {
      const { username, password } = req.query;
      const user = await SigUp.findOne({
        username,
        password,
      }).exec();

      if (user) {
        res.json({
          message: true,
          data: user,
        });
      } else {
        res.json({
          message: false,
        });
      }
    });
    app.post("/api/create", async (req, res) => {
      const { author, title, puisi, puisi_with_header, comment } = req.query;
      const puisinya = new Puisi({
        puisi,
        title,
        author,
        puisi_with_header,
        comment,
      });
      console.log(puisinya);
      await puisinya.save();
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
    app.get("/api/kiriman/", (req, res) => {
      Puisi.find({}, (err, data) => {
        res.json(data);
      });
    });
    app.get("/api/kiriman/:index", (req, res) => {
      Puisi.find({}, (err, data) => {
        res.json(data[req.params.index]);
      });
    });
    app.get("/api/kirimann/acak", (req, res) => {
      Puisi.find({}, (err, data) => {
        // const panjangData = data.length;
        // const acak = Math.floor(Math.random() * panjangData);
        res.json(data[Math.floor(Math.random() * data.length)]);
      });
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
