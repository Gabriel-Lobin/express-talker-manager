const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = "3000";

app.get("/talker", async (req, res, next) => {
  const talker = await fs.readFile("./talker.json", 'utf8');
  if(talker === undefined) return res.status(200).json([])
  const retorno = JSON.parse(talker);
  console.log(retorno);
  return res.status(200).json(retorno);
  next();
});
// não remova esse endpoint, e para o avaliador funcionar
app.get("/", (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log("Online");
});
