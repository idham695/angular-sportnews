module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define("categories", {
    name: {
      type: Sequelize.STRING,
    },
  });

  return Categories;
};
