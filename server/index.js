const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(require("./routes/routes"));

app.listen(8081, (req, res) => {
  console.log("It's working");
});
