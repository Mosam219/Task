const jwt = require("../utils/jwt");
module.exports = async function authByToken(req, res, next) {
    //getting auth header
    // const authHeader = req.headers('Authorization')?.split(' ');
    const authHeader = req.get('Authorization')?.split(' ');

    //checking authheader exists
    if (!authHeader) {
        return res.status(400).json({
            errors: { body: ["Authorization failed", "No Authorization header"] },
        });
    }

    //checking token exists
    if (authHeader[0] != "Token") {
        return res.status(401).json({
            errors: { body: ["Authorization failed", "Token missing"] },
        });
    }

    //checking token is valid
    const token = authHeader[1];
    try {
        const user = await jwt.decode(token);
        if (!user) throw new Error("No user found in token");
        req.user = user;
        return next();
    } catch (e) {
        res.status(400).json({
            errors: { body: ["Authorization failed", (e).message] },
        });
    }
}