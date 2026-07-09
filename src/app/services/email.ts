import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QuizPayload {
  answers: Record<number, number>;
  contacts: {
    name: string;
    phone: string;
  };
}

interface CallbackPayload {
  name: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class Email {
  constructor(private http: HttpClient) {}

  sendQuizRequest(payload: QuizPayload): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>('/api/send-quiz', payload);
  }

  sendCallback(name: string, phone: string): Observable<{ success: boolean; message?: string }> {
    const payload: CallbackPayload = { name, phone };
    return this.http.post<{ success: boolean; message?: string }>('/api/send-callback', payload);
  }
}
