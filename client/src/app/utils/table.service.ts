import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = '/api/auth';
  constructor(private http: HttpClient) { }

  public covid19Reports() {
    return this.http.get("https://disease.sh/v3/covid-19/countries");
  }

  public covid19ReportsByCountry(country: string) {
    return this.http.get(`https://disease.sh/v3/covid-19/countries/${country}`);
  }
  public usersTableByRole(role: string) {
    return this.http.get(`${this.apiUrl}/users/${role}`);
  }

  public usersTable() {
    return this.http.get(`${this.apiUrl}/users`);
  }
  public leadsTable() {
    return this.http.get(`api/lead/leads`);
  }


  public createLead(data: any){
    console.log('Data being sent:', data);
    return this.http.post(`api/lead/create`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
  updateLead(id: number, lead: any): Observable<any> {
    return this.http.patch(`api/lead/leads/${id}`, lead);
  }
  deleteLead(id: number): Observable<any> {
    return this.http.delete(`api/lead/leads/${id}`);
  }

  public importLeads(formData: FormData): Observable<any> {
    return this.http.post(`/api/lead/import`, formData).pipe(
      catchError(this.handleError)
    ); 
  } 
  
  // public sendInvitationEmail(email: string) {
  //   return this.http.post(`${this.apiUrl}/register`, email);
  // }
}
