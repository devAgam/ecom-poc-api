const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
const postgresDB = require("./database/postgres");
const cors = require("cors");

// force: true will drop the table if it already exists
postgresDB.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.use(express.json());
app.use(cors());

app.use("/api/orders", require("./routes/order.routes"));
app.use("/api/products", require("./routes/product.routes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
