const db = require("../models");
const Comments = db.comments;

exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.text) {
  //   res.status(400).send({ message: "text cannot be empty" });
  //   return;
  // }

  // Create a Blog
  const comments = new Comments({
    name: req.body.name,
    newsId: req.body.newsId,
    email: req.body.email,
    text: req.body.text,
  });

  // Save comments in a database
  comments
    .save(comments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating a comments",
      });
    });
};
