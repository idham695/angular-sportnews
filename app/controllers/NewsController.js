const db = require("../models");
const News = db.news;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be empty" });
    return;
  }

  // Create a Blog
  const news = new News({
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    categoryId: req.body.categoryId,
    image: "http://localhost:3000/uploads/news/" + req.file.filename,
  });
  console.log(news.image);

  // Save News in a database
  news
    .save(news)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating a News",
      });
    });
};
exports.findAll = (req, res) => {
  const title = req.params.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  News.findAll({ where: condition, include: ["comments"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Newss",
      });
    });
};
exports.findOne = (req, res) => {
  News.findOne({ title: req.params.title })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id =" + id });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  if (req.file) {
    const image = "http://localhost:3000/uploads/news/" + req.file.filename;
    req.body.image = image;
  }

  News.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating News with id=" + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  News.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "News was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete News with id=${id}. Maybe News was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete News with id=" + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  News.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
