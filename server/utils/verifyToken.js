import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.access_token;
    if(!token) {
        return res.status(500).send("Invalid token");
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if(err) {
            return res.status(500).send("Token is not valid");
        }
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(500).send("User is not valid");
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return res.status(500).send("Admin is not valid");
      }
    });
  };
