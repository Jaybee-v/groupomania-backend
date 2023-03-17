const express = require("express")
const router = express.Router()
const commentCtrl = require("../controllers/commentary")

router.post("/", commentCtrl.addComment)
router.get("/:id", commentCtrl.getCommentsByPostId)
router.put("/like/:id", commentCtrl.likeComment)

module.exports = router
