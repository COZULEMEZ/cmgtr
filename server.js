import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

app.post('/api/apply', async (req, res) => {
  const { name, location, genre, instagram, email, links, message } = req.body;

  try {
    // 1. Notification Email to CMG
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cozulemezmusicgroup@gmail.com',
      subject: `Yeni Sanatçı Başvurusu: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0071e3;">Yeni Sanatçı Başvurusu</h2>
          <p><strong>Sanatçı/Plak Şirketi:</strong> ${name}</p>
          <p><strong>Konum:</strong> ${location}</p>
          <p><strong>Tür:</strong> ${genre}</p>
          <p><strong>Instagram:</strong> <a href="https://instagram.com/cmg.tr">${instagram}</a></p>
          <p><strong>İletişim:</strong> ${email}</p>
          <p><strong>Bağlantılar:</strong> <a href="${links}">${links}</a></p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        </div>
      `,
    };

    // 2. Auto-Responder to Artist
    const artistMailOptions = {
      from: `"Cozulemez Music Group" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Cozulemez Music Group',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px; line-height: 1.6; color: #1d1d1f; max-width: 600px; margin: auto;">
          <h1 style="font-size: 26px; font-weight: 700; color: #000; margin-bottom: 24px;">Welcome to Cozulemez Music Group.</h1>
          <p>Sayın ${name},</p>
          <p>Başvurunuz başarıyla alındı ve <strong>A&R değerlendirme döngümüze</strong> girdi. Cozulemez Music Group (CMG) olarak, her projenin hak ettiği gelişmiş altyapıyı ve stratejik odağı almasını sağlamak için son derece seçici bir ortaklık modeli sürdürüyoruz.</p>
          <p>Ekibimiz, projenizin sonik sadakati, marka bütünlüğü ve küresel bölge potansiyeli hakkında kapsamlı bir denetim yürütecektir. Bu süreç genellikle 48 ila 72 saat içinde sonuçlanır.</p>
          
          <div style="background: #f5f5f7; padding: 24px; border-radius: 14px; margin: 32px 0; border-left: 4px solid #000;">
             <p style="margin: 0; font-style: italic; color: #444;">"Kategorize edilmeyi reddeden yaratıcıları güçlendiriyor, küresel yankı ve kültürel etki için yüksek sadakatli bir yol haritası sunuyoruz."</p>
          </div>

          <p>Bu süre zarfında, yolculuğumuzu takip etmeye ve iş birliği ağımızı çalışırken görmeye davet ediyoruz:</p>
          <p style="margin-top: 20px;">
            <a href="https://instagram.com/cmg.tr" style="display: inline-block; padding: 14px 28px; background: #000; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px;">Instagram'da @cmg.tr'yi takip edin →</a>
          </p>
          
          <hr style="border: 0; border-top: 1px solid #e5e5e7; margin: 40px 0;">
          <p style="font-size: 12px; color: #86868b; text-align: center;">© 2026 COZULEMEZ MUSIC GROUP. ALL RIGHTS RESERVED.</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(artistMailOptions);

    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('FULL EMAIL ERROR:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to process application'
    });
  }
});

// Note: In Vercel deployment, this file is not used for static hosting.
// Static files are served by Vercel natively.
// The API is handled by /api/apply.js as a serverless function.

app.listen(port, () => {
  console.log(`CMG Local API Server running on http://localhost:${port}`);
});
