const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `This Email: ${email} is not registered with us. Enter a valid email.`,
            });
        }

        const token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        console.log("Generated Token: ", token);
        console.log("Updated User Details: ", user);

        const url = `http://localhost:3000/update-password/${token}`;
        await mailSender(
            email,
            "Password Reset",
            `Your link for password reset is ${url}. Please click this link to reset your password.`
        );

        return res.json({
            success: true,
            message: "Email sent successfully. Please check your email to continue.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while sending the reset email.",
            error: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match.",
            });
        }

        const user = await User.findOne({ token });
        console.log("User Details Found for Token: ", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token.",
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Token has expired. Please generate a new one.",
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        user.password = encryptedPassword;
        user.token = undefined; // Clear token after successful reset
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.json({
            success: true,
            message: "Password reset successful. You can now log in with your new password.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the password.",
            error: error.message,
        });
    }
};
