const fs = require('fs/promises');

const editTalker = async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const retorno = await fs.readFile('./talker.json', 'utf8');
  const jsonRetorno = await JSON.parse(retorno);
  const talkerToEdit = jsonRetorno.filter((talker) => talker.id !== Number(id));
  const newObject = {
    name,
    age,
    id: Number(id),
    talk: { watchedAt: talk.watchedAt, rate: talk.rate },
  };
  talkerToEdit.push(newObject);
  const newData = JSON.stringify(talkerToEdit);
  fs.writeFile('./talker.json', newData);
  return res.status(200).json(newObject);
};

module.exports = {
  editTalker,
};
