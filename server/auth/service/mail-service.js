const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activate Your Account :) on ${process.env.AUTH_URL}`,
      text: "",
      html: `
      <div>
        <h1>Hey, looks like u have to activate Your account :/<h1>
        <a href=${link}>${link}</a>
      </div>
      `,
    });
  }
}

module.exports = new MailService();
