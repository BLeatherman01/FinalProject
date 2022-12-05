import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGardenComponent } from './my-garden.component';

describe('MyGardenComponent', () => {
  let component: MyGardenComponent;
  let fixture: ComponentFixture<MyGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGardenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
