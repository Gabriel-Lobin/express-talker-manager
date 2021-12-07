const fs = require('fs/promises');

const talkerIdFind = async (req, res) => {
  const { id } = req.params;
  const talker = await fs.readFile('./talker.json', 'utf8');
  const jsonTalker = await JSON.parse(talker);
  const talkerFind = await jsonTalker.find((talk) => talk.id === Number(id));
  if (talkerFind) return res.status(200).json(talkerFind);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = talkerIdFind;
