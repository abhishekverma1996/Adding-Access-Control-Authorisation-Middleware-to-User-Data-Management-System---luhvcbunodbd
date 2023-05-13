const express = require("express");

const {
    login, signup, decodeToken
} = require("../controllers/authControllers");
const { grantAccessTo } = require("../middlewares/grantAccessTo");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get('/decode', decodeToken)
router.get('/api/v1/users', grantAccessTo(['user', 'admin', 'superadmin']), getAllUsers);
router.get('/api/v1/users/:id', grantAccessTo(['user', 'admin', 'superadmin']), getUserByID);
router.post('/api/v1/users', grantAccessTo(['guest', 'user', 'admin', 'superadmin']), createUser);
router.patch('/api/v1/users/:id', grantAccessTo(['admin', 'superadmin']), updateUser);
router.delete('/api/v1/users/:id', grantAccessTo(['superadmin']), deleteUser);


module.exports = router;
