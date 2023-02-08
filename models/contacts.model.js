const mongoose = require("mongoose");

const schemaContacts = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  website: String,
  street: String,
  city: String,
  zipcode: String,
  companyName: String,
  facebook: String,
  twitter: String,
  linkedin: String,
  profileURL: String,
});

const modelContacts = mongoose.model("contacts", schemaContacts);

module.exports = modelContacts;
