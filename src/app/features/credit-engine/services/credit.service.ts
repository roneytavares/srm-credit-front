import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreditProposalRequest {
  clientName: string;
  requestedAmount: number;
  termMonths: number;
}

export interface CreditProposalResponse {
  id: number;
  clientName: string;
  requestedAmount: number;
  termMonths: number;
  approvedLimit: number;
  status: string;
  targetCurrency?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = 'http://localhost:8080/api/v1/credits';

  constructor(private http: HttpClient) {}

  createProposal(payload: CreditProposalRequest): Observable<CreditProposalResponse> {
    return this.http.post<CreditProposalResponse>(this.apiUrl, payload);
  }
}