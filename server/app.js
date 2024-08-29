const express = require("express");
const sequelizeConnect = require("./connection/database");
const bodyParser = require("body-parser");
const cors = require("./utils/cors");
const serverError = require("./utils/server-error");
const multerConfig = require("./utils/multer");
const routes = require("./routes/main-routes");
const menuController = require("./controllers/menu");

const app = express();
const port = process.env.PORT || 3003;

app.use(multerConfig);
app.use(bodyParser.json());
app.use("/assets", express.static("public"));
app.use("/api", cors, routes);
app.use(serverError);
app.use("*", (req, res, next) => {
  res.status(404).json({ success: false, message: "Resource unavailable." });
});
app.use(routes);

sequelizeConnect
  .sync({
    //force: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started @ PORT ${port}`);
      menuController.seedMenu();
    });
  })
  .catch((err) => {
    console.error(err);
  });
