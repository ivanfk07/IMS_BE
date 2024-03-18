const { IMS } = require('../../.conf/db-conf');
const TABLES = require('../../.conf/tables');

class AssetsList {

    get = async () => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `SELECT * FROM ${TABLES.ASSETS.TABLE}`
        ];

        try {
            const RESULT = await CONNECTION.query(QUERY[0]) ;
            return RESULT
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            CONNECTION.release();
        }
    }


    add = async (INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `INSERT INTO ${TABLES.ASSETS.TABLE} (${TABLES.ASSETS.COLOUMN.join(',')}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ];
        const PARAMS = [[INVENTORY_NO, NAME, BRAND, YEAR, MODEL, MADE_IN, COMPANY_ID, QTY, INPUT_BY, INPUT_DATE]];

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