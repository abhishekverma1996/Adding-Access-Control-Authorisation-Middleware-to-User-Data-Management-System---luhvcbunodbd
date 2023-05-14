const express = require("express");

const {
    login, signup, decodeToken
} = require("../controllers/authControllers");

const { grantAccessTo } = require("../middlewares/grantAccessTo");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/decode', grantAccessTo(["user", "admin", "superadmin"]), decodeToken)

module.exports = router;
