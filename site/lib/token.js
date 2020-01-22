let jwt = require('jsonwebtoken');
let config = require('../jwt_config.js');

module.exports = {
  evaluateJWT: async function(cookies, label) {
    let token = cookies.split(label + '=')[1].split(';')[0];

    return jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return err;
      }
      else {
        return decoded;
      }
    });


    return jwt.verify(token, config.secret)
      .then(decoded => {
        return decoded;
      })
      .catch(err => {
        return err;
      });
  },

  signJWT: async function(tok, exp) {
    return jwt.sign(
      {token: tok},
      config.secret,
      {expiresIn: exp});
  }
}
