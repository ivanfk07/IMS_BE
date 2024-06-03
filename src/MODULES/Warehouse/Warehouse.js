const { IMS } = require("../../.conf/db-conf");
const TABLES = require("../../.conf/tables");

class Warehouse {
    get = async (company_id) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `SELECT * FROM ${TABLES.WAREHOUSE.TABLE} WHERE COMPANY_ID = ?`
        ];
        const PARAMS = [[company_id]]

        try {
            const RESULT = await CONNECTION.query(QUERY[0], PARAMS[0]);
            return RESULT
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }

    add = async (COMPANY_ID, NAME, INFORMATION) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `INSERT INTO ${TABLES.WAREHOUSE.TABLE} (${TABLES.WAREHOUSE.COLUMN.join(',')}) VALUES (?, ?, ?)`,
            `SELECT LAST_INSERT_ID() AS ID`
        ];
        const PARAMS = [[COMPANY_ID, NAME, INFORMATION]];

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
            const RESULT = await CONNECTION.query(QUERY[1]);
            const ITEMS_ID = RESULT[0][0].ID;
            return ITEMS_ID
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }

    edit = async (ID, COMPANY_ID, NAME, INFORMATION) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `UPDATE ${TABLES.WAREHOUSE.TABLE} AS t SET t.NAME = ?, t.INFORMATION = ? WHERE t.COMPANY_ID = ? AND t.ID = ? `
        ]
        const PARAMS = [[NAME, INFORMATION, COMPANY_ID, ID]]

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
        } catch (error) {
            throw error
        } finally {
            CONNECTION.release();
        }
    }

    delete = async (ID) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `DELETE FROM ${TABLES.WAREHOUSE.TABLE} WHERE ID = ?`,
        ]
        const PARAMS = [[ID]]

        try {
            for (let i = 0; i < QUERY.length; i++) {
                await CONNECTION.query(QUERY[i], PARAMS[0])
            }
        } catch (error) {
            throw error
        } finally {
            CONNECTION.release();
        }
    }
}

module.exports = Warehouse