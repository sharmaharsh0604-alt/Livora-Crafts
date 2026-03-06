import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    await resend.emails.send({
      from: "Livora Crafts <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New Catalogue Request — ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#fdfaf5;border:1px solid #e8dcc8;">
          <div style="border-top:3px solid #a8722a;margin-bottom:28px;"></div>
          <h2 style="color:#6B4B2A;margin:0 0 8px;font-size:22px;">New Catalogue Request</h2>
          <p style="color:#9a8570;font-size:13px;margin:0 0 28px;">Received from livoracrafts.com</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#9a8570;font-size:11px;text-transform:uppercase;letter-spacing:1px;width:130px;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#1a1208;font-size:15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#9a8570;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#1a1208;font-size:15px;"><a href="mailto:${email}" style="color:#a8722a;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#9a8570;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #e8dcc8;color:#1a1208;font-size:15px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;color:#9a8570;font-size:11px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;padding-top:16px;">Requirements</td>
              <td style="padding:12px 0;padding-top:16px;color:#1a1208;font-size:15px;line-height:1.7;">${message}</td>
            </tr>
          </table>

          <div style="margin-top:28px;padding:16px 20px;background:#f2ead8;border-left:3px solid #C4A882;">
            <p style="margin:0;color:#6B4B2A;font-size:13px;line-height:1.6;">
              Hit <strong>Reply</strong> to respond directly to <strong>${name}</strong> at ${email}
            </p>
          </div>

          <p style="margin-top:24px;color:#c4b8a8;font-size:11px;text-align:center;">Livora Crafts · livoracrafts.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}