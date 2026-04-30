const Brevo = require('@getbrevo/brevo');

const client = Brevo.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const apiInstance = new Brevo.TransactionalEmailsApi();

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
      email: process.env.EMAIL_FROM, // must be verified in Brevo
    };

    email.to = [{ email: to }];

    const response = await apiInstance.sendTransacEmail(email);

    console.log('✅ Email sent:', response.messageId);
    return true;

  } catch (error) {
    console.error(
      '❌ Email failed:',
      error.response?.body || error.message
    );
    return false;
  }
};

module.exports = sendEmail;