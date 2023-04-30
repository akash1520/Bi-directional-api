require("dotenv").config()
const jwt = require('jsonwebtoken');

const payload = {
  user: {
    id: '45361',
    username: 'johndoe'
  }
 };

const token = jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: 120 });

console.log(token);
