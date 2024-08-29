const { validationResult } = require("express-validator");
const deleteFile = require("../helpers/deleteFile");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (req.files && req.files.eventOrganizerProfile) {
      const eventOrganizerProfile = req.files.eventOrganizerProfile[0];
      deleteFile(eventOrganizerProfile.filename, "eventOrganizer-upload");
    }
    const error = new Error("An error occured! Detailed explanation provided.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  next();
};
