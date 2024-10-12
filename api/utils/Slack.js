import axios from "axios";

export const sendUserDetailsToSlack = async (user) => {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL; // Get webhook URL from environment variables

    const payload = {
      text: "New User Signup",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New User Details*:\n*Name:* ${user.name}\n*Email:* ${user.email}\n*Joined at:* ${new Date().toLocaleString()}`
          }
        }
      ]
    };

    // Send the POST request to Slack webhook
    const response = await axios.post(webhookUrl, payload);

    if (response.status === 200) {
      console.log("User details successfully sent to Slack");
    } else {
      console.log("Failed to send user details to Slack");
    }
  } catch (error) {
    console.error("Error sending data to Slack:", error);
  }
};
