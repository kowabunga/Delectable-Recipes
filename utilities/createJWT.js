import jwt from 'jsonwebtoken';
const createJwt = payload => {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: Date.now() + '7d',
  });
};

export default createJwt;
