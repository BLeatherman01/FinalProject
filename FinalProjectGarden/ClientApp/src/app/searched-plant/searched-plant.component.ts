import { Component, OnInit } from '@angular/core';
import { Hit, SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';

@Component({
  selector: 'app-searched-plant',
  templateUrl: './searched-plant.component.html',
  styleUrls: ['./searched-plant.component.css'],
})
export class SearchedPlantComponent implements OnInit {
  results: SearchPlant = {} as SearchPlant;
  imageResults: SearchImage = {} as SearchImage;
  imageList: string [] = [];
  
  searchPlants: string = '';
  commonName: Plant = {} as Plant
  
  name: string = '';
  list: Plant[] = [];

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
       this.results.data.forEach((plant: Plant) => {
           let name =plant.common_name;
           console.log("check",name)  
          this.getImageDetails(name);
          console.log(plant)
      })
      
      });
  }
  getImageDetails(name: string): void {
    this.ImageApi.getImages(name).subscribe(
      (result: SearchImage) => {

        if(result.hits[0]){
        this.imageList.push(result.hits[0].previewURL);
        console.log("hits", result.hits[0]);
        }
        else{
          this.imageList.push("/assets/Garden.jpg");
        }
      }
    );
  }
}
