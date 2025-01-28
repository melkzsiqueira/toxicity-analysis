import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toxicity-analysis',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './toxicity-analysis.component.html',
  styleUrls: ['./toxicity-analysis.component.css'],
})
export class ToxicityAnalysisComponent implements OnInit {
  private worker!: Worker;
  public text: string = '';
  public toxity: string = '';
  public error: string = '';
  public loading: boolean = true;

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(
        new URL('../../../../workers/toxicity-analysis.worker', import.meta.url)
      );
      this.worker.onmessage = ({ data }) => this.handleWorkerMessage(data);
      this.worker.postMessage({ type: 'initialize' });
    } else {
      this.error = 'Web Workers are not suportados no seu navegador.';
    }
  }

  private handleWorkerMessage(data: any) {
    const { type, result, success, error } = data;

    if (type === 'initialized') {
      this.loading = false;

      if (!success) {
        this.error = 'Erro ao inicializar o modelo de análise de toxicidade.';
      }
    } else if (type === 'toxicity') {
      this.loading = false;

      if (result !== null && result !== undefined) {
        this.toxity = result
          ? 'Texto com alta probabilidade de ser tóxico.'
          : 'Texto com baixa probabilidade de ser tóxico.';
      }
    } else if (type === 'error') {
      this.loading = false;
      console.error(error);
    }
  }

  public async checkToxicity(): Promise<void> {
    if (!this.text || !this.worker) return;
    this.loading = true;
    this.worker.postMessage({
      type: 'analyzeToxicity',
      payload: { text: this.text },
    });
  }
}
