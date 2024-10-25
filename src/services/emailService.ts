import * as MailComposer from 'expo-mail-composer';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export const sendEmail = async ({ to, subject, body }: EmailData) => {
  try {
    const isAvailable = await MailComposer.isAvailableAsync();
    
    if (!isAvailable) {
      throw new Error('Mail service is not available');
    }

    const mailOptions = {
      recipients: [to],
      subject,
      body,
    };

    await MailComposer.composeAsync(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};