const fs = require('fs/promises');

const deleteTalker = async (req, res) => {
  const { id } = req.params;
  const retorno = await fs.readFile('./talker.json', 'utf8');
  const jsonRetorno = await JSON.parse(retorno);
  const talkerToEdit = jsonRetorno.filter((talker) => talker.id !== Number(id));  
  const newData = JSON.stringify(talkerToEdit);
  fs.writeFile('./talker.json', newData);
    return res.status(200).json({
        message: 'Pessoa palestrante deletada com sucesso',
    });
};

module.exports = deleteTalker;
