import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  await transporter.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html: data,
  });
};

export default sendMail;



