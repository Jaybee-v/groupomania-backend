const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    try {
        // recuperation du token du header Authorization de la requete
        const token = req.headers.authorization.split(" ")[1]
        // decodage du token
        const decodedToken = jwt.verify(token, process.env.TOKEN)
        // recuperation de l'id de l'utilisateur du token
        const userId = decodedToken.userId
        console.log(token)
        req.auth = {
            userId: userId,
        }
        next()
    } catch (error) {
        res.status(403).json({ error })
    }
}
