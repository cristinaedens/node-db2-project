exports.up = function(knex) {
    // remember to "return" the call to knex.schema
    return knex.schema.alterTable('cars', (tbl) => {
        tbl.text('transmission')
    })
};

exports.down = function(knex) {
    // remove (drop) the cars table
    return knex.schema.alterTable("cars", (table) => {
        table.dropColumn('transmission')
    })
};