const Post = require("../models/post")
const fs = require("fs")
const User = require("../models/user")

exports.getAllPosts = (req, res, next) => {
    Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }))
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error }))
}

exports.addPost = (req, res, next) => {
    const postObj = req.body.post
    delete postObj._id
    delete postObj._userId
    const post = new Post({
        ...postObj,
        userId: req.body.post.userId,
        // imageUrl:
        //     `${req.protocol}://${req.get("host")}/images/posts/${
        //         req.file.filename
        //     }` || null,
    })
    console.log(post)
    post.save()
        .then(() =>
            res.status(201).json({ message: "Nouveau post enregistré!" })
        )
        .catch((error) => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.auth.userId) {
                res.status(401).json({ message: "User unauthorized" })
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Post deleted" })
                    })
                    .catch((error) => res.status(401).json({ error }))
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

exports.editPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (post.userId != req.body.userId) {
                res.status(401).json({ message: "Utilisateur non autorisé!" })
            } else {
                Post.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: "Post modifié" })
                    )
                    .catch((error) => res.status(400).json({ error }))
            }
        })
        .catch((error) => res.status(401).json({ error }))
}

exports.likePost = (req, res, next) => {
    const userId = req.body.userId
    const likeStatus = req.body.like
    const postId = req.params.id
    Post.findOne({ _id: postId }).then((post) => {
        console.log(post)
        switch (likeStatus) {
            case 1:
                if (!post.usersLiked.includes(userId)) {
                    Post.updateOne(
                        { _id: postId },
                        {
                            $inc: { likes: +1 },
                            $push: { usersLiked: userId },
                        }
                    )
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: "Like has been increased !" })
                        )
                        .catch((error) => res.status(400).json(error))
                    break
                }

            case 0:
                if (post.usersLiked.includes(userId)) {
                    Post.updateOne(
                        { _id: postId },
                        { $inc: { likes: -1 }, $pull: { usersLiked: userId } }
                    )
                        .then(() => {
                            res.status(200).json({
                                message: "Like has been canceled",
                            })
                        })
                        .catch((error) => res.status(400).json(error))
                }

                break
        }
    })
}
