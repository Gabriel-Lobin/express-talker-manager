const fs = require('fs/promises');
const regexData =
  /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;

const validateAut = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }
  if (authorization !== '7mqaVRXJSp886CGr') {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const newTalker = async () => {
  const { name, age, talk } = req.body;
  const retorno = await fs.readFile('./talker.json', 'utf8');
  const jsonRetorno = JSON.parse(retorno);
  const Newid = jsonRetorno.length + 1;
  const newObject = {
    name,
    age,
    id: Newid,
    talk: { watchedAt: talk.watchedAt, rate: talk.rate },
  };
  jsonRetorno.push(newObject);
  const newData = JSON.stringify(jsonRetorno);
  console.log(JSON.stringify(jsonRetorno));
  fs.writeFile('./talker.json', newData);
}

const validateTalk = (req, res) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  if (!regexData.test(talk.watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate < 1) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  newTalker();
  return res.status(201).json(newObject);
};

module.exports = {
  validateAut,
  validateName,
  validateAge,
  validateTalk,
};

// https://www.ti-enxame.com/pt/javascript/validar-data-no-formato-dd-mm-aaaa-usando-o-jquery-validate/1046988445/
// regex para validar data
