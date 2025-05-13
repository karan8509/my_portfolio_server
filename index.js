const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendEmail } = require("./config/mailer");
const { sendEmailSubscribe } = require("./config/mailer");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 8080;

app.post("/userSend", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendEmail({ name, email, message });
    res.json({ message: `Email sent successfully to ${email}`, success: true });
  } catch (error) {
    res.json({
      message: "Server error ",
      error: error.message,
      success: false,
    });
  }
});

app.post("/userSubscribe", async (req, res) => {
  try {
    const { subscribe } = req.body;
    await sendEmailSubscribe({ subscribe });
    res.json({ message: `Email sent successfully to ${subscribe}` });
  } catch (error) {
    console.log("----> ", error.message);
    res.json({ message: "server error ", error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send(`Server is running succesfully`);
});
app.listen(PORT, () => {
  console.log(`server runing on http://localhost:${PORT}`);
});
