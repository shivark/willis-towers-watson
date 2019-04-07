import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Policy } from 'src/models/policy';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private apiUrl = '/api/policies/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Policy[]> {
    return this.http
      .get<Policy[]>(this.apiUrl);
  }

  getById(id: number): Observable<Policy> {
    return this.http
      .get<Policy>(`${this.apiUrl}${id}`);
  }

  delete(policyId: Policy | number): Observable<{}> {
    const id = typeof policyId === 'number' ? policyId : policyId.policyNumber;
    return this.http.delete<Policy>(`${this.apiUrl}${id}`);
  }

  save(policy: Policy): Observable<Policy> {
    return policy.policyNumber ? this.update(policy) : this.post(policy);
  }

  private post(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.apiUrl, policy);
  }

  private update(policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(this.apiUrl, policy);
  }
}
