import { Component, OnInit } from '@angular/core';
import { Hit, SearchImage } from '../searched-images';
import { SearchedImagesService } from '../searched-images.service';
import { Datum, SearchPlant } from '../searched-plant';
import { SearchedPlantService } from '../searched-plant.service';

@Component({
  selector: 'app-searched-plant',
  templateUrl: './searched-plant.component.html',
  styleUrls: ['./searched-plant.component.css'],
})
export class SearchedPlantComponent implements OnInit {
  results: SearchPlant = {} as SearchPlant;
  imageResults: SearchImage = {} as SearchImage;
  imageList: Hit [] = [];
  searchPlants: string = '';
  searchImage: string = ''; 
  list: Datum[] = [];

  constructor(private plantApi: SearchedPlantService, private ImageApi :SearchedImagesService) {}

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
    getImageDetails(): void {
      this.ImageApi
      .getImages(this.searchImage)
      .subscribe((result: SearchImage) => {
      this.imageResults = result;
      this.imageList = this.imageResults.hits;
      console.log(this.imageResults);
      })

    }
}
