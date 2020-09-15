const db = require("../models");

const Categories = db.categories;

exports.create = (req, res) => {
  const newCategories = new Categories({
    name: req.body.name,
  });
  newCategories
    .save(newCategories)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  Categories.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  Categories.findOne({ title: req.params.id, include: ["news"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id =" + id });
    });
};
