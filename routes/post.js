const express = require("express")
const router = express.Router()
const postCtrl = require("../controllers/post")
const auth = require("../middlewares/auth")
const multer = require("../middlewares/multer-config")

router.get("/", postCtrl.getAllPosts)
router.get("/:id", postCtrl.getOnePost)
router.post("/", multer, postCtrl.addPost)
router.put("/like/:id", postCtrl.likePost)
router.delete("/:id", auth, postCtrl.deletePost)
router.put("/:id", auth, postCtrl.editPost)

module.exports = router
