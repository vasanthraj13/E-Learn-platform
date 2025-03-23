const jwt = require('jsonwebtoken');

const jwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    // Handle JWT verification errors
    console.error('JWT verification error:', error.message);
    throw new Error('Failed to verify JWT token');
  }
};

const jwtSign = (payload) => {
  try {
    return jwt.sign(payload, process.env.SECRET_KEY);
  } catch (error) {
    // Handle JWT signing errors
    console.error('JWT signing error:', error.message);
    throw new Error('Failed to sign JWT token');
  }
};

module.exports = { jwtSign, jwtVerify };
