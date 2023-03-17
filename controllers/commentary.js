const Comment = require("../models/commentary")
const Post = require("../models/post")

exports.addComment = (req, res, next) => {
    const commentObj = req.body.comment
    const postId = req.body.comment.postId
    delete commentObj._id
    delete commentObj._userId
    const comment = new Comment({
        ...commentObj,
        userId: req.body.comment.userId,
    })
    comment
        .save()
        .then(() => {
            console.log(res.status)
            // Post.findOne({ _id: postId }).then(() => {
            //     Post.updateOne(
            //         { _id: postId },
            //         { $inc: { commentsNumber: +1 } }
            //     )
            //         .then(() =>
            //             res.status(200).json({ message: "Post modifié" })
            //         )
            //         .catch((err) => res.status(400).json({ err }))
            // })
            res.status(201).json({ message: "Nouveau commentaire publié" })
        })
        .catch((err) => res.status(400).json({ error }))
}

exports.getCommentsByPostId = (req, res, next) => {
    const postId = req.params.id
    Comment.find()
        .then((comments) => {
            const commentsForPost = comments.filter((c) => c.postId === postId)
            res.status(200).json(commentsForPost)
        })
        .catch((err) => res.status(400).json({ err }))
}

exports.likeComment = (req, res, next) => {
    const userId = req.body.userId
    const likeStatus = req.body.like
    const commentId = req.params.id
    Comment.findOne({ _id: commentId }).then((comment) => {
        switch (likeStatus) {
            case 1:
                if (!comment.usersLiked.includes(userId)) {
                    Comment.updateOne(
                        { _id: commentId },
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
                if (comment.usersLiked.includes(userId)) {
                    Comment.updateOne(
                        { _id: commentId },
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
