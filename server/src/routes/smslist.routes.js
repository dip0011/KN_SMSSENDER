const express = require("express");
const router = new express.Router();
const Smslist = require("../db/models/smslist");
const Contact = require("../db/models/contact");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.post("/addSmslist", async (req, res) => {
  
  try {
    const { text, otp, contactDetails } = req.body;
    console.log(text, otp, `+91${contactDetails.contactNo}`);
    client.messages
    .create({
      body: text,
      from: process.env.TWILIO_NUMBER,
      to: `+91${contactDetails.contactNo}`
    }).then(async (message) => {
        await Smslist.create({
          contact: contactDetails._id,
          otp,
          sid: message.sid
        });
        res.status(201).send({ message: "Sms Listed successful" })
      }
    ).catch(error =>
      res.status(400).send({ message: error.message || "Something went wrong" })
    )
  } catch (error) {
    res.status(400).send({ message: error.message || "Something went wrong" });
  }
});

router.get("/getSmslist", async (req, res) => {
  try {
    const smslist = await Smslist.find({}).populate({path:'contact', model: Contact}).sort({"updatedAt":-1})
    res.status(200).json({
      smslist,
    });
  } catch (error) {
    res.status(400).send({ message: error.message || "Failed to fetch Smslists" });
  }
});

module.exports = router;