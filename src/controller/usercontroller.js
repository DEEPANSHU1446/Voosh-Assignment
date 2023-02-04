const UserModel = require("../model/userModel")
const valid = require("../Validation/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const createUser = async (req,res) =>{
    try {
     let data = req.body
        let {name,phone,password} = data
        
        // checking if user does not enters any data
        if (Object.keys(data) == 0) { return res.status(400).send({status:false,message:"No data provided"})}
        // checking for name 
        if (!(valid.isValid(name))) { return res.status(400).send({status:false, message:"please enter name"}) }

        // checking for phone
        if (!(valid.isValid(phone))) { return res.status(400).send({status:false, message:"please enter phone no."}) }

        if (!(valid.isValidMobile(phone))) { return res.status(400).send({status:false, message:"please enter valid phone"}) }

        const duplicatePhone = await UserModel.findOne({phone:phone});
        if(duplicatePhone) {return res.status(400).send({status:false, message:"phone is already exist"})};

        // checking for password
        if (!password) return res.status(400).send({ status: false, message: "please enter password"})

        if (!valid.isValidPassword(password)) {
          return res.status(400).send({ status: false, message:  'Password should be of minimum 8 characters & maximum 15 characters' })
      }
        // using bcrypt
        const rounds = 10;
         let hash = await bcrypt.hash(password, rounds);
         data.password = hash;


        let result = await UserModel.create(data)
          res.status(201).send({status:true, message:"User created successfully", data:result})
        }
    catch(error){
        res.status(500).send({status:false, message:error.message})
    }
}

//====================================login=========================================================//

const loginUser = async function (req, res) {
    try {
        let requestBody = req.body;

        //Extract Params
        let { phone, password } = requestBody
        if (Object.keys(requestBody) == 0) { return res.status(400).send({status:false,message:"Please provide phone and password"})}
        if (!phone) {return res.status(400).send({ status: false, msg: "Enter your  phone" })}
        if (!password) {return res.status(400).send({ status: false, msg: "Enter your  password" })}

        if (!valid.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request body. Please provide the the input to proceed" })
        }
    
        //Validation start
        if (!valid.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Please enter an phone " })
        }

        if (!valid.isValid(password)) {
            return res.status(400).send({ status: false, message: "Please enter Password." })
        }

        let user = await UserModel.findOne({ phone });
        if (!user)
            return res.status(400).send({ status: false, message: "Login failed! phone  is incorrect." });

        let passwordBody = user.password;
        let encryptPassword = await bcrypt.compare(password, passwordBody);

        if (!encryptPassword) return res.status(400).send({ status: false, message: "Login failed! password is incorrect." });
        //Validation End

        let userId = user._id
        // create token
        let token = jwt.sign(
            {
                userId: user._id.toString(),
            },
            'VOOSH-Order',
        )
        res.status(201).json( {id:user._id,token ,user} );    

    } catch (err) {
        res.status(500).send({ message: "Server not responding", error: err.message });
    }
};
module.exports={createUser,loginUser}