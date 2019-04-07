import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from 'src/models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private API_URL = '/api/policies/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.API_URL);
  }

  getById(id: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.API_URL}${id}`);
  }

  delete(policyNumber: number): Observable<{}> {
    return this.http.delete<Policy>(`${this.API_URL}${policyNumber}`);
  }

  save(policy: Policy): Observable<Policy> {
    return policy.policyNumber ? this.put(policy) : this.post(policy);
  }

  private post(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.API_URL, policy);
  }

  private put(policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(this.API_URL, policy);
  }
}
