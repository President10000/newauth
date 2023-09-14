import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedtoken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verfiedToken: hashedtoken,
        verfiedTokenExpire: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedtoken,
        forgotPasswordTokenExpire: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.mailtrapuser!.toString(),
        pass: process.env.mailtrappswd!.toString(),
      },
    });

    const mailOptions = {
      from: "vishal@gmail.com",

      to: email,

      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",

      html: `<p>Click <a href="${process.env.domain}
      /verifyemail?token=${hashedtoken}">here</a> to
       ${emailType === "VERIFY" ? "verify your email" : "reset your password"}

     or copy and paste the link below in your browser. <br> 
     ${process.env.domain}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedtoken}
                           </p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
