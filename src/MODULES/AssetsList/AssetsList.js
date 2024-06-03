const { IMS } = require('../../.conf/db-conf');
const TABLES = require('../../.conf/tables');

class AssetsList {

    get = async (company_id) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `SELECT a.ID, a.INVENTORY_NO, a.NAME, a.BRAND, a.YEAR, a.MODEL, a.MADE_IN, a.QTY, DATE_FORMAT(a.INPUT_DATE, '%Y-%m-%d') AS INPUT_DATE, c.NAME AS COMPANY_NAME, u.USERNAME AS INPUT_BY, ai.ASSETS_CONDITION, ai.STATUS, ai.INFORMATION FROM ${TABLES.ASSETS.TABLE} AS a 
            JOIN ${TABLES.USER.TABLE} AS u ON a.INPUT_BY = u.ID JOIN ${TABLES.COMPANY.TABLE} AS c ON a.COMPANY_ID = c.ID JOIN ${TABLES.ASSETS_INFO.TABLE} AS ai ON a.ID = ai.ASSETS_ID`            
        ];
        const PARAMS = [[company_id]]

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


    add = async (INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE, ASSETS_CONDITION) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `INSERT INTO ${TABLES.ASSETS.TABLE} (${TABLES.ASSETS.COLUMN.join(',')}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            `SELECT LAST_INSERT_ID() AS ID`
        ];
        const PARAMS = [[INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE]];

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
            const RESULT = await CONNECTION.query(QUERY[1]);
            const ITEMS_ID = RESULT[0][0].ID;
            await this.#addMoreInfo(ITEMS_ID, "", ASSETS_CONDITION, true, "")
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }

    edit = async (ID, INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, ASSETS_CONDITION, STATUS) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `UPDATE ${TABLES.ASSETS.TABLE} AS t SET t.INVENTORY_NO = ?, t.NAME = ?, t.BRAND = ?, t.YEAR = ?, t.MODEL = ?, t.MADE_IN = ?, t.QTY = ? WHERE t.COMPANY_ID = ? AND t.ID = ? `,
            `DELETE FROM ${TABLES.ASSETS_INFO.TABLE} WHERE ASSETS_ID = ?`
        ]
        const PARAMS = [[INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, QTY, COMPANY_ID, ID], [ID]]

        try {
            for (let i = 0; i < QUERY.length; i++) {
                await CONNECTION.query(QUERY[i], PARAMS[i])
            }
            await this.#addMoreInfo(ID, "", ASSETS_CONDITION, STATUS, "")
        } catch (error) {
            throw error
        } finally {
            CONNECTION.release();
        }
    }

    delete = async (ID) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `DELETE FROM ${TABLES.ASSETS.TABLE} WHERE ID = ?`,
            `DELETE FROM ${TABLES.ASSETS_INFO.TABLE} WHERE ASSETS_ID = ?`
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

    #addMoreInfo = async (ASSETS_ID, LINE_AREA_ID, ASSETS_CONDITION, STATUS, INFORMATION) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `INSERT INTO ${TABLES.ASSETS_INFO.TABLE} (${TABLES.ASSETS_INFO.COLUMN.join(',')}) VALUES (?, ?, ?, ?, ?)`
        ];
        const PARAMS = [[ASSETS_ID, LINE_AREA_ID, ASSETS_CONDITION, STATUS, INFORMATION]];

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }

    editMoreInfo = async (ASSETS_ID, ASSETS_CONDITION, STATUS) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `UPDATE ${TABLES.ASSETS_INFO.TABLE} AS ai SET ai.ASSETS_CONDITION = ?, ai.STATUS = ? WHERE ai.ASSETS_ID = ?`
        ];
        const PARAMS = [[ASSETS_CONDITION, STATUS, ASSETS_ID]];

        try {
            await CONNECTION.query(QUERY[0], PARAMS[0])
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }
}

module.exports = AssetsList ;