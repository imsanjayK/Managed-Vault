import { Injectable } from '@angular/core';
import { Account } from '../models/Account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
  private urlPath = 'api/account';
  // private apiUrl = 'accountdata.json';
  // private apiUrl = 'https://localhost:7042/api/account'
  // private apiUrl = 'https://bf59-2405-201-d002-41e5-3874-dfb3-9133-d87d.ngrok-free.app/api/account';
 private apiUrl = 'https://managevaultwebapiservices-production.up.railway.app/' + this.urlPath;
  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get all accounts (GET request)
  getAllAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('API call failed: ', JSON.stringify(error));
        return throwError(() => new Error(JSON.stringify(error)));
      })
    );
  }

  // Get an account by ID (GET request)
  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  // Update an existing account (PUT request)
  updateAccount(id: string, account: Account): Observable<any> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }

  // Delete an account (DELETE request)
  deleteAccount(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { observe: 'response' });
  }
}
