import { Router } from "express";

import {
 registerUser,
 loginUser,
 logoutUser,
 refreshAccessToken,
 getCurrentUser,
 updateUserProfile
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();



// PUBLIC ROUTES

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken);


// PROTECTED ROUTES
router.route("/logout").post(verifyJWT,  logoutUser);
router.route("/current-user").get(verifyJWT,getCurrentUser);
router.route("/update-profile").put( verifyJWT, updateUserProfile);


export default router;
