
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', function(table) {
    table.increments('id');
    table.string('title');
    table.text('solution');
    table.integer('lookupCount');
    table.dateTime('createdAt');
    table.dateTime('updatedAt');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('post');
};
