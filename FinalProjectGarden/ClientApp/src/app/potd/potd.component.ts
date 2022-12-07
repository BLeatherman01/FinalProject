import { Component, OnInit } from '@angular/core';
import { Hit, SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';

@Component({
  selector: 'app-potd',
  templateUrl: './potd.component.html',
  styleUrls: ['./potd.component.css']
})
export class POTDComponent implements OnInit {

  results: SearchPlant = {} as SearchPlant;
  imageResults: SearchImage = {} as SearchImage;
  imageList: Hit[] = [];
  plantImage: Hit = {} as Hit;
  searchPlants: string = '';
  commonName: string = '';

  list: Plant[] = [];


  RandomNameArray : string[] = ['"Sansevieria"','"Helianthus annuus"','"Tiger Lily"','"Cynara cardunculus"','"Woodland Strawberry"','"Gonialoe variegata"'];

  constructor(
    private plantApi: SearchedPlantService,
    private ImageApi: SearchedImagesService
  ) { }

  ngOnInit(): void {
    this.plantApi
      .getPlants(this.RandomNameArray[this.generateRandomNumb(0,5)])
      .subscribe((result: SearchPlant) => {
        console.log(this.results)
        this.results = result;
        this.list = this.results.data;
        console.log(this.list, "first List")
        this.list.splice(1);
        console.log(this.list, "Modified list")
        this.getImageDetails();
      });
  }
  

  getImageDetails(): void {
    this.ImageApi.getImages(this.searchPlants).subscribe(
      (result: SearchImage) => {
        this.imageResults = result;
        this.imageList = this.imageResults.hits;
        console.log(this.imageResults);
        this.plantImage = this.imageList[2];
      }
    );
  }

  
  generateRandomNumb(min: number,max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

}
