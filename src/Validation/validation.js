const mongoose = require("mongoose");

const isValidName = function (value) {
    if (
      typeof value === "string" &&
      value.trim().length > 0 &&
      /[a-zA-Z\D ]*$/.test(value)
    )
      return true;
    return false;
  };
  
const isValid = function (value) {
  if (typeof value === "string" && value.trim().length > 0) return true;
  return false;
};

const isValidMobile = function (value) {
  if (typeof value === "string" && /^[0-9]\d{9}$/gi.test(value)) return true;
  return false;
};

const isValidPassword = function (value) {
  if ( typeof value === "string" && value.trim().length > 0 && /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(value)) return true;
  return false;
};

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};

const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId);  
}

module.exports = { isValid, isValidRequestBody, isValidObjectId, isValidPassword,
    isValidName, isValidMobile}
