const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = "3000";

app.get("/talker", async (req, res, next) => {
  const talker = await fs.readFile("./talker.json", (err, content) => {
    if (err) return res.status(200).json([]);
    return content;
  });
  console.log(JSON.parse(talker));
  return res.status(200).json(JSON.parse(talker));
  next();
});
// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log("Online");
});
