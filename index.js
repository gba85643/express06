const express = require("express");
const path = require("path");
const jsonData = require("./singer.json");
const { singers } = jsonData;
// console.log(singers);

const app = express();

app.get("/", (req, res) => {
  res.send("網站首頁");
});

app.get("/singer/:id.html", (req, res) => {
  const { id } = req.params;

  let result = singers.find((singer) => parseInt(id) === singer.id);

  if (result) {
    res.send(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${result.singer_name} Page</title>
        </head>
        <body>
          <h1>${result.singer_name}</h1>
          <img src="${result.singer_img}" alt="" />
        </body>
      </html>`);
  } else {
    // http : res.stateCode = 404;
    // 以下是express的方式
    res.status(404);
    res.set("CC", "Server");
    res.send("<h2>Page not found</h2>");
    // 同上
    // res.status(404).set("CC", "Server").send("<h2>Page not found</h2>");
  }
  // console.log(result);

  // res.send(`id = ${req.params.id}`);
  // res.json(result);
});

app.get("/netflix", (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});

app.get("/download", (req, res) => {
  res.download(path.resolve(__dirname, "singer.json"));
});

app.get("/content", (req, res) => {
  res.sendFile(path.resolve("test.html"));
});

app.listen(3000, () => {
  console.log("伺服器已啟動於 http://localhost:3000");
});
