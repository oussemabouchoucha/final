import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private url = 'api/lead';
  constructor(
    private http: HttpClient
  ) { }
}
