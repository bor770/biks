import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisHeaderComponent } from './analysis-header.component';

describe('AnalysisHeaderComponent', () => {
  let component: AnalysisHeaderComponent;
  let fixture: ComponentFixture<AnalysisHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
