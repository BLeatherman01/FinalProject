import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedPlantComponent } from './searched-plant.component';

describe('SearchedPlantComponent', () => {
  let component: SearchedPlantComponent;
  let fixture: ComponentFixture<SearchedPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedPlantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
