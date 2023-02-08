const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const connectionURL = `mongodb+srv://${username}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionURL).then(
  () => {
    console.log("DB connection established");
  },
  (error) => {
    console.error("Error in connection : ", error);
    throw error;
  }
);

mongoose.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
