const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication.controller");
router
  .route("/")
  .post(publicationController.createPublication)
  .get(publicationController.getPublication);
router
  .route("/:id")
  .get(publicationController.getPublicationDetails)
  .patch(publicationController.updatePublication);

module.exports = router;
