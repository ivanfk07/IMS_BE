const { IMS } = require("../../.conf/db-conf");
const TABLES = require("../../.conf/tables");
const AssetsList = require("../AssetsList/AssetsList");

class Transaction {
    #ASSETS_LIST = new AssetsList()

    get = async (company_id) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `SELECT t.ID, a.INVENTORY_NO, a.NAME, a.BRAND, t.ASSETS_ID, t.ISSUED_BY, DATE_FORMAT(t.ISSUED_DATE, '%Y-%m-%d') AS ISSUED_DATE, t.RETURN_DATE, t.STATUS 
            FROM ${TABLES.TRANSACTION.TABLE} AS t JOIN ${TABLES.ASSETS.TABLE} AS a ON t.ASSETS_ID = a.ID WHERE a.COMPANY_ID = ?`
        ];
        const PARAMS = [[company_id, company_id]]

        try {
            const RESULT = await CONNECTION.query(QUERY[0], PARAMS[0]) ;
            return RESULT
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }
    
    issued = async (ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, ASSETS_CONDITION) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `INSERT INTO ${TABLES.TRANSACTION.TABLE} (${TABLES.TRANSACTION.COLUMN[0]}, ${TABLES.TRANSACTION.COLUMN[1]}, ${TABLES.TRANSACTION.COLUMN[2]}, ${TABLES.TRANSACTION.COLUMN[3]}, ${TABLES.TRANSACTION.COLUMN[5]}) VALUES (?, ?, ?, ?, ?)`
        ];        
        const PARAMS = [[ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, ASSETS_CONDITION]];

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
            await this.#ASSETS_LIST.editMoreInfo(ASSETS_ID, ASSETS_CONDITION, 0)
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }

    return = async (ID, ASSETS_ID, RETURN_DATE, STATUS) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `UPDATE ${TABLES.TRANSACTION.TABLE} AS t SET t.RETURN_DATE = ?, t.STATUS = ? WHERE t.ASSETS_ID = ? AND t.ID = ?`
        ]
        const PARAMS = [[RETURN_DATE, STATUS, ASSETS_ID, ID]]

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
            await this.#ASSETS_LIST.editMoreInfo(ASSETS_ID, STATUS, 1)
        } catch (error) {
            throw error
        } finally {
            CONNECTION.release();
        }
    }

    edit = async (ID, COMPANY_ID, ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, RETURN_DATE, STATUS) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `UPDATE ${TABLES.TRANSACTION.TABLE} AS t SET t.ASSETS_ID = ?, t.INPUT_BY = ?, t.ISSUED_BY = ?, t.ISSUED_DATE = ?, t.RETURN_DATE = ?, t.STATUS = ? WHERE t.COMPANY_ID = ? AND t.ID = ? `
        ]
        const PARAMS = [[ASSETS_ID, INPUT_BY, ISSUED_BY, ISSUED_DATE, RETURN_DATE, STATUS, COMPANY_ID, ID]]

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
            `DELETE FROM ${TABLES.TRANSACTION.TABLE} WHERE ID = ?`,
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

module.exports = Transaction