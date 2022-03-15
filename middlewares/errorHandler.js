const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  switch (err.name) {
    case 'ValidationError':
    case 'MongoServerError':
      res.status(400).json({ message: err.message });
      break;
    case 'EMPTY_EMAIL_OR_PASSWORD':
      res.status(400).json({ message: "Can't empty email/password" });
      break;
    case 'UNAUTHORIZED':
      res.status(400).json({ message: 'Login first' });
      break;
    case 'AUTHENTICATION':
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid token' });
      break;
    case 'USER_NOT_FOUND':
      res.status(401).json({ message: 'Invalid email/password' });
      break;
    default:
      res.status(500).json({ message: 'internal server error' });
      break;
  }
};

module.exports = errorHandler;
