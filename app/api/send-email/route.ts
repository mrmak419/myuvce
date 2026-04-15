import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    // NEW: Extract portalLink
    const { studentEmail, studentName, eventTitle, clubName, eventDate, portalLink } = await request.json();

    if (!studentEmail || !eventTitle) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const formattedDate = eventDate 
      ? new Date(eventDate).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) 
      : 'Date TBA';

    const firstName = studentName ? studentName.split(' ')[0] : 'there';

    // NEW: Added the button to the HTML payload
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #18181b;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #4f46e5; margin-bottom: 8px; font-size: 24px;">Hi ${firstName}, you're in!</h1>
          <p style="color: #71717a; font-size: 16px; margin-top: 0;">Your registration is confirmed.</p>
        </div>
        
        <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 16px; padding: 32px; margin-bottom: 32px;">
          <h2 style="margin-top: 0; color: #18181b; font-size: 20px;">${eventTitle}</h2>
          <p style="color: #52525b; margin-bottom: 12px; font-size: 15px;"><strong>Hosted by:</strong> ${clubName}</p>
          <p style="color: #52525b; margin-bottom: 0; font-size: 15px;"><strong>When:</strong> ${formattedDate}</p>
          
          ${portalLink ? `
          <div style="margin-top: 32px; text-align: center;">
            <a href="${portalLink}" style="background-color: #18181b; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; display: inline-block;">View / Edit Registration</a>
          </div>
          ` : ''}
        </div>

        <p style="color: #a1a1aa; font-size: 13px; text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #f4f4f5;">
          This is an automated message from the MyUVCE Events Platform.<br>
          For questions or cancellations, please contact the club directly.
        </p>
      </div>
    `;

    const dkimPrivateKey = process.env.DKIM_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const payload = {
      personalizations: [
        {
          to: [{ email: studentEmail, name: studentName }],
          dkim_domain: "myuvce.in",
          dkim_selector: "mailchannels",
          dkim_private_key: dkimPrivateKey
        },
      ],
      from: {
        email: "events@myuvce.in", 
        name: "MyUVCE Events",
      },
      subject: `Confirmed: ${eventTitle}`,
      content: [
        {
          type: "text/html",
          value: htmlContent,
        },
      ],
    };

    const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}