const { Schema, model } = require("mongoose");
const { validateEmail } = require("../utils");

const userSchema = {
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
		auto: true,
	},
	userName: {
		type: String,
		required: true,
		auto: true,
		trimmed: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	thoughts: [
		{
			type: Schema.Types.ObjectId,
			ref: "thought",
			required: false,
		},
	],
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
			required: false,
		},
	],
};

const schema = new Schema(userSchema);

const User = model("user", schema);

module.exports = User;
