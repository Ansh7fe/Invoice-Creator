const express = require("express");
const app = express();
const userRouter = require("./routes/userRoute");
const invoiceRouter = require("./routes/invoiceRoute");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/invoice", invoiceRouter);

module.exports = app;
