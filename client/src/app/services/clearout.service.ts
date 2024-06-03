import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearoutService {
  private apiUrlBase = 'https://api.';

  private emailUrl = this.apiUrlBase + 'clearout.io/v2/email_verify';
  private phoneUrl = this.apiUrlBase + 'clearoutphone.io/v1/phonenumber/validate';

  private appToken = 'be62b58dac024ae0e0467f30fb71d4a6:42c2a1b162690266874a1753c0d90028a2340c1b559504a0145d28ec51a77404';
  private phoneToken = '5029a573ab34c16cd1e09ef8db7081ab:f8f43731140f8f34554129a92a3b8200dd76174c69c87aa9b3d5a13ef320b59c';

  constructor(private http: HttpClient) {}

  validateEmail(email: string): Observable<any> {
    const url = `${this.emailUrl}?email=${email}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.appToken}`
    });
    console.log('Email validation request URL:', url);
    console.log('Email validation request headers:', headers);
    
    return this.http.post(url, email, { headers: headers });
  }

  validatePhoneNumber(number: string, countryCode: string = 'TN'): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.phoneToken}`
    });

    const body = {
      number: String(number),
      country_code: countryCode
    };

    console.log('Phone validation request:', this.phoneUrl, body, headers);
    return this.http.post(this.phoneUrl, body, { headers: headers });
  }
}









// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ClearoutService {
//   private apiUrl = 'https://api.clearout.io';
//   private appToken = 'be62b58dac024ae0e0467f30fb71d4a6:42c2a1b162690266874a1753c0d90028a2340c1b559504a0145d28ec51a77404';

//   constructor(private http: HttpClient) {}

//   validateEmail(email: string): Observable<any> {
//     const url = `${this.apiUrl}/v2/email_verify?email=${email}`;
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${this.appToken}`
//     };
//     return this.http.get(url, { headers });
//   }
// }
    