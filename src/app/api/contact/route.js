import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Casa Kraft Interiors Website" <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
      replyTo: data.email,
      subject: `New Website Enquiry - ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222;">
          <h2>New Contact Form Submission</h2>

          <p><strong>Name:</strong> ${data.name}</p>

          <p><strong>Email:</strong> ${data.email}</p>

          <p><strong>Phone:</strong> ${
            data.phone || "Not Provided"
          }</p>

          <p><strong>Company:</strong> ${
            data.company || "Not Provided"
          }</p>

          <p><strong>Project Type & Location:</strong> ${
            data.project
          }</p>

          <p><strong>Brief Description:</strong></p>

          <div style="padding: 12px; background: #f5f5f5; border-radius: 6px;">
            ${data.description}
          </div>

          <p><strong>Timeline:</strong> ${data.timeline}</p>

          <p><strong>Preferred Contact Method:</strong> ${
            data.contactMethod
          }</p>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("CONTACT FORM ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to send email.",
      },
      { status: 500 }
    );
  }
}