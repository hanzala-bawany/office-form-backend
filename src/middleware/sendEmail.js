import { verificatioTmpelat, welcomeEmailTemplate } from "../utills/verificationTempelate.js";
import { transporter } from "./emailVerificationTransporter.js";

export const sendEmail = async (userEmail , verificationCode) => {

    try {
        const info = await transporter.sendMail({
            from: '"Nubit pvt Ltd" <hbawany1@gmail.com>',
            to: userEmail  ,
            subject: "Verify Your Email",
            text: "Verify Your Email", // plain‑text body
            html: verificatioTmpelat(verificationCode) , // HTML body
        });

        console.log("Verify Email Message sent Successfully:", info.messageId);
    }
    catch(err){
        console.log(err);
    }

}

export const sendWelcomeEmail = async (userEmail , userName) => {

    try {
        const info = await transporter.sendMail({
            from: '"Nubit prvt Lmt" <hbawany1@gmail.com>',
            to: userEmail  ,
            subject: "Welcome Email",
            text: "Welcome Email", // plain‑text body
            html: welcomeEmailTemplate(userName,"Nubit","http://localhost:5173/") , // HTML body
        });

        console.log("Welcome Email Message sent Successfully:", info.messageId);
    }
    catch(err){
        console.log(err);
    }

}
