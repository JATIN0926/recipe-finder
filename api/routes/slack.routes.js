import express from "express";
import { sendUserDetails } from "../controllers/slack.controller.js"; // Import the controller

const router = express.Router();

// Define the route and use the controller
router.post("/send-user-details", sendUserDetails);

export default router;
