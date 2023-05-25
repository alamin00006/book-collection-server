const express = require("express");
const router = express.Router();
const writerController = require("../controllers/writer.controller");
router
  .route("/")
  .post(writerController.createWriter)
  .get(writerController.getWriters);
router
  .route("/:id")
  .get(writerController.getWriterDetails)
  .patch(writerController.updateWriter);

module.exports = router;
