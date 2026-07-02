import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailPassword) {
      console.error(
        "❌ ERROR: La variable de entorno EMAIL_PASSWORD no está definida en el archivo .env",
      );
      return NextResponse.json(
        { error: "Error de configuración interna en el servidor." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "webstore@astavenezuela.com",
        pass: emailPassword,
      },
    });

    // 📂 Definimos las rutas físicas absolutas de las imágenes en tu carpeta /public
    // Ajusta los nombres exactos de los archivos si tus extensiones son .png o .jpg
    const logoPath = path.join(process.cwd(), "public", "ASTA LOGO.png");
    const mascotaPath = path.join(process.cwd(), "public", "ASTA MASCOTA.png");

    const mailOptions = {
      from: `"ASTA WEB" <webstore@astavenezuela.com>`,
      to: "webstore@astavenezuela.com",
      replyTo: email,
      subject: `Contacto AstaWeb [${subject.toUpperCase()}]: ${name}`,

      // 🎨 DISEÑO ULTRA MODERNO, MINIMALISTA Y PROFESIONAL
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">

            <div style="background-color: #ffffff; padding: 32px; text-align: center; border-bottom: 1px solid #f1f5f9;">
              <img src="cid:astalogo" alt="ASTA Logo" style="height: 45px; width: auto; object-contain: fit;" />
            </div>

            <div style="padding: 40px 32px;">
              <h2 style="font-size: 20px; font-weight: 800; color: #0b63cd; margin-top: 0; margin-bottom: 8px; tracking-tight: -0.025em;">
                Nueva solicitud de información
              </h2>
              <p style="font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 32px; font-medium: 500;">
                Se ha recibido un nuevo mensaje a través del formulario de la tienda web.
              </p>

              <div style="margin-bottom: 32px;">
                <div style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; display: inline-block;">Nombre</span>
                  <span style="font-size: 14px; font-weight: 600; color: #1e293b;">${name}</span>
                </div>
                <div style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; display: inline-block;">Email</span>
                  <span style="font-size: 14px; font-weight: 600; color: #0b63cd;"><a href="mailto:${email}" style="color: #0b63cd; text-decoration: none;">${email}</a></span>
                </div>
                <div style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; display: inline-block;">Teléfono</span>
                  <span style="font-size: 14px; font-weight: 600; color: #1e293b;">${phone || "—"}</span>
                </div>
                <div style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between;">
                  <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; width: 120px; display: inline-block;">Asunto</span>
                  <span style="font-size: 14px; font-weight: 600; color: #475569; background-color: #f1f5f9; padding: 4px 10px; border-radius: 8px; text-transform: capitalize;">${subject}</span>
                </div>
              </div>

              <div style="background-color: #f8fafc; border-radius: 16px; padding: 24px; border: 1px solid #edf2f7;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Requerimiento o Mensaje:</p>
                <p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.6; white-space: pre-line;">${message}</p>
              </div>
            </div>

            <div style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #f1f5f9; position: relative;">
              <img src="cid:astamascota" alt="Mascota ASTA" style="height: 70px; width: auto; margin-bottom: 12px;" />
              <p style="margin: 0; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em;">
                Ingeniería en Impresión ASTA
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">
                © 2026 ASTA Venezuela. Todos los derechos reservados.
              </p>
            </div>

          </div>
        </div>
      `,

      // 📎 Adjuntamos los recursos con identificadores de contenido (cid)
      attachments: [
        {
          filename: "ASTA LOGO.png",
          path: logoPath,
          cid: "astalogo", // Este id debe coincidir exactamente con src="cid:astalogo"
        },
        {
          filename: "ASTA MASCOTA.png",
          path: mascotaPath,
          cid: "astamascota", // Este id debe coincidir exactamente con src="cid:astamascota"
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error enviando el correo:", error);
    return NextResponse.json(
      { error: "Hubo un fallo al enviar el mensaje." },
      { status: 500 },
    );
  }
}
