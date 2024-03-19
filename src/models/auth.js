import mongoose  from "mongoose";
const authschema  = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,'First Name  is required']
    },
    lname:{
        type:String,
        required:[true,'last name is required']
    },
    collegename:{
        type:String,
        required:[true,'college name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    }

});
const Authentication = mongoose.model('Authentication', authschema);
export default Authentication;
