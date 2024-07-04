import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mail for usage
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      
    if (emailType === "VERIFY") {
      const emailUser =   await User.findByIdAndUpdate(userId , {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
          emailSendTime: Date.now() + 43200000,
          },
         
      });
      await emailUser.save();
      // console.log("verfiy time" ,  emailUser)
      
    } else if (emailType === "RESET") {
      const passUser = await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
          forgotPasswordSendTime: Date.now() + 43200000,
        },
      });

      await passUser.save();
      // console.log("verfiy time" ,  passUser)
    }

    const domain = process.env.NEXT_PUBLIC_DOMAIN!;
    console.log(domain);
    const htmlContent =
      emailType === "VERIFY"
        ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Verify Your Email</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333333; margin: 0; padding: 0; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { background-color: #4CAF50; color: #ffffff; padding: 10px; text-align: center; }
          .content { margin: 20px 0; line-height: 1.6; }
          .button { display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #4CAF50; color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #777777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verify Your Email</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>Thank you for signing up with us. Please click the button below to verify your email address:</p>
            <a href="${domain}/verifyemail?token=${hashedToken}" class="button">Verify Email</a>
            <p>If you did not sign up for this account, you can ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 KronoSkill. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
        : `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Reset Your Password</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f7f7f7; color: #333333; margin: 0; padding: 0; }
          .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
          .header { background-color: #FF5722; color: #ffffff; padding: 10px; text-align: center; }
          .content { margin: 20px 0; line-height: 1.6; }
          .button { display: block; width: 200px; margin: 20px auto; padding: 10px; background-color: #FF5722; color: #ffffff; text-align: center; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #777777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reset Your Password</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>We received a request to reset your password. Please click the button below to set a new password:</p>
            <a href="${domain}/resetpassword?token=${hashedToken}" class="button">Reset Password</a>
            <p>If you did not request a password reset, you can ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 KronoSkill. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    const transporter = nodemailer.createTransport({
      host:  process.env.NEXT_PRIVATE_MAILER_HOST,
      port: 2525,
      // service: "gmail",
      auth: {
        user: process.env.NEXT_PRIVATE_MAILER_USER, 
        pass: process.env.NEXT_PRIVATE_MAILER_PASS, 
      },
    });
   

    

    const mailOptions = {
      from: "musicAcademy@music.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "VERIFY your email" : "Reset your password", // Subject line
      html: htmlContent,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
