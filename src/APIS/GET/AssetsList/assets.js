const ENDPOINTS = require('../../../.conf/endpoints');
const security = require('../../../MIDDLEWARE/security');
const AssetsList = require('../../../MODULES/AssetsList/AssetsList');

const express = require('express');
const router = express.Router();

const assetsList = new AssetsList();

router.get(`${ENDPOINTS.GET.ASSETS_LIST}/:user_id/:company_id`, security.first, async (req, res) => {
    const company_id = req.params.company_id
    
    
    try {
        const DATA = await assetsList.get(company_id) ;
        
        res.status(200).json(DATA[0])
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            info: error
        })
    }
})

module.exports = router ;