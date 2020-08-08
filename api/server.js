const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const server = express();

const sessionConfig = {
	name: "oreo",
	secret: "keep it safe...",
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: false,
	store: new KnexSessionStore({
		knex: require("../data/db-config.js"),
		tablename: "stored_sessions",
		sidfieldname: "sid",
		createtable: true,
		clearInterval: 1000 * 60 * 60,
	}),
};

const userRouter = require("../users/user-router.js");
const authRouter = require("../auth/auth-router.js");

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/users", userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
	res.send("API is UP");
});

module.exports = server;
