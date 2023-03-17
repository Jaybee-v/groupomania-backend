const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                // avatarUrl: `${req.protocol}://${req.get("host")}/images/${
                //     req.file.filename
                // }`,
            })
            user.save()
                .then(() =>
                    res.status(201).json({ message: "New user registered" })
                )
                .catch((error) => res.status(400).json({ error }))
        })
        .catch((error) => res.status(500).json({ error }))
}

exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user === null) {
                res.status(401).json({ message: "Incorrect email or password" })
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({
                                message: "Incorrect email or password",
                            })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.TOKEN,
                                    { expiresIn: "72h" }
                                ),
                            })
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => res.status(200).json(user))
        .catch((error) => res.status(404).json(error))
}
