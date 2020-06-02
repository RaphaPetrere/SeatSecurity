
exports.up = function(knex) {
  return knex.schema.createTable('cartoes', function (table) {
    table.integer('numCartao').primary().notNullable();
    table.string('nomeCartao').notNullable();
    table.integer('userId').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.foreign('userId').references('userId').inTable('users');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cartoes');
};
