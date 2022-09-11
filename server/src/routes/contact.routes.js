const express = require("express");
const router = new express.Router();

const Contact = require("../db/models/contact");

router.post("/addContact", async (req, res) => {
  const exsitingContact = await Contact.findOne({ contactNo: req.body.contactNo });
  if (exsitingContact) {
    return res.status(400).send({
      message: "Contact is already Registered",
    });
  }
  const contact = new Contact(req.body);

  try {
    await contact.save();
    res.status(201).send({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message || "Invalid Registration Inputs",
    });
  }
});

router.get("/getContacts", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).send({
      message: error.message || "Failed to fetch Contacts",
    });
  }
});

module.exports = router;
