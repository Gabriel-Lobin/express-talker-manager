const fs = require("fs/promises");
const getTalkers = async (req, res, next) => {
  const talker = await fs.readFile("./talker.json", "utf8");
  if (talker === undefined) return res.status(200).json([]);
  const retorno = JSON.parse(talker);
  return res.status(200).json(retorno);
};

module.exports = getTalkers;
