
exports.up = function(knex) {
  return knex.schema.createTable('locais', function(table) {
    table.increments('localId').primary();
    table.string('nome').notNullable();
    table.string('sigla');
    table.string('endereco').notNullable();
    table.string('cidadeUF').notNullable();
    table.string('tipo').notNullable();
    table.decimal('preco', undefined, 2).notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('locais');
};
