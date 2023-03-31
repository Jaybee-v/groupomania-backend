const AvatarModel = require("../models/avatar-user")

exports.postAvatarUser = (req, res, next) => {
    console.log(req.body)
    const avatarObj = JSON.parse(req.body.avatar)
    delete avatarObj._id
    delete avatarObj._userId
    const avatar = new AvatarModel({
        ...avatarObj,
        userId: avatarObj.userId,
        imageUrl: req.file
            ? `${req.protocol}://${req.get("host")}/images/avatar/${
                  req.file.filename
              }`
            : null,
    })
    avatar
        .save()
        .then(() => res.status(201).json({ message: "Avatar ajouté" }))
        .catch((err) => res.status(400).json({ err }))
}

exports.getAvatarUser = (req, res, next) => {
    AvatarModel.findOne({ userId: req.params.id })
        .then((avatar) => res.status(200).json(avatar))
        .catch((err) => console.log(err))
}

exports.deleteAvatar = (req, res, next) => {
    console.log(req.auth)
    AvatarModel.findOne({ _id: req.params.id })
        .then((avatar) => {
            if (avatar.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized to do this." })
            } else {
                AvatarModel.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Avatar supprimé" })
                    })
                    .catch((err) => console.log(err))
            }
        })
        .catch((err) => console.log(err))
}

exports.editAvatar = (req, res, next) => {
    console.log(req.body)
    const obj = req.file
        ? {
              ...JSON.parse(req.body),
              imageUrl: `${req.protocol}://${req.get("host")}/images/avatar/${
                  req.file.filename
              }`,
          }
        : { ...req.body }
    delete obj._userId
    AvatarModel.findOne({ _id: req.params.id })
        .then((avatar) => {
            if (avatar.userId != req.body.userId) {
                res.status(401).json({ message: "Not authorized to do this." })
            } else {
                AvatarModel.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() => {
                        res.status(200).json({ message: "Avatar updated" })
                    })
                    .catch((error) => res.status(400).json({ error }))
            }
        })
        .catch((error) => res.status(401).json({ error }))
}
