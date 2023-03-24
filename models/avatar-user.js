const mongoose = require("mongoose")

const avatarUserSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    imageUrl: { type: String },
})

const avatarUserModel = mongoose.model("avatarUser", avatarUserSchema)

module.exports = avatarUserModel
