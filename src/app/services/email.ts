import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface EmailPayload {
  type: 'quiz' | 'callback';
  answers?: Record<number, number>;
  contacts: {
    name: string;
    phone: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // === НАСТРОЙКИ WEB3FORMS ===
  private readonly ACCESS_KEY = '34c9da56-7702-4fe9-bb33-3d273c35c562';
  private readonly web3formsUrl = 'https://api.web3forms.com/submit';

  // === НАСТРОЙКИ TELEGRAM (ВСТАВЬТЕ СВОИ ДАННЫЕ) ===
  private readonly TG_BOT_TOKEN = '8275863085:AAF1TOejF1XKIMi3sWjmYjyvi_x6cgBb13E'; // Например: 123456789:AAH...
  private readonly TG_CHAT_ID = '1379541270'; // Например: 987654321
  private readonly TG_API_URL = `https://api.telegram.org/bot${this.TG_BOT_TOKEN}/sendMessage`;

  constructor(private http: HttpClient) {}

  sendQuizRequest(payload: EmailPayload): Observable<any> {
    // 1. Расшифровка ответов для красивого отображения
    const getQ1 = (id: number) => id === 1 ? 'Прямая' : id === 2 ? 'Угловая' : id === 3 ? 'П-образная' : 'С островом';
    const getQ2 = (id: number) => id === 1 ? 'До 2 метров' : id === 2 ? '2-3 метра' : id === 3 ? '3-4 метра' : 'Более 4 метров';
    const getQ3 = (id: number) => id === 1 ? 'МДФ-пленка' : id === 2 ? 'МДФ-пластик' : id === 3 ? 'Эмаль' : 'Нужна консультация';
    const getQ4 = (id: number) => id === 1 ? 'До 150 000 ₽' : id === 2 ? '150 000 - 250 000 ₽' : id === 3 ? '250 000 - 400 000 ₽' : 'Более 400 000 ₽';

    // 2. Отправка на Email (Web3Forms)
    const formData: any = {
      access_key: this.ACCESS_KEY,
      subject: payload.type === 'callback' ? '📞 Заявка обратного звонка' : '🎯 Новая заявка с квиза',
      'Имя': payload.contacts.name,
      'Телефон': payload.contacts.phone,
      '_template': 'table'
    };

    if (payload.type === 'quiz' && payload.answers) {
      formData['Планировка кухни'] = payload.answers[1] ? getQ1(payload.answers[1]) : 'Не выбрано';
      formData['Длина кухни'] = payload.answers[2] ? getQ2(payload.answers[2]) : 'Не выбрано';
      formData['Материал фасадов'] = payload.answers[3] ? getQ3(payload.answers[3]) : 'Не выбрано';
      formData['Бюджет'] = payload.answers[4] ? getQ4(payload.answers[4]) : 'Не выбрано';
    } else {
      formData['Тип заявки'] = 'Обратный звонок (без квиза)';
    }

    const emailObservable = this.http.post(this.web3formsUrl, formData);

    // 3. Отправка в Telegram (запускаем параллельно)
    this.sendToTelegram(payload, getQ1, getQ2, getQ3, getQ4);

    // Возвращаем Observable для формы, чтобы кнопка "Отправляем..." корректно отработала
    return emailObservable;
  }

  // Приватный метод для отправки в Telegram
  private sendToTelegram(
    payload: EmailPayload,
    getQ1: Function, getQ2: Function, getQ3: Function, getQ4: Function
  ): void {
    const isQuiz = payload.type === 'quiz' && payload.answers;

    // Формируем красивое сообщение с HTML-разметкой (жирный шрифт)
    const message = `
      🔔 <b>Новая заявка с сайта!</b>

      👤 <b>Имя:</b> ${payload.contacts.name || 'Не указано'}
      📞 <b>Телефон:</b> ${payload.contacts.phone || 'Не указан'}
      📝 <b>Тип:</b> ${isQuiz ? 'Квиз' : 'Обратный звонок'}

      ${isQuiz ? `📐 <b>Планировка:</b> ${payload.answers![1] ? getQ1(payload.answers![1]) : 'Не выбрано'}
      📏 <b>Длина:</b> ${payload.answers![2] ? getQ2(payload.answers![2]) : 'Не выбрано'}
      🎨 <b>Фасады:</b> ${payload.answers![3] ? getQ3(payload.answers![3]) : 'Не выбрано'}
      💰 <b>Бюджет:</b> ${payload.answers![4] ? getQ4(payload.answers![4]) : 'Не выбрано'}` : ''}
          `.trim();

    this.http.post(this.TG_API_URL, {
      chat_id: this.TG_CHAT_ID,
      text: message,
      parse_mode: 'HTML' // Включаем поддержку жирного шрифта
    }).subscribe({
      next: () => console.log('✅ Уведомление в Telegram отправлено'),
      error: (err) => console.error('❌ Ошибка отправки в Telegram:', err)
    });
  }

  sendCallback(name: string, phone: string): Observable<any> {
    return this.sendQuizRequest({
      type: 'callback',
      contacts: { name, phone }
    });
  }
}
