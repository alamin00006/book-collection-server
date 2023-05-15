const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication.controller");
router
  .route("/")
  .post(publicationController.createPublication)
  .get(publicationController.getPublication);
router.route("/:id").get(publicationController.getPublicationDetails);

// router.route('/:id').patch(productController.updateProduct)

module.exports = router;
