const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    // console.log(bearerHeader)

    if (!bearerHeader || !bearerHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Access Denied:No token Provide" })

    }
    const token = bearerHeader.split(" ")[1];
    const JWT_SECRET = "Ajay";

    // console.log(token)



    try {
        const Varify = jwt.verify(token, JWT_SECRET);

        req.user = Varify;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(403).json({ message: "token invalid or expire" })
    }
}

module.exports = auth;