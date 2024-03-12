const express = require("express");
const path = require("path");
const jsonData = require("./singers.json");
const {singers} = jsonData;

const app = express();

app.get("/", (req, res) => {
  res.send("網站首頁");
});

app.get("/singer/:id.html", (req, res) => {
  const {id} = req.params;

  let result = singers.find(singer => parseInt(id) === singer.id);

  if(result){
    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${result.singer_name} Page</title>
    </head>
    <body>
      <h1>${result.singer_name}</h1>
      <img src="${result.singer_img}" alt="">
    </body>
    </html>`);
  }else{
    res.status(404).set("Ben", "Server").send("<h1>找不到頁面</h1>");
  }
});

app.get("/api/singer/:id", (req, res) => {
  const {id} = req.params;

  let result = singers.find(singer => parseInt(id) === singer.id);

  if(result){
    res.status(200).json(result);
  }else{
    res.status(404).json({error: "找不到"});
  }
});

app.get("/netflix", (req, res) => {
  res.redirect("https://www.netflix.com/tw/");
});

app.get("/download", (req, res) => {
  res.download(path.resolve(__dirname, "singers.json"));
});

app.get("/content", (req, res) => {
  res.sendFile(path.resolve("test.html"));
});

app.listen(3000, () => {
  console.log("伺服器已啟動於 http://localhost:3000");
})