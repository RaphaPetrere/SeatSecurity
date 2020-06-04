
exports.up = function(knex) {
  return knex.schema.createTable('locais', function(table) {
    table.increments('localId').primary();
    table.string('nome').notNullable();
    table.string('sigla').notNullable();
    table.string('endereco').notNullable();
    table.string('cidadeUF').notNullable();
    table.string('tipo').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('locais');
};
