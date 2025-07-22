export const verificatioTmpelat = (verificationCode) => {
 return `<!DOCTYPE html>
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f4f8;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
      }
      
      h1 {
        color: #333333;
      font-size: 24px;
      text-align: center;
      }

      p {
        font-size: 16px;
        color: #555555;
        line-height: 1.5;
        }

    .code-box {
      background-color: #f0f0f0;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #1a73e8;
      }
      
      .footer {
        font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 30px;
    }
    .warningLine{
     font-weight: bold;
     } 
  </style>
</head>
<body>
  <div class="container">
  <h1>Verify Your Email Address</h1>
  <p>Hello,</p>
    <p>Thank you for signing up. Please use the verification code below to verify your email address:</p>

    <div class="code-box">${verificationCode}</div>
    
    <p class="warningLine">This code is valid for the next 3 minutes.</p>
    <p>If you didn’t request this, you can safely ignore this email.</p>
    
    <div class="footer">
      &copy; 2025 NUbit. All rights reserved.
      </div>
      </div>
      </body>
      </html>`
}



export const welcomeEmailTemplate = (userName, companyName, dashboardLink) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <title>Welcome to NUbit</title>
  <style>
  body {
    font-family: Arial, sans-serif;
      background-color: #f2f4f8;
      margin: 0;
      padding: 0;
      }

      .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      padding: 30px;
    }

    h1 {
      color: #1a73e8;
      font-size: 26px;
      text-align: center;
    }

    p {
      font-size: 16px;
      color: #444444;
      line-height: 1.6;
    }

    .highlight {
      font-weight: bold;
      color: #1a73e8;
    }
    
    .footer {
      font-size: 14px;
      color: #999999;
      text-align: center;
      margin-top: 30px;
      }
      
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 20px;
      background-color: #1a73e8;
      color: #ffffff;
      border-radius: 5px;
      text-decoration: none;
      font-size: 16px;
      }
      
    .btn:hover {
      background-color: #1669c1;
      }
      </style>
      </head>
<body>
  <div class="container">
  <h1>Welcome to ${companyName} 🎉</h1>
  <p>Hello <span class="highlight">${userName}</span>,</p>
  
  <p>We're excited to have you onboard! Your email has been successfully verified, and your account is now active.</p>

  <p>You can now explore features, manage your profile, and get the best out of NUbit.</p>

    <a class="btn" href="${dashboardLink}" target="_blank">Go to Dashboard</a>

    <p>If you have any questions or feedback, feel free to reply to this email — we're here to help!</p>

    <div class="footer">
    &copy; 2025 ${companyName}. All rights reserved.
    </div>
    </div>
    </body>
    </html>`;

} 