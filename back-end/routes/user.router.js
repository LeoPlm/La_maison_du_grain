import express from "express"
import { verifieToken, verifyAdmin } from "../middlewares/auth.js"
import { deleteUser, getUserById, getUsers, signup, updateUser, sign, updateUserAsAdmin } from "../controllers/user.controller.js"
import { verifyEmail } from "../controllers/user.controller.js"
import { validationEmailPassword } from "../middlewares/emailPasswordValidation.js"

const router = express.Router()

router.post("/sign", sign)

router.post("/signup", validationEmailPassword, signup)

router.get("/get", verifieToken, verifyAdmin, getUsers)

router.get("/get/:id", verifieToken, verifyAdmin, getUserById)

router.delete("/delete/:id", verifieToken, verifyAdmin, deleteUser)

router.put("/update-profile/:id", verifieToken, updateUser)

router.put("/update-user/:id", verifieToken, verifyAdmin, updateUserAsAdmin)

router.put("/verify/:token", verifyEmail )

export default router