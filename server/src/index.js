const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
app.use(cors());

require("./db/mongoose");

const contactRouter = require("./routes/contact.routes");
const smslistRouter = require("./routes/smslist.routes");

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client/build/index.html'));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(contactRouter);
app.use(smslistRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
});
