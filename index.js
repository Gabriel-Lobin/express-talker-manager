const express = require('express');
const bodyParser = require('body-parser');
const getTalkers = require('./middlewares/getTalkers');
const talkerIdFind = require('./middlewares/talkerIdFind');
const { validateLogin, validatePassword } = require('./middlewares/tokenLogin');
const {
  validateAge,
  validateName,
  validateAut,
  validateTalk,
} = require('./middlewares/newTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// requisito 1
app.get('/talker', getTalkers);
// requisito 2
app.get('/talker/:id', talkerIdFind);
// requisito 3
app.post('/login', validateLogin, validatePassword);
// requisito 4
app.post('/talker', validateAut, validateName, validateAge, validateTalk);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
