import express from "express"
import { verifieToken, verifyAdmin, verifyTokenWithoutId } from "../middlewares/auth.js"
import { deleteUser, getUserAsAdmin, getUsers, signup, updateUser, sign, updateUserAsAdmin, getUserAsUser } from "../controllers/user.controller.js"
import { verifyEmail } from "../controllers/user.controller.js"
import { validationEmailPassword } from "../middlewares/emailPasswordValidation.js"

const router = express.Router()

router.post("/sign", sign)

router.post("/signup", validationEmailPassword, signup)

router.get("/get", verifieToken, verifyAdmin, getUsers)

router.get("/get/:id", verifieToken, verifyAdmin, getUserAsAdmin)

router.get("/get-user-as-user", verifyTokenWithoutId, getUserAsUser)

router.delete("/delete/:id", verifieToken, verifyAdmin, deleteUser)

router.put("/update-profile", verifyTokenWithoutId, updateUser)

router.put("/update-user/:id", verifieToken, verifyAdmin, updateUserAsAdmin)

router.put("/verify/:token", verifyEmail)

export default router