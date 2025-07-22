import { Users } from "../modules/authModule.js";
import { successHandler, errorHandler } from "../utills/resHandler.js";
import pkg from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail, sendWelcomeEmail } from "../middleware/sendEmail.js";


const { sign } = pkg;
const { hash, compare } = bcrypt;


// signup controller
export const signupController = async (req, res) => {
  // console.log("siignup chala");

  try {
    // console.log(req.body , "body bhi mile");

    const { userName, email, password, age } = req.body;

    if (!userName || !email || !password || !age)
      return errorHandler(res, 404, "Miising Fields !", err);

    if (!email.endsWith("@gmail.com"))
      return errorHandler(res, 400, "email is not valid", err);

    if (password.length < 6 || password.length > 12)
      return errorHandler(
        res,
        400,
        "password must greater then 6 and less then 12"
      );

    const isExist = await Users.findOne({ email: email });
    if (isExist) return errorHandler(res, 402, "user already exist");

    try {
      const hashedPass = await hash(password, 10);
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      const newUser = await Users.create({
        userName,
        email,
        password: hashedPass,
        age,
        verificationCode
      });

      sendEmail(email, verificationCode.toString())

      return successHandler(res, 200, `user register succefully`, newUser);

    } catch (error) {
      console.log(error, "---> registration me error he");
    }

  } catch (error) {
    console.log(error, "---> registration me error he");
  }
};


// resendCode controller
export const resendCode = async (req , res) => {

  try {
    const { email } = req.body
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const resendCodeSend = await Users.updateOne({ email: email }, {
      $set: {
        verificationCode
      }
    })

    if (resendCodeSend.matchedCount === 0) return errorHandler(res, 404, "User not found", resendCodeSend.error)

    sendEmail(email, verificationCode.toString())
    return successHandler(res, 200, "User verification code resend successfully", resendCodeSend)
  }
  catch (err) {
    console.log(err, "<--- resendCode  error he");
    errorHandler(res, 404, "user not found , verification code can not resend", err)
  }

}


// login controller
export const loginController = async (req, res) => {
  console.log("login chala");

  try {
    const { email, password } = req.body;

    if (!email || !password) return errorHandler(res, 404, "Miising Fields !");

    if (!email.endsWith("@gmail.com"))
      return errorHandler(res, 400, "email is not valid");

    if (password.length < 6 || password.length > 12)
      return errorHandler(
        res,
        400,
        "password must greater then 6 and less then 12"
      );

    const isExist = await Users.findOne({ email: email });
    if (!isExist) return errorHandler(res, 402, "User not found");

    const comparePass = await compare(password, isExist?.password);
    if (!comparePass) return errorHandler(res, 404, "invalid password");

    const token = await sign(
      {
        userId: isExist._id,
        userEmail: email,
        isAdmin: isExist.isAdmin,
      },
      process.env.JWT_secretKey,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true, //  < --- matlab sirf server side yani backend se hi cookie ko access/handle kia ja sakta he
      sameSite: "Lax", //  < --- yani diff origin/port sen req aengi un me cookie ko save nahui kia jae ga browser me siwae get and post samoeTime
      secure: false, // ⚠️ <-- alllow for only http
    });

    console.log("login in  successfully", isExist);
    successHandler(res, 200, "user login successfully", isExist);
    sendWelcomeEmail(response.email, response.userName)

  } catch (err) {
    console.log(err, "loginUser me error he");
    errorHandler(res, 402, "user cant login", err);
  }

};


// userVerification controller
export const userVerification = async (req, res) => {
  const { userCode } = req.body
  console.log(userCode, "<----user code");

  try {
    const response = await Users.findOne({ verificationCode: userCode })
    if (!response) errorHandler(res, 402, "Invalid code", response)
    console.log("Response verifies user =--->", response);


    const verifiedUserUpdate = await Users.updateOne({ verificationCode: userCode }, {
      $set: {
        isVerified: true
      },
      $unset: {
        verificationCode: ""
      }
    },
      { new: true })

    if (res.matchedCount === 0) return errorHandler(res, 404, "User not found", res.error)

    console.log(verifiedUserUpdate, "<----verifiedUserUpdate verified user update res");
    successHandler(res, 200, "User verified successfully", verifiedUserUpdate)
  }
  catch (err) {
    console.log(err);
    errorHandler(res, 404, "User not verified", err)
  }
}


// verificationCodeDeleterAfter3m controller
export const verificationCodeDeleterAfter3m = async (req, res) => {

  try {
    const { email } = req.body
    console.log(email , "email jis ka varification code dekte kar na he ");
    
    const verificationCodeDeleted = await Users.updateOne({ email: email }, {
      $unset: {
        verificationCode: ""
      }
    })

    if (verificationCodeDeleted.matchedCount === 0) return errorHandler(res, 404, "User not found", res.error)
      console.log(verificationCodeDeleted , "user ka ceriifcation code dleete ho gaya he ");
      
    successHandler(res, 200, "User verification code deleted successfully", verificationCodeDeleted)
  }
  catch (err) {
    console.log(err, "<--- verificationCodeDeleterAfter3m  error he");
    errorHandler(res, 404, "user not found", err)

  }

}
