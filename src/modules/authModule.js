import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
  userName: {
    type: String,
    require : true
  },
  email: {
    type: String,
    require : true
  },
  password: {
    type: String,
    require : true
  },
  age: {
    type: Number,
    require : true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isVerified : {  
    type : Boolean ,
    default : false  
  },
  verificationCode : String
  
}, { timestamps: true });


export const Users = mongoose.model('user', userSchema);