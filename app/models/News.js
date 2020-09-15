module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    title: {
      type: Sequelize.STRING,
    },
    categoryId: {
      type: Sequelize.INTEGER,
    },
    slug: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return News;
};
