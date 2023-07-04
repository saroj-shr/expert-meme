import jwt from "jsonwebtoken";

export async function Authenticate(req, res, next) {
 
  try {
    const token = req.headers.authorization;
    console.log(token,"33333333333333333333333333333333");
    // remove breaer from token 
    const formattedToken = token.replace(/^Bearer\s/, '');
    if (!token) {
      return res.status(401).send("Unauthorized: No Authorization");
    }
    // Verify and decode the token
    const decodedToken = jwt.verify(formattedToken, "your-secret-key");
    const name = decodedToken.name;
    req.name = name;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No Authorization");
    console.log(err);
  }
};


