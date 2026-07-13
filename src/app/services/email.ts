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
  // ⚠️ ВСТАВЬТЕ СЮДА ВАШ ACCESS_KEY ИЗ WEB3FORMS (приходит на почту)
  private readonly ACCESS_KEY = '34c9da56-7702-4fe9-bb33-3d273c35c562';

  // Прямая ссылка на API Web3Forms (больше никаких /api/...)
  private readonly apiUrl = 'https://api.web3forms.com/submit';

  constructor(private http: HttpClient) {}

  sendQuizRequest(payload: EmailPayload): Observable<any> {

    const q1 = payload.answers?.[1] === 1 ? 'Прямая' :
               payload.answers?.[1] === 2 ? 'Угловая' :
               payload.answers?.[1] === 3 ? 'П-образная' : 'С островом';

    const q2 = payload.answers?.[2] === 1 ? 'До 2 метров' :
               payload.answers?.[2] === 2 ? '2-3 метра' :
               payload.answers?.[2] === 3 ? '3-4 метра' : 'Более 4 метров';

    const q3 = payload.answers?.[3] === 1 ? 'МДФ-пленка' :
               payload.answers?.[3] === 2 ? 'МДФ-пластик' :
               payload.answers?.[3] === 3 ? 'Эмаль' : 'Нужна консультация';

    const q4 = payload.answers?.[4] === 1 ? 'До 150 т.р.' :
               payload.answers?.[4] === 2 ? '150-250 т.р.' :
               payload.answers?.[4] === 3 ? '250-400 т.р.' : 'Более 400 т.р.';

    const formattedAnswers = `
       Планировка: ${payload.answers?.[1] ? q1 : 'Не выбрано'}
       Длина: ${payload.answers?.[2] ? q2 : 'Не выбрано'}
       Фасады: ${payload.answers?.[3] ? q3 : 'Не выбрано'}
       Бюджет: ${payload.answers?.[4] ? q4 : 'Не выбрано'}
      `.trim();

    const formData = {
      access_key: this.ACCESS_KEY,
      subject: payload.type === 'callback'
        ? '📞 Заявка обратного звонка'
        : '🎯 Новая заявка с квиза',
      name: payload.contacts.name,
      phone: payload.contacts.phone,

      answers: payload.type === 'quiz' ? formattedAnswers : 'Форма обратного звонка (без квиза)',

      // Включаем красивую таблицу в письме
      _template: 'table'
    };

    return this.http.post(this.apiUrl, formData);
  }

  // Этот метод вызывается из callback.ts
  sendCallback(name: string, phone: string): Observable<any> {
    return this.sendQuizRequest({
      type: 'callback',
      contacts: { name, phone }
    });
  }
}
