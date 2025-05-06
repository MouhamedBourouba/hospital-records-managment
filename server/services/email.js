import { Resend } from 'resend';

const resend = new Resend('re_HqMkfKae_7KyyWfwHEUkBiwG1xdGPbp8r');

export async function sendPasswordEmail(email, password) {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: [email],
    subject: 'Welcome to Records Management System',
    html: `
      <h2>Registration Successful</h2>
      <p>You have been registered in the Hospital Management System.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep this information safe.</p>
    `,
  });

  if (error) {
    console.error('Email sending failed:', error);
    return;
  }

  console.log('Email sent successfully:', data);
}

