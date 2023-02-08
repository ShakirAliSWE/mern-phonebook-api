const modelContacts = require("../models/contacts.model");

const getAllContacts = async () => {
  return await modelContacts.find({});
};

const saveContact = async (data, success = () => {}) => {
  const resposne = new modelContacts(data);
  resposne.save().then(success);
};

module.exports = { getAllContacts, saveContact };
