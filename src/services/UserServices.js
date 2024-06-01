const EmailSend = require("../utility/EmailHelper");
const {EncodeToken} = require('../utility/TokenHelper');
const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');


const UserOTPService = async(req)=>{
    try {
    let email = req.params.email;
    let code = Math.floor(100000+Math.random()*900000);
    let EmailText =`Your Verification Code Is= ${code}`;
    let EmailSubject ='Email Verification'

    await EmailSend(email,EmailText,EmailSubject);
    await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});
    return {status: 'success', message:'6 Digit OTP has been sent'}
    } 
    catch (error) {
        return {status: 'fail', message:'something went wrong'}
    }
}

const VerifyOTPService = async(req)=>{
    try {
    let email = req.params.email;
    let otp = req.params.otp;
    //user count
    let total = await UserModel.find({email:email,otp:otp}).count('total');
    if(total===1){
    //user ID Read
    let user_id = await UserModel.find({email:email,otp:otp}).select('_id');
    //user token create
    let token = EncodeToken(email,user_id[0]['_id'].toString())
    //OTP code update to 0
    await UserModel.updateOne({email:email},{$set:{otp:"0"}});
    return {status:'success', message:'Valid OTP', token:token}
    }
    else{
        return {status:'fail', message:'Invalid OTP'}
    }
    } 
    catch (error) {
        return {status:'fail', message:'Invalid OTP'}
    }
}


const SaveProfileService = async(req)=>{
    try {
        let user_id = req.headers.user_id ;
    let reqBody = req.body;
    reqBody.userID=user_id;
    await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
    return {status:'success', message:'Profile saved successfully'};
    } 
    catch (error) {
        return {status:'fail', message:'Something went wrong'}
    }

}

const ReadProfileService = async(req)=>{
    try {
        let user_id = req.headers.user_id ;
    let result = await ProfileModel.find({userID:user_id})
    return {status:'Success', data:result}
    }
    catch (error) {
        return {status:'fail', message:'Something went wrong'}
    }
}



module.exports ={
    UserOTPService,VerifyOTPService,SaveProfileService,
    ReadProfileService
}