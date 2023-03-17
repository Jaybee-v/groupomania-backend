const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")
const app = express()
require("dotenv").config()

app.use(bodyParser.json())

// Connect to MongoDB
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v2pkd.mongodb.net/?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"))

// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")

app.use("/user", userRoutes)
app.use("/post", postRoutes)

module.exports = app