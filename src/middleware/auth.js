const userModel = require("../model/userModel");
const valid = require("../Validation/validation");
const jwt = require("jsonwebtoken");

// ------------------------------------ Authentication ------------------------------------------//
const authentication = function (req, res, next) {
    try {
        let bearerHeader = req.headers.authorization;

        if (typeof bearerHeader == "undefined") return res.status(400).send({ status: false, message: "Token is missing, please enter a token" });

        let bearerToken = bearerHeader.split(' ')

        let token = bearerToken[1];
        console.log(token)

        jwt.verify(token, "VOOSH-Order", function (err, data) {
            if (err) {
                return res.status(401).send({ status: false, message: "Unauthenticate User or Token is invalid" })
            }
           else {
                req.decodedToken = data;
                next()
            }
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// -------------------------------------Authorization----------------------------------------------//
const authorization = async (req, res, next) => {
    try {
        let userId = req.body.userId ||req.query.userId
        
        let userIdfromToken = req.decodedToken.userId;

        if (!valid.isValidObjectId(userId))
            return res.status(400).send({ status: false, message: "Please enter vaild User id " });

        let findUser = await userModel.findOne({ _id: userId })
        if (!findUser) {
            return res.status(404).send({ status: false, message: "User not found.1" });
        }

        if ((userId) !== userIdfromToken) {
            res.status(403).send({ status: false, message: "Unauthorized access!!" });
        }
       else{
        next()}
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};

// ---------------------------------------Exports----------------------------------------------//
module.exports = { authentication, authorization }