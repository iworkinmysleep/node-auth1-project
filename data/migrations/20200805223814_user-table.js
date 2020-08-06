exports.up = function (knex) {
	return knex.schema
		.createTable("saved_user", (tbl) => {
			tbl.increments();

			tbl.string("name", 128).notNullable().unique();
		})
		.createTable("users", (tbl) => {
			tbl.increments();

			tbl.string("username", 128).notNullable().unique().index();
			tbl.string("password", 256).notNullable();
			tbl.integer("saved").unsigned().references("saved_user.id");
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists("saved_user").dropTableIfExists("users");
};
