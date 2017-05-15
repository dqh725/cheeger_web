
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments('id');
    table.string('title');
    table.string('solution');
    table.integer('lookupcount');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
