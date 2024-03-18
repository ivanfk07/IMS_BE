const { IMS } = require('../../.conf/db-conf');
const TABLES = require('../../.conf/tables');

class Users {

    authentication = async (Email, Password) => {
        const CONNECTION = await IMS.getConnection();
        const QUERY = [
            `SELECT u.*, c.NAME AS COMPANY_NAME FROM ${TABLES.USER.TABLE} AS u JOIN company AS c ON u.COMPANY_ID = c.ID WHERE u.EMAIL = ? AND u.PASSWORD = ?`
        ] ;
        const PARAMS = [[Email, Password]] ;

        try {
            const isExist = await CONNECTION.query(QUERY[0], PARAMS[0]) ;
            
            if (isExist[0].length > 0) {
                return {
                    authentication: true,
                    id: isExist[0][0]["ID"],
                    email: isExist[0][0]["EMAIL"],
                    password: isExist[0][0]["PASSWORD"],
                    username: isExist[0][0]["USERNAME"],
                    level: isExist[0][0]["LEVEL"], 
                    company_id: isExist[0][0]["COMPANY_ID"],
                    company_name: isExist[0][0]["COMPANY_NAME"],
                }
            } else {
                return {
                    Authentication: false                   
                }
            }
        } catch (error) {
            console.log(error) ;
            throw error ;
        } finally {
            CONNECTION.release() ;
        }
    }
}

module.exports = {
    Users
}