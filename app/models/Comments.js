module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define("comments", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  });

  return Comments;
};
