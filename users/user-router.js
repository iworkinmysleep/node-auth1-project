const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("./users-model.js");

router.get("/", (req, res) => {
	users
		.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;
