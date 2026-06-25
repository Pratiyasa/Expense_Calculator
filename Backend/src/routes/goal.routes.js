import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";

import {createGoal,getGoals,updateGoal,deleteGoal} from "../controllers/goal.controller.js";


const router =Router();

router.use(verifyJWT);


router.route("/").post(createGoal).get(getGoals);


router.route("/:id").put(updateGoal).delete(deleteGoal);


export default router;