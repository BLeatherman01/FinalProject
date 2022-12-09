import { Component, inject, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Hit, SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  constructor(
    private plantApi: SearchedPlantService,
    private ImageApi: SearchedImagesService,
    private gardenService : MyGardenService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

  }

  AddToGarden(plant:Plant, imageurl : string): void {
    let newPlant : MyGarden = { id : 0 , gardenId : 0, plantId: plant.id, plantImageUrl: imageurl }
    this.gardenService.PlantingGarden(newPlant,this.user.id).subscribe((result : MyGarden)=>{
      console.log(result);
    })

  }

  getPlantDetails(): void {
    this.plantApi
      .getPlants(this.searchPlants)
      .subscribe((result: SearchPlant) => {
        this.results = result;
        this.list = this.results.data;
       this.results.data.forEach((plant: Plant) => {
           let name =plant.common_name;
           console.log("check",name)  
          this.getImageDetails();
          console.log(plant)
      })
      
      });
  }
  getImageDetails(): void {
    this.ImageApi.getImages(this.searchPlants).subscribe(
      (result: SearchImage) => {

        if(result.hits[0]){
        console.log("check results", result.hits[0].previewURL)
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
