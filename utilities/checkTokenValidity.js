import jwt from 'jsonwebtoken';

const checkIfTokenValid = token => {
  return jwt.verify(token, process.env.SECRET);
};

export default checkIfTokenValid;
