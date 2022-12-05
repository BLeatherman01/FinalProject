import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POTDComponent } from './potd.component';

describe('POTDComponent', () => {
  let component: POTDComponent;
  let fixture: ComponentFixture<POTDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POTDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(POTDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
