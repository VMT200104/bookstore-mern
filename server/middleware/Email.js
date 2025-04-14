export const registerMail = (data) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            .container {
                max-width: 400px;
                margin: 40px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .logo {
                width: 80px;
                margin-bottom: 15px;
            }
            h1 {
                color: #2c3e50;
                font-size: 22px;
                margin-bottom: 12px;
            }
            p {
                color: #555;
                font-size: 16px;
                margin-bottom: 20px;
                line-height: 1.6;
            }
            .otp {
                font-size: 28px;
                font-weight: bold;
                color: #007bff;
                background: #e6f0ff;
                display: inline-block;
                padding: 12px 24px;
                border-radius: 6px;
                letter-spacing: 2px;
                margin-bottom: 25px;
                box-shadow: 0 3px 6px rgba(0, 123, 255, 0.2);
            }
            .footer {
                font-size: 12px;
                color: #999;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <table role="presentation">
            <tr>
                <td align="center">
                    <table role="presentation" class="container">
                        <tr>
                            <td>
                                <h1>OTP Verification</h1>
                                <p>Hello <strong>${data.name}</strong>,</p>
                                <p>Your OTP for verification:</p>
                                <p class="otp">${data.otp}</p>
                                <p>Please do not share this code with anyone.</p>
                                <p class="footer">If you did not request this code, please ignore this email.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`;
};
