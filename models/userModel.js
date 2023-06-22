const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must have username"]
	},
	balances: {
		type: [
			{
				year: {
					type: String
				},
				balance: {
					type: Number
				}
			}
			
		],
		required: [true, "Must have balances"]
	}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
