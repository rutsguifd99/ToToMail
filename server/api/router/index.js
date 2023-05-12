const Router = require("express").Router;
const authController = require("../controllers/auth-controller.js");
const messageController = require("../controllers/message-controller.js");
const router = new Router();

router.post("/auth", authController.saveEmail);
router.post("/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logoutFromGmail);
router.get("/get-profile", authController.getProfile);

router.post("/messages", messageController.getMessages);
router.post("/send-message", messageController.sendMessage);
router.post("/save-draft", messageController.saveDraft);
router.get("/message", messageController.getMessage);

module.exports = router;
