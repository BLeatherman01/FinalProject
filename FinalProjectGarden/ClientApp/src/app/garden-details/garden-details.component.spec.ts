import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardenDetailsComponent } from './garden-details.component';

describe('GardenDetailsComponent', () => {
  let component: GardenDetailsComponent;
  let fixture: ComponentFixture<GardenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GardenDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GardenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
