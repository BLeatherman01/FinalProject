import { Component, OnInit } from '@angular/core';
import { Datum, SearchPlant } from '../searched-plant';
import { SearchedPlantService } from '../searched-plant.service';

@Component({
  selector: 'app-searched-plant',
  templateUrl: './searched-plant.component.html',
  styleUrls: ['./searched-plant.component.css'],
})
export class SearchedPlantComponent implements OnInit {
  results: SearchPlant = {} as SearchPlant;

  searchPlants: string = '';

  list: Datum[] = [];

  constructor(private plantApi: SearchedPlantService) {}

  ngOnInit(): void {}

  getPlantDetails(): void {
    this.plantApi
      .getPlants(this.searchPlants)
      .subscribe((result: SearchPlant) => {
        this.results = result;
        this.list = this.results.data;
        console.log('second', result);
        console.log(this.results);
      });
  }
}
