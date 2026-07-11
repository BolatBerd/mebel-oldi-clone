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
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  sendQuizRequest(payload: EmailPayload): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.apiUrl}/send-quiz`, payload);
  }

  sendCallback(name: string, phone: string): Observable<{ success: boolean; message?: string }> {
    const payload: EmailPayload = {
      type: 'callback',
      contacts: { name, phone }
    };
    return this.http.post<{ success: boolean; message?: string }>(`${this.apiUrl}/send-quiz`, payload);
  }
}

export { EmailService as Email };
