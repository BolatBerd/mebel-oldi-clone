import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // или smtp.gmail.com
  port: 465,
  secure: true,
  auth: {
    user: process.env['EMAIL_USER'],     // Ваша почта
    pass: process.env['EMAIL_PASS']      // Пароль или App Password
  }
});

// Эндпоинт для отправки заявки
app.post('/api/send-quiz', async (req, res) => {
  try {
    if (!process.env['EMAIL_USER'] || !process.env['EMAIL_PASS']) {
      return res.status(500).json({
        success: false,
        message: 'SMTP credentials are not configured on the server'
      });
    }

    const { type, answers, contacts } = req.body;
    const recipient = process.env['EMAIL_TO'] || process.env['EMAIL_USER'];
    const isCallback = type === 'callback';

    const mailOptions = {
      from: process.env['EMAIL_USER'],
      to: recipient,
      subject: isCallback
        ? `📞 Новая заявка с формы обратного звонка от ${contacts.name}`
        : `🎯 Новая заявка с квиза от ${contacts.name}`,
      html: `
        <h2>${isCallback ? 'Новая заявка с формы обратного звонка' : 'Новая заявка с квиза'}</h2>
        <h3>Контакты:</h3>
        <p><strong>Имя:</strong> ${contacts.name}</p>
        <p><strong>Телефон:</strong> ${contacts.phone}</p>

        ${answers ? `<h3>Ответы:</h3><pre>${JSON.stringify(answers, null, 2)}</pre>` : ''}
      `
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Письмо отправлено' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Ошибка отправки' });
  }
  
});

const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
