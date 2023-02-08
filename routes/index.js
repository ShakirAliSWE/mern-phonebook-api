const router = require("express").Router();
const fs = require("fs");
const public_profile = "./public/profile";

const {
  getAllContacts,
  saveContact,
} = require("../controllers/contacts.controller");

router.post("/contacts", async (req, res) => {
  const contacts = await getAllContacts();
  return res.status(200).send({
    message: `Record found successfully`,
    data: contacts,
  });
});

router.post("/save-contact", async (req, res) => {
  let data = req.body;
  let files = req.files;
  try {
    if (files && files.profile) {
      fs.mkdir(public_profile, { recursive: true }, (err) => {
        console.error("Error creating profile folder");
      });

      const profile = files.profile;
      const profileName = "profile/" + uniqString() + ".png";
      profile.mv(`./public/${profileName}`);
      data = { ...data, profileURL: profileName };
    } else {
      data = { ...data, profileURL: null };
    }

    saveContact(data, () => {
      return res.status(200).send({
        message: `Record added successfully`,
        data: data,
      });
    });
  } catch (err) {
    return res.status(403).send({
      message: `Error ${err.message}`,
      data: [],
    });
  }
});

router.get("*", (req, res) => {
  return res.status(403).send({
    message: `Sorry, No api found`,
  });
});

router.post("*", (req, res) => {
  return res.status(403).send({
    message: `Sorry, No api found`,
  });
});

function uniqString(length = 16) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

module.exports = router;
