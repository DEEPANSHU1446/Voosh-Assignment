const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
   userId: { 
    type: ObjectId, 
    ref:'user', 
    required: true 
},
sub_total: { 
    type: Number, 
    required: true 
},
   phone: { 
    type: Number,  
    required: true 
}})

module.exports = mongoose.model('Order', orderSchema)