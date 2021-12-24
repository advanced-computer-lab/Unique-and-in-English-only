const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/UserController');

userRouter.post("/signUp", userController.signUp);
userRouter.post("/signIn", userController.signInController);
userRouter.post("/pay", userController.pay);
userRouter.post("/logOut", userController.logOutController);
userRouter.post("/EditPassword", userController.EditPassword);

module.exports = userRouter;

