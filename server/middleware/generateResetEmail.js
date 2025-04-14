export const generateResetEmail = (userName, resetLink) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Password Reset Request</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #333;
            text-align: center;
          }
          p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
          }
          .reset-button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 12px;
            background-color: #007bff;
            color: white;
            text-align: center;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
          }
          .reset-button:hover {
            background-color: #0056b3;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
          }
        </style>
      </head>
      <body>
  
        <div class="container">
          <h2>Hello, ${userName} 👋</h2>
          <p>We received a request to reset your password.</p>
          <p>Click the button below to proceed. If you didn't make this request, you can ignore this email.</p>
  
          <a href="${resetLink}" class="reset-button">Reset Password</a>
  
          <p>This link will expire in <strong>15 minutes</strong>.</p>
  
          <div class="footer">
            <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
  
      </body>
      </html>
    `;
  };
  