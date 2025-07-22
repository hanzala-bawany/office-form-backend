import express from "express"
import { signupController , loginController , userVerification , verificationCodeDeleterAfter3m , resendCode }  from "../controllers/authController.js"

const authRoutes = express.Router()


authRoutes.post("/signup" , signupController)
authRoutes.post("/login" , loginController)
authRoutes.post("/userVerification" , userVerification)
authRoutes.post("/verificationCodeDeleterAfter3m" , verificationCodeDeleterAfter3m)
authRoutes.post("/resendCode" , resendCode)

export {authRoutes}