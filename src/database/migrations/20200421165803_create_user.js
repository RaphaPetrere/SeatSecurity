
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('userId').primary();
    table.string('email').notNullable();
    table.integer('cpf').notNullable();
    table.specificType('senha', 'varchar(10)').notNullable();
    table.string('nome').notNullable();
    table.string('foto');
    table.string('tipo').defaultTo('usuario').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

  });
};

exports.down = function(knex) {
   return knex.schema.dropTable('users');
};
