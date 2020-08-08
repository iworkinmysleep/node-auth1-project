const router = require("express").Router();
const bcrypt = require("bcryptjs");
const users = require("../users/users-model.js");

router.post("/register", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;

	try {
		const newUser = await users.add(user);
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
