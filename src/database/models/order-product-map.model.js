module.exports = (sequelize, Sequelize) => {
  const orderProductMapModel = sequelize.define("orderProductMap", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return orderProductMapModel;
};
