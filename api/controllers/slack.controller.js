import { sendUserDetailsToSlack } from "../utils/Slack.js";

// Controller to handle sending user details to Slack
export const sendUserDetails = async (req, res) => {
  const { name, email } = req.body;

  // Validate incoming data
  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  try {
    // Call the function to send data to Slack
    await sendUserDetailsToSlack({ name, email });
    res.status(200).json({ message: "User details sent to Slack successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send user details to Slack" });
  }
};
