const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.signup = asyncHandler(async (req, res) => {
	const { name, balances } = req.body;

	const user = new User({
		name: name,
		balances: balances
	});
	await user.save();
	if (user) {
		res.status(201).json({ user: user });
	} else {
		res.status(401);
		res.json({
			message: "Invalid user data"
		});
		throw new Error("Invalid user data");
	}
});
