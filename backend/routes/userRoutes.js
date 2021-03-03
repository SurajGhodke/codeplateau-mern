import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  signout,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//router.post("/", registerUser);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
router.get("/signout", signout);

export default router;
