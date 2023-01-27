const DB = require("../database/postgres");

class product {
  async getAll() {
    const nonce = await DB.products.findAll();
    return {
      status: 200,
      data: nonce,
    };
  }
  async getById(id) {
    const nonce = await DB.products.findOne({ where: { id: id } });
    if (!nonce)
      return {
        status: 404,
        data: null,
      };
    return {
      status: 200,
      data: nonce,
    };
  }
  async create(data) {
    const nonce = await DB.products.create(data);
    return {
      status: 200,
      data: nonce,
    };
  }

  async update(id, data) {
    const nonce = await DB.products.update(data, { where: { id: id } });
    return {
      status: 200,
      data: nonce,
    };
  }

  async delete(id) {
    const nonce = await DB.products.destroy({ where: { id: id } });
    if (nonce === 0)
      return {
        status: 404,
        data: null,
      };
    return {
      status: 200,
      data: "Deleted",
    };
  }
}

module.exports = new product();
