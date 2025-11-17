import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controllers.js";

const router = Router()

router.post("/sendOtp",sendOtp)
router.post("/verifyOtp",verifyOtp)

export default router;