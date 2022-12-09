import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterFrequencyComponent } from './water-frequency.component';

describe('WaterFrequencyComponent', () => {
  let component: WaterFrequencyComponent;
  let fixture: ComponentFixture<WaterFrequencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterFrequencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterFrequencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
