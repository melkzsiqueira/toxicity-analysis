import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToxicityAnalysisComponent } from './toxicity-analysis.component';

describe('ToxicityAnalysisComponent', () => {
  let component: ToxicityAnalysisComponent;
  let fixture: ComponentFixture<ToxicityAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToxicityAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToxicityAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
