module.exports = (sequelize, Sequelize) => {
  const productModel = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    productDescription: {
      type: Sequelize.TEXT,
    },
  });
  return productModel;
};
