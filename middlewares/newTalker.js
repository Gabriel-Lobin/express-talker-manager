const fs = require('fs/promises');

const validateAut = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const condition = (talk) => {
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return true;
  }
  return false;
};
const validateWatchedAt = (req, res, next) => {
  const regexData = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const { talk } = req.body;
  if (condition(talk)) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regexData.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;  
  if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const addNewTalk = async (req, res) => {  
    const { name, age, talk } = req.body;
  const retorno = await fs.readFile('./talker.json', 'utf8');  
  const jsonRetorno = await JSON.parse(retorno);  
    const Newid = jsonRetorno.length + 1;
    const newObject = {
      name,
      age,
      id: Newid,
      talk: { watchedAt: talk.watchedAt, rate: talk.rate },
    };
    jsonRetorno.push(newObject);
    const newData = JSON.stringify(jsonRetorno);
    fs.writeFile('./talker.json', newData);  
  return res.status(201).json(newObject);
};

module.exports = {
  validateAut,
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  addNewTalk,
};

// https://www.ti-enxame.com/pt/javascript/validar-data-no-formato-dd-mm-aaaa-usando-o-jquery-validate/1046988445/
// regex para validar data
