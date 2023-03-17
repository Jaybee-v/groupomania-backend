const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    userId: { type: String },
    // imageUrl: { type: String },
    content: { type: String },
    dateAdd: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    commentsNumber: { type: Number, default: 0 },
})

module.exports = mongoose.model("Post", postSchema)
