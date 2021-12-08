const fs = require('fs/promises');

const searchTalker = async (req, res) => {  
  const { q } = req.query;
  const retorno = await fs.readFile('./talker.json', 'utf8');
  const jsonRetorno = await JSON.parse(retorno);
  const filteredTalker = await jsonRetorno.filter((talker) => talker.name.includes(q));    
  const newData = JSON.stringify(filteredTalker);
  fs.writeFile('./talker.json', newData);
  return res.status(200).json(filteredTalker);
};

module.exports = searchTalker;
