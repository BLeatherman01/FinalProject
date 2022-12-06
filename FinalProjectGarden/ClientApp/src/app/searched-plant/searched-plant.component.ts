import { Component, OnInit } from '@angular/core';
import { Hit, SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Datum, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';

@Component({
  selector: 'app-searched-plant',
  templateUrl: './searched-plant.component.html',
  styleUrls: ['./searched-plant.component.css'],
})
export class SearchedPlantComponent implements OnInit {
  results: SearchPlant = {} as SearchPlant;
  imageResults: SearchImage = {} as SearchImage;
  imageList: Hit[] = [];
  searchPlants: string = '';

  list: Datum[] = [];
  // images: any = [];
  constructor(
    private plantApi: SearchedPlantService,
    private ImageApi: SearchedImagesService
  ) {}

  ngOnInit(): void {}

  getPlantDetails(): void {
    this.plantApi
      .getPlants(this.searchPlants)
      .subscribe((result: SearchPlant) => {
        this.results = result;
        this.list = this.results.data;
        console.log(this.results);
        this.getImageDetails();
      });
  }
  getImageDetails(): void {
    this.ImageApi.getImages(this.searchPlants).subscribe(
      (result: SearchImage) => {
        this.imageResults = result;
        this.imageList = this.imageResults.hits;
        console.log(this.imageResults);
      }
    );
  }
  // getImageDetails(): void {
  //   this.ImageApi
  //   .getImages(this.searchImage)
  //   .subscribe(response => {
  //     this.images = response;
  //   });
  // }
}
