const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const validateLogin = (req, res, next) => {
  const { email } = req.body;
  if (!email || email.length === 0) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
const validatePassword = (req, res) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    return res
      .status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({
    token: '7mqaVRXJSp886CGr',
  });
};

module.exports = {
  validateLogin,
  validatePassword,
};

// https://pt.stackoverflow.com/questions/1386/expressão-regular-para-validação-de-e-mail
// regex para validação de email
