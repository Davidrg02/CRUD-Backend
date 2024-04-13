const db = require('../../db/mysql');

const table = 'DEPARTAMENTO';
const idField = 'idDepartamento';
const nameField = 'departamentoNombre';

function all() {
    return db.all(table);
}

function one(id) { 
    return db.one(table, id, idField);
}

function insert(data) {
    return db.insert(table, data);
}

function update(id, data) {
    return db.update(table, data, id, idField);
}

function remove(id) {
    return db.remove(table, id, idField);
}

function search(name) {
    return db.search(table, nameField, name);
}

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    search
}