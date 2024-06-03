const ENDPOINTS = {
    GET: {
        ASSETS_LIST: '/assets/getall',
        TRANSACTION: '/transaction/getall',
    },
    POST: {
        LOGIN: '/login',
        ASSETS: {
            ADD: '/assets/add',
            EDIT: '/assets/edit',
            DELETE: '/assets/delete',
        },
        TRANSACTION: {
            ISSUED: '/transaction/issued',
            RETURN: '/transaction/return',
        }
    }
}

module.exports = ENDPOINTS ;