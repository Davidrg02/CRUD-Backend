const db = require('../../db/mysql');

const table = 'PERSONA_habita_VIVIENDA';
const idField = 'VIVIENDA_idVivienda';
//const nameField = 'viviendaDireccion';

async function all() {
    try {
        const query = `
            SELECT 
                v.idVivienda, 
                v.viviendaDireccion, 
                p.idPersona, 
                p.personaNombre, 
                p.personaApellido
            FROM 
                VIVIENDA v
            JOIN 
                PERSONA_habita_VIVIENDA phv ON v.idVivienda = phv.VIVIENDA_idVivienda
            JOIN 
                PERSONA p ON phv.PERSONA_idPersona = p.idPersona
        `;
        
        // Ejecuta la consulta SQL
        const result = await db.customQuery(query);

        // Procesa los resultados para estructurarlos como se requiere
        const viviendaPersonas = result.reduce((accumulator, item) => {
            // Encuentra una vivienda existente en el acumulador o crea una nueva
            let vivienda = accumulator.find(v => v.idVivienda === item.idVivienda);
            if (!vivienda) {
                vivienda = {
                    idVivienda: item.idVivienda,
                    viviendaDireccion: item.viviendaDireccion,
                    habitantes: []
                };
                accumulator.push(vivienda);
            }
            // Añade la persona a la lista de habitantes de la vivienda
            vivienda.habitantes.push({
                idPersona: item.idPersona,
                personaNombre: item.personaNombre,
                personaApellido: item.personaApellido
            });
            return accumulator;
        }, []);

        return viviendaPersonas;
    } catch (error) {
        throw new Error('Error al obtener las viviendas y sus habitantes: ' + error.message);
    }
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
/*
function search(name) {
    return db.search(table, nameField, name);
}*/

module.exports = {
    all,
    one,
    insert,
    update,
    remove,
    //search
}