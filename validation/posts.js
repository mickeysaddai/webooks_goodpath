const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validatePostInput(data) {
  const errors = {};

  data.text = validText(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 140 })) {
    errors.text = "Post must be between 10 and 140 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
