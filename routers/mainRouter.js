const express = require("express");
const registratinController = require("@controllers/registrationController.js");

const router = express.Router();

router.route("/registration").post(registratinController.registration, registratinController.newUserCreation);

module.exports = router;