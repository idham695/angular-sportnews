module.exports = (app) => {
  const comments = require("../controllers/CommentController.js");

  var router = require("express").Router();

  router.post("/", comments.create);

  app.use("/api/comments", router);
};
