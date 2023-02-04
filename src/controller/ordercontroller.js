const UserModel = require("../model/userModel")
const orderModel = require("../model/orderModel")
const valid = require("../Validation/validation")
const regex = /^[0-9]{1}$/

const createOrder = async (req,res) =>{
    try {
     let data = req.body
        let {userId,sub_total,phone} = data
        
        // checking if user does not enters any data
        if (Object.keys(data) == 0) { return res.status(400).send({status:false,message:"No data provided"})}
        if(!(valid.isValidObjectId(userId))){
            { return res.status(400).send({status:false, message:"please enter Valid userId."}) }
        }
        if(!regex.test(sub_total)){
            { return res.status(400).send({status:false, message:"please enter Valid Number"}) }
        }
        // checking for phone
        if (!(valid.isValid(phone))) { return res.status(400).send({status:false, message:"please enter phone no."}) }

        if (!(valid.isValidMobile(phone))) { return res.status(400).send({status:false, message:"please enter valid phone"}) }

        let result = await orderModel.create(data)
          res.status(201).send({status:true, message:"Order placed successfully", data:result})
        }
    catch(error){
        res.status(500).send({status:false, message:error.message})
    }
}

//==============================================GET CART============================================//

const getOrder = async function (req, res) {
    try {
        let userId = req.query.userId;
        //if userId is given then is it valid or not
        if (userId) {
            if (!valid.isValidObjectId(userId))
                return res.status(400).send({ status: false, msg: "wrong userId" });
        }
        // finding user in DB 
        let checkUserId = await UserModel.findById({ _id: userId });
        if (!checkUserId) {
            return res.status(404).send({ status: false, message: "no user details found" });
        }
        // finding in cart 
        let getData = await orderModel.find({ userId });
        if (getData.length == 0)
            return res.status(404).send({ status: false, message: "order details not found" });
        
        res.status(200).send({ status: true, message: "order successfull", data: getData });
        
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports= {createOrder,getOrder}