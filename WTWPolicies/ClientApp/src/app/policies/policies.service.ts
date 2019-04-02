import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Policy } from 'src/models/policy';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {

  constructor(private http: HttpClient) { }

  get(): Observable<Policy[]> {
    return this.http
      .get<Policy[]>('/api/policies/')
      .pipe(
        //tap(res => console.log(res)),
        catchError(this.handleError<Policy[]>('getHeroes', [])))
  }


  delete(policyId: Policy | number): Observable<Policy> {
    const id = typeof policyId === 'number' ? policyId : policyId.policyNumber;
    const url = `/api/policies/${id}`;

    return this.http.delete<Policy>(url).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Policy>('deletePolicy'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //  this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    // loggerService
    //this.messageService.add(`HeroService: ${message}`);
  }
}
