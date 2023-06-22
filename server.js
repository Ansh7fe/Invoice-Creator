const app = require("./app");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: ".env" });

const DB =
	"mongodb+srv://AnshJ:AnshikaK@cluster0.uuqvmmq.mongodb.net/?retryWrites=true&w=majority";

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("DB connected successfully");
	})
	.catch((err) => {
		console.log(err);
	});
// mongoose.set('strictQuery', true)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log("Server connected succesfully!!");
});
