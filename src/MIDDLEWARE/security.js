const { IMS } = require("../.conf/db-conf")
const TABLES = require("../.conf/tables")

class Security {

    first = async (req, res, next) => {
        const user_id = req.params.user_id
        const company_id = req.params.company_id

        if (!user_id || !company_id) {
            res.status(403).json({
                message: "Access denied",
                information: "Invalid parameters"
            })
        }

        const CONNECTION = await IMS.getConnection()

        const QUERY = [`SELECT c.ID AS COMPANY_ID FROM ${TABLES.COMPANY.TABLE} AS c JOIN ${TABLES.USER.TABLE} AS u ON c.ID = u.COMPANY_ID WHERE u.ID = ?`]
        const PARAMS = [[user_id]]

        try {
            const isThere = await CONNECTION.query(QUERY[0], PARAMS[0])

            if (isThere[0].length > 0 && isThere[0][0]["COMPANY_ID"] == company_id) {
                next()
            } else {
                res.status(403).json({
                    message: "Access denied",
                    information: "Not authorized"
                })
            }
        } catch (error) {
            throw error
        } finally {
            CONNECTION.release()
        }
    }

    #second = async () => {

    }
}

const security = new Security()
module.exports = security