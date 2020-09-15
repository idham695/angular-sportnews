module.exports = (app) => {
  const news = require("../controllers/NewsController.js");

  var router = require("express").Router();

  const multer = require("multer");

  const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb("Please upload only images", false);
    }
  };

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/news");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 1024 * 1024 * 10 },
  });

  // Create a new News
  router.post("/", upload.single("image"), news.create);

  // Retrieve all News
  router.get("/", news.findAll);

  // Retrieve a single News with id
  router.get("/:id", news.findOne);

  // Update a News with id
  router.put("/:id", upload.single("file"), news.update);

  // Delete a News with id
  router.delete("/:id", news.delete);

  // Delete all News
  router.delete("/", news.deleteAll);

  app.use("/api/news", router);
};
