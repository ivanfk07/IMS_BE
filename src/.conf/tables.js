const TABLES = {
    USER: {
        TABLE: "users",
        COLOUMN: [
            "USERNAME",
            "EMAIL",
            "PASSWORD",
            "LEVEL",
            "COMPANY_ID"
        ]
    },
    ASSETS: {
        TABLE: "equipment_assets",
        COLOUMN: [            
            "INVENTORY_NO", 
            "NAME", 
            "BRAND", 
            "YEAR", 
            "MODEL", 
            "MADE_IN", 
            "COMPANY_ID", 
            "QTY", 
            "INPUT_BY", 
            "INPUT_DATE"
        ]
    },
    ASSETS_INFO: "equipment_assets_more_info",
    ASSETS_IMAGES: "equipment_assets_images",
    TRANSACTION: "equipment_assets_transaction",
}

module.exports = TABLES ;