const jwt = require("jsonwebtoken")


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        return next(new Error("Not authorized!1"));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if(err) {
            res.status(401);
            return next(new Error("Not authorized!2"));
        }
        req.user = decoded.user;
        next();
    })
}

module.exports = verifyToken;
