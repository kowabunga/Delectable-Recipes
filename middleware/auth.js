import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, unauthorized' });
  }

  //   Verify token
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET);

    // Add user to request parameters
    req.user = verifiedToken.user;

    console.log('Middleware ', req.user);

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

export default auth;
