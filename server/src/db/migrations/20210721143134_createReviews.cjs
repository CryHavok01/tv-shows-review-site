/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
    table.bigIncrements("id")
    table.text("body").notNullable()
    table.integer("score").notNullable()
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id")
    table.bigInteger("showId").notNullable().unsigned().index().references("shows.id")
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("reviews")
}
