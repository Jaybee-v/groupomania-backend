const express = require("express")
const router = express.Router()
const avatarUserCtrl = require("../controllers/avatarUser")
const multer = require("../middlewares/multerAvatar-config")
const auth = require("../middlewares/auth")

router.get("/:id", avatarUserCtrl.getAvatarUser)
router.post("/", multer, avatarUserCtrl.postAvatarUser)
// router.put("/:id", auth, avatarUserCtrl.editAvatar)
router.delete("/:id", auth, avatarUserCtrl.deleteAvatar)

module.exports = router
