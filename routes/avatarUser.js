const express = require("express")
const router = express.Router()
const avatarUserCtrl = require("../controllers/avatarUser")
const multer = require("../middlewares/multerAvatar-config")

router.get("/:id", avatarUserCtrl.getAvatarUser)
router.post("/", multer, avatarUserCtrl.postAvatarUser)
router.put("/:id", avatarUserCtrl.editAvatar)
router.delete("/:id", avatarUserCtrl.deleteAvatar)

module.exports = router
