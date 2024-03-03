const nodemailer = require('nodemailer');

// Example OTP generation function





async function sendOTP(email,otp) {
    return new Promise((resolve, reject) => {
        console.log(email);

        // Generate OTP
        const otp2 = otp;
        console.log("sendotp" + otp2);
        // Send OTP to user's email
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'yadavajay221303@gmail.com', // Change this to your email address
                    pass: 'sysq rjfl duqr rhro', // Change this to your email password or use environment variable
                },
            });

            const mailOptions = {
                from: 'medicinewala13@gmail.com', // Change this to your email address
                to: email,
                subject: 'Email Verification',
                html: `<p>Your OTP for email verification is: <strong>${otp2}</strong></p>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(info); // Resolve the promise with the generated OTP
                }
            });

        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}



module.exports = { sendOTP };
