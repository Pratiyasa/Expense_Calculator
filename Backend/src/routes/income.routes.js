import { Router } from "express";

import verifyJWT from "../middlewares/auth.middleware.js";

import {createIncome,getIncome} from "../controllers/income.controller.js";

const router =Router();

router.use(verifyJWT);

router.route("/").post(createIncome).get(getIncome);

export default router;