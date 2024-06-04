const PATH_CONF = {
    POST: {
        LOGIN: require('../APIS/POST/Login/login'),
        ASSETS: {
            ADD: require('../APIS/POST/AssetsList/add'),
            EDIT: require('../APIS/POST/AssetsList/edit'),
            DELETE: require('../APIS/POST/AssetsList/delete'),
        },
        TRANSACTION: {
            ISSUED: require('../APIS/POST/Transaction/Issued'),
            RETURN: require('../APIS/POST/Transaction/Return'),
        }
    },
    GET: {
        ASSETS_LIST: require('../APIS/GET/AssetsList/assets'),
        TRANSACTION: require('../APIS/GET/Transaction/transaction'),
    }
}



const ARRAY_PATH = {
    POST: [
        PATH_CONF.POST.LOGIN,

        // ASSETS_LIST
        PATH_CONF.POST.ASSETS.ADD,
        PATH_CONF.POST.ASSETS.EDIT,
        PATH_CONF.POST.ASSETS.DELETE,

        // TRANSACTION
        PATH_CONF.POST.TRANSACTION.ISSUED,
        PATH_CONF.POST.TRANSACTION.RETURN,
    ],
    GET: [
        PATH_CONF.GET.ASSETS_LIST,   
        PATH_CONF.GET.TRANSACTION,   
    ]
}
module.exports = ARRAY_PATH;