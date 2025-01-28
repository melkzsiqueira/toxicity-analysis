import { Component } from '@angular/core';
import { ToxicityAnalysisComponent } from './components/toxicity-analysis/toxicity-analysis.component';

@Component({
  selector: 'app-home',
  imports: [ToxicityAnalysisComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
