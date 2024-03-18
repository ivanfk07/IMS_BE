const PATH_CONF = {
    POST: {
        LOGIN: require('../APIS/POST/Login/login'),
        ASSETS_ADD: require('../APIS/POST/AssetsList/assets')
    },
    GET: {
        ASSETS_LIST: require('../APIS/GET/AssetsList/assets')
    }
}

const ARRAY_PATH = {
    POST: [
        PATH_CONF.POST.LOGIN,
        PATH_CONF.POST.ASSETS_ADD
    ],
    GET: [
        PATH_CONF.GET.ASSETS_LIST    
    ]
}
module.exports = ARRAY_PATH;