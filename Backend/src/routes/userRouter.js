const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signInController);

module.exports = userRouter;

