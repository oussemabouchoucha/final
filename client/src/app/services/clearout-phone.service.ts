import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearoutPhoneService {
  private apiUrl = 'https://api.clearoutphone.io/v1/phonenumber/validate';
  private apiToken = '5029a573ab34c16cd1e09ef8db7081ab:f8f43731140f8f34554129a92a3b8200dd76174c69c87aa9b3d5a13ef320b59c';

  constructor(private http: HttpClient) { }

  validatePhoneNumber(number: string, countryCode: string = 'US'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${this.apiToken}`
    });
    
    const body = {
      number: number,
      country_code: countryCode
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
