const db = require('../../db/mysql');

const table = 'EDUCACION';
const idField = 'idEducacion';
const nameField = 'institucionNombre';
const idPersonaField = 'PERSONA_idPersona';

async function all() {
    try {
        const query = `
            SELECT 
                e.idEducacion, 
                e.institucionNombre,
                DATE_FORMAT(e.fechaInicio, '%d/%m/%Y') AS fechaInicio,
                DATE_FORMAT(e.fechaFin, '%d/%m/%Y') AS fechaFin, 
                ne.nivelEducacion,
                p.idPersona, 
                p.personaNombre, 
                p.personaApellido
            FROM    
                EDUCACION e
            JOIN
                NIVEL_DE_EDUCACION ne ON e.NIVEL_DE_EDUCACION_idNivelEducacion = ne.idNivelEducacion
            JOIN 
                PERSONA p ON e.PERSONA_idPersona = p.idPersona
        `;
        
        // Ejecuta la consulta SQL
        const result = await db.customQuery(query);

        return result;
    } catch (error) {
        throw new Error('Error al obtener personas con estudios: ' + error.message);
    }
}


async function one(id) { 
    try {
        const query = `
            SELECT 
                e.idEducacion, 
                e.institucionNombre,
                DATE_FORMAT(e.fechaInicio, '%d/%m/%Y') AS fechaInicio,
                DATE_FORMAT(e.fechaFin, '%d/%m/%Y') AS fechaFin, 
                ne.nivelEducacion,
                p.idPersona, 
                p.personaNombre, 
                p.personaApellido
            FROM    
                EDUCACION e
            JOIN
                NIVEL_DE_EDUCACION ne ON e.NIVEL_DE_EDUCACION_idNivelEducacion = ne.idNivelEducacion
            JOIN 
                PERSONA p ON e.PERSONA_idPersona = p.idPersona
            WHERE
                p.idPersona = ${id}
        `;
        
        // Ejecuta la consulta SQL
        const result = await db.customQuery(query);

        return result;
    } catch (error) {
        throw new Error('Error al obtener personas con estudios: ' + error.message);
    }
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