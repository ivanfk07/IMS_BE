const mysql = require('mysql2/promise');

class Access {
    #pool;

  constructor(database) {
    this.#pool = mysql.createPool({
      connectionLimit: 25,
      queueLimit: 20,
      host: 'localhost',     
      user: 'syih2943_admin',      
      password: 'syikhaakmal19',
      database: database,
    });
  }

  async getConnection() {
    return await this.#pool.getConnection();
  }
}

const IMS = new Access('syih2943_inventory_ms')

module.exports = {
    IMS    
}
