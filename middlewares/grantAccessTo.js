const jwt = require('jsonwebtoken');

const JWT_SECRET = 'newtonSchool';

/*
Write a middleware function that checks if the user's role matches with the one given passed in the middleware as an array of roles. The token should be passed in the authorization header, the middle should return a 403 status code if the user's role is not present in the roles array and a 401 status code if the token is invalid or missing.

Possible Cases: 
1. Token is missing : { message: 'Authentication failed: Missing token.', status: "Error"}
2. Token is invalid : { message: 'Authentication failed: Invalid token.' , status: "Error"}
3. Role Doesn't Match: { message: 'Access Denied', status: "Error" }
*/

function grantAccessTo(roles) {
  return async function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Authentication failed: Missing token.", status: "Error" });
    }
    //Write your code here;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.sub);
      if (!user) {
        return res.status(401).json({ message: "Authentication failed: Invalid token.", status: "Error" });
      }
      req.user = user;
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Access Denied", status: "Error" });
      }
      next();
    try{
    } catch (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token.', status: "Error" });
    }
  }
}

module.exports = grantAccessTo;

