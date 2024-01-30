import { Router } from "express";
import { UserSignIn, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "profile",
            maxCount : 1
        }
    ]),
    registerUser)

router.route('/login').post(UserSignIn)

router.route('/logout').post(verifyJWT ,  logoutUser)

router.route('/upload').post(
    upload.fields([
        {
            name : "videoFile",
            maxCount : 1
        },
        {
            name : "thumbnail",
            maxCount : 1
        }
    ]),
    uploadVideo)

export default router