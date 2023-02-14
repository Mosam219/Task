const jwt = require("jsonwebtoken");

const JWT_TOKEN = 'some-secret-no-one-can-guess';

module.exports['sign'] = async function sign(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_TOKEN,
      (err, encoded) => {
        if (err) return reject(err);
        else return resolve(encoded);
      }
    );
  });
}

module.exports['decode'] = async function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_TOKEN, (err, decoded) => {
      if (err) return reject(err);
      else return resolve(decoded);
    });
  });
}