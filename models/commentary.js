const mongoose = require("mongoose")

const commentarySchema = mongoose.Schema({
    userId: { type: String },
    postId: { type: String },
    content: { type: String },
    dateAdd: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
})

module.exports = mongoose.model("Comment", commentarySchema)
