import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditService, CreditProposalResponse } from '../credit-engine/services/credit.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private creditService = inject(CreditService);

  faceValue = signal<number>(100000.00);
  termMonths = signal<number>(6);
  discountRate = signal<number>(2.5);
  assetType = signal<string>('DUPLICATA');
  clientName = signal<string>('SRM Cedente Teste S.A.');

  // Armazena a resposta oficial calculada e persistida pelo backend Spring Boot
  latestResponse = signal<CreditProposalResponse | null>(null);
  
  // Sinal para controlar a exibição da mensagem de sucesso
  successMessage = signal<string | null>(null);
  
  // Novo Signal para a descrição do caso ativo
  activeCaseDescription = signal<string>('Selecione um Golden Case acima para carregar os parâmetros predeterminados.');

  loadGoldenCase(caseName: string) {
    this.successMessage.set(null);
    if (caseName === 'C1') {
      this.faceValue.set(100000.00); // Corrigido para 100.000,00
      this.termMonths.set(3);
      this.discountRate.set(1.5);    // Corrigido para 1.5% (spread da Duplicata)
      this.assetType.set('DUPLICATA');
      this.activeCaseDescription.set('Caso C1: Duplicata de Médio/Alto Valor — R$ 100.000,00 | Prazo: 3 meses | Taxa: 1.5% a.m.');
    } else if (caseName === 'C2') {
      this.faceValue.set(25000.00);  // Corrigido para 25.000,00 conforme C2
      this.termMonths.set(2);        // Corrigido para 2 meses
      this.discountRate.set(2.5);    // 2.5% (spread do Cheque Pré-datado)
      this.assetType.set('CHEQUE');
      this.activeCaseDescription.set('Caso C2: Cheque Pré-datado de Curto Prazo — R$ 25.000,00 | Prazo: 2 meses | Taxa: 2.5% a.m.');
    } else if (caseName === 'C3') {
      this.faceValue.set(100000.00); // Corrigido para 100.000,00 conforme C3
      this.termMonths.set(3);
      this.discountRate.set(1.5);
      this.assetType.set('DUPLICATA');
      this.activeCaseDescription.set('Caso C3: Duplicata com Parâmetros Alternativos — R$ 100.000,00 | Prazo: 3 meses | Taxa: 1.5% a.m.');
    }
    this.simulate(caseName);
  }

  simulate(caseName?: string) {
    this.successMessage.set(null);

    // Constrói o payload enviando os campos exigidos pelo contrato OpenAPI
    const payload: any = {
      clientName: this.clientName(),
      requestedAmount: this.faceValue(),
      termMonths: this.termMonths(),
      assetType: this.assetType(),
      targetCurrency: 'BRL',
      exchangeRate: null
    };

    // Configura o C3 para cross-currency (USD com taxa de câmbio oficial do desafio)
    if (caseName === 'C3') {
      payload.targetCurrency = 'USD';
      payload.exchangeRate = 5.4321;
    }

    this.creditService.createProposal(payload).subscribe({
      next: (response) => {
        this.latestResponse.set(response);
        this.successMessage.set(`Solicitação efetuada com sucesso! Proposta #${response.id} registrada.`);
      },
      error: (err) => {
        console.error('Erro ao comunicar com o Motor de Crédito:', err);
        alert('Erro ao processar a liquidação na API Spring Boot. Verifique se o backend está ativo.');
      }
    });
  }
}