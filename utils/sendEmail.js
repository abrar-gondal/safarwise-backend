const Brevo = require('@getbrevo/brevo');

const apiInstance = new Brevo.TransactionalEmailsApi();

// Correct auth
apiInstance.authentications = {
  apiKey: {
    apiKey: process.env.BREVO_API_KEY,
  },
};

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing required email fields");
    }

    const email = new Brevo.SendSmtpEmail();

    email.subject = subject;
    email.htmlContent = html;

    email.sender = {
      name: 'SafarWise',
      email: process.env.EMAIL_FROM,
    };

    email.to = [{ email: to }];

    const response = await apiInstance.sendTransacEmail(email);

    console.log('✅ Email sent:', response.messageId);
    return true;

  } catch (error) {
    console.error('❌ Email failed:', error.response?.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;