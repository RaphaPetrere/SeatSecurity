
exports.up = function(knex) {
    return knex.schema.createTable('viagens', function(table) {
      table.increments('viagemId').primary();
      table.string('origem').notNullable();
      table.string('destino').notNullable();
      table.date('data').notNullable();
      table.time('hora').notNullable();
      table.integer('qtdPessoas').notNullable();
      table.decimal('preco', undefined, 2).notNullable(); 

      table.string('userId').notNullable();
      table.string('localId').notNullable();

      table.foreign('userId').references('userId').inTable('users');
      table.foreign('localId').references('localId').inTable('locais');

    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable('viagens');
  };