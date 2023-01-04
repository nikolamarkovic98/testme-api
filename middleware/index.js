const jwt = require("jsonwebtoken");

const checkJWT = async (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        req.logged = false;
        return next();
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        req.logged = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = await jwt.verify(token, "mysecretkey");
    } catch (err) {
        console.log(err);
        req.logged = false;
        return next();
    }
    if (!decodedToken) {
        req.logged = false;
        return next();
    }

    req.logged = true;
    req.userId = decodedToken.userId;
    next();
};

const CORS = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
};

module.exports = {
    checkJWT,
    CORS,
};
