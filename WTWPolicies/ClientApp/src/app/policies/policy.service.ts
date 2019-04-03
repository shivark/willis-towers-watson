import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Policy } from 'src/models/policy';
import { catchError, tap } from 'rxjs/operators';
import { Gender } from 'src/models/gender';


@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  private apiUrl: string = '/api/policies/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(this.apiUrl)
      .pipe(
        tap(res => console.log("response", res)),
        catchError(this.handleError))
  }

  getById(id: number): Observable<Policy> {
    return this.http
      .get<Policy>(`${this.apiUrl}${id}`)
      .pipe(
        tap(res => console.log("response", res)),
        catchError(this.handleError))
  }


  delete(policyId: Policy | number): Observable<{}> {
    const id = typeof policyId === 'number' ? policyId : policyId.policyNumber;

    return this.http.delete<Policy>(`${this.apiUrl}${id}`).pipe(
      tap(() => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError)
    );
  }

  post(policy: Policy): Observable<Policy> {
    let p: Policy = {
      policyNumber: 123,
      policyHolder: {
        age: 24,
        name: 'Pashmi',
        gender: Gender.female
      }
    };

    return this.http.post<Policy>(this.apiUrl, p)
      .pipe(
        tap(data => console.log('create Policy: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  update(policy: Policy): Observable<Policy> {
    console.log('update is called');
    let p: Policy = {
      policyNumber: 123,
      policyHolder: {
        age: 24,
        name: 'Pashmi',
        gender: Gender.female
      }
    };

    return this.http.put<Policy>(this.apiUrl, p)
      .pipe(
        tap(data => console.log('create Policy: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
