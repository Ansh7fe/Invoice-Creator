const asyncHandler = require("express-async-handler");
const Invoice = require("../models/invoiceModel");
const User = require("../models/userModel");

exports.createInvoice = asyncHandler(async (req, res) => {
	const { date, userId, accountArray, year } = req.body;
	const invoiceNumber = Math.floor(Math.random() * 1000).toString();
	let totalAmount = 0;

	for (let i = 0; i < accountArray.length; i++) {
		totalAmount += parseInt(accountArray[i].amount);
	}

	console.log(accountArray);
	const invoice = new Invoice({
		date: date,
		userId: userId,
		accountArray: accountArray,
		invoiceNumber: invoiceNumber,
		totalAmount: totalAmount.toString(),
		year: year
	});
	await invoice.save();
	if (invoice) {
		res.status(201).json({ invoice: invoice });
	} else {
		res.status(401);
		res.json({
			message: "Invalid invoice data"
		});
		throw new Error("Invalid invoice data");
	}
});

exports.getAllPosts = async (req, res) => {
	try {
		const keyword = req.query.keyword || '';
		const userRegex = new RegExp(keyword, 'i');
		const users = await User.find({ name: userRegex }).select('_id');
		console.log("Users: ", users);

		const totalAmountRegex = new RegExp(keyword, 'i');
		console.log({ $regex: totalAmountRegex })
		const invoices = await Invoice.find({
			$or: [
				{ invoiceNumber: { $regex: keyword, $options: 'i' } },
				{ userId: { $in: users.map(user => user._id) } },
				{ totalAmount: { $regex: totalAmountRegex } }
			]
		}).select('invoiceNumber userId totalAmount');
		console.log("Invoices: ", invoices);

		res.status(200).json({
			status: 'success',
			invoiceList: invoices
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: 'Failed',
			message: err.message
		});
	}
};
