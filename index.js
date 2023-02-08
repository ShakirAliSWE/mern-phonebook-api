require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = express();

/////////// CONNECT MANGOO DB START /////////////////////
require("./config/mangoDB");
/////////// CONNECT MANGOO DB END /////////////////////

const port = process.env.PORT;

/////////// MIDDLEWARES START /////////////////////

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ createParentPath: true }));

app.use(morgan("dev"));
app.use(require("./routes"));

/////////// MIDDLEWARES END /////////////////////

/////////// SERVER START INFO  /////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
