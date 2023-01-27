const DB = require("../database/postgres");

class order {
  async getAll() {
    // get all orders and include productmap for things like quantity
    const nonce = await DB.orders.findAll({
      include: [
        {
          model: DB.orderProductMap,
          as: "orderProductMap",
          attributes: ["id"],
        },
      ],
    });
    return {
      status: 200,
      data: nonce,
    };
  }
  async getById(id) {
    const nonce = await DB.orders.findOne({ where: { id: id } });
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
    const nonce = await DB.orders.create({
      orderDescription: data.orderDescription,
    });
    data.products.map((productId) => {
      DB.orderProductMap.create({
        orderId: nonce.id,
        productId: productId,
      });
    });

    return {
      status: 200,
      data: nonce,
    };
  }

  async update(id, data) {
    const nonce = await DB.orders.update(data, { where: { id: id } });
    return {
      status: 200,
      data: nonce,
    };
  }

  async delete(id) {
    const nonce = await DB.orders.destroy({ where: { id: id } });
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

module.exports = new order();
