import User from "../model/user.model.js";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000;

        await user.save();

        await sgMail.send({
            to: email,
            from: process.env.FROM_EMAIL,
            subject: "CodeLens AI - Password Reset OTP",
            text: `Your OTP is ${otp}. It expires in 5 minutes.`,
            html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center"
                style="background:linear-gradient(90deg,#2563eb,#7c3aed);padding:30px;color:white;">
                <h1 style="margin:0;">🔐 CodeLens AI</h1>
                <p style="margin:8px 0 0;font-size:15px;">
                  Password Reset Verification
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px;color:#333;">

                <h2 style="margin-top:0;">
                  Hello 👋
                </h2>

                <p style="font-size:16px;line-height:1.6;">
                  We received a request to reset your password.
                  Use the OTP below to continue.
                </p>

                <div style="
                  margin:35px auto;
                  width:220px;
                  text-align:center;
                  background:#eef2ff;
                  border:2px dashed #4f46e5;
                  border-radius:10px;
                  padding:18px;
                ">
                  <span style="
                    font-size:34px;
                    font-weight:bold;
                    color:#4f46e5;
                    letter-spacing:8px;
                  ">
                    ${otp}
                  </span>
                </div>

                <p style="font-size:15px;color:#555;">
                  ⏳ This OTP is valid for <strong>5 minutes</strong>.
                </p>

                <p style="font-size:15px;color:#555;">
                  If you didn't request a password reset, you can safely ignore this email.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center"
                style="background:#f8fafc;padding:20px;border-top:1px solid #e5e7eb;">

                <p style="margin:0;font-size:13px;color:#6b7280;">
                  © 2026 CodeLens AI. All rights reserved.
                </p>

                <p style="margin-top:8px;font-size:12px;color:#9ca3af;">
                  This is an automated email. Please do not reply.
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
        });

        res.json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (err) {
        console.log("Forgot Password Error:", err);
        console.log("Error Message:", err.message);
        console.log("Response:", err.response?.body);

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

const verifyOTP = async (req, res) => {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }

    if (Date.now() > user.otpExpiry) {

        return res.status(400).json({
            success: false,
            message: "OTP expired"
        });

    }

    res.json({
        success: true,
        message: "OTP verified"
    });

};

const resetPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.otp !== otp || Date.now() > user.otpExpiry) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }
    user.password = password;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
        success: true,
        message: "Password changed successfully"
    });
};

export { forgotPassword, verifyOTP, resetPassword };