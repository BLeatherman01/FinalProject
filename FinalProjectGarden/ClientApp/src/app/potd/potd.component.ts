import { Component, OnInit } from '@angular/core';
import { Hit, SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SearchImages } from '../Services/search-bing';
import { BingSearchService } from '../Services/bing-search.service';
import { WikiService } from '../wiki.service';
import { Search, WikiSearch } from '../search-wiki';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';

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
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  plantList: Plant[] = [];
  list: Plant[] = [];
  bingImageResults: SearchImages = {} as SearchImages;

  bingImageList: string[] = [];
  wikiResult: WikiSearch = {} as WikiSearch
  wikiQueryList: Search [] = [];


  RandomNameArray : string[] = ['"Sansevieria"','"Helianthus annuus"','"Tiger Lily"','"Cynara cardunculus"','"Woodland Strawberry"','"Gonialoe variegata"'];

  constructor(
    private plantApi: SearchedPlantService,
    private ImageApi: SearchedImagesService,
    private gardenService: MyGardenService,
    private authService: SocialAuthService,
    private bingSearch: BingSearchService,
    private WikiApi: WikiService

  ) { }

  ngOnInit(): void {
    this.plantApi
      .getPlants(this.RandomNameArray[this.generateRandomNumb(0,5)])
      .subscribe((result: SearchPlant) => {
        this.results = result;
        this.list = this.results.data;
        this.list.splice(1);
        console.log(this.list)

        // added stuff 
        this.getBingImage(0,this.list[0].common_name);


        this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = user != null;
        })
      });
  }

  generateRandomNumb(min: number,max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  getBingImage(iteration: number, name: string): void {
    this.bingSearch
      .getBingSearch(name, iteration)
      .subscribe((result: SearchImages) => {
        this.bingImageResults = result;
        console.log(this.bingImageResults)
        console.log(this.list);
        for (let i: number = 0; i <= 1; i++) {
     
            // console.log("Please help",  this.bingImageResults.value[1].contentUrl.startsWith('http'))
            // console.log("what is this", this.bingImageList[i] = this.bingImageResults.value[1].contentUrl)
          if (this.list[i].common_name === this.bingImageResults.queryContext.originalQuery) {
           
            // if (!this.bingImageResults.value[1].contentUrl.startsWith("https")) 
            // {  
            //   
            // } 
            // else 
              this.bingImageList[i] = this.bingImageResults.value[1].contentUrl
              // break;;
          }
          // else{
          //   this.bingImageList[i] = '/assets/Garden.jpg';
          // }
        }
      });
  }










  // getImageDetails(): void {
  //   this.ImageApi.getImages(this.searchPlants).subscribe(
  //     (result: SearchImage) => {
  //       this.imageResults = result;
  //       this.imageList = this.imageResults.hits;
  //       console.log(this.imageResults);
  //       this.plantImage = this.imageList[2];
  //     }
  //   );
  // }

  AddToGarden(plant: Plant, imageurl: string): void {
    let newPlant: MyGarden = {
      id: 0,
      gardenName: "",
      gardenId: 0,
      plantId: plant.id,
      plantImageUrl: imageurl,
    };
    this.gardenService
      .PlantingGarden(newPlant, this.user.id)
      .subscribe((result: MyGarden) => {
        console.log(result);
      });
  }

  // getPlantDetails(): void {
  //   this.plantApi
  //     .getPlants(this.searchPlants)
  //     .subscribe((result: SearchPlant) => {
  //       this.results = result;
  //       this.plantList = this.results.data;
  //       let iteration: number = 1;
  //       this.results.data.forEach((plant: Plant) => {
  //         let name = plant.common_name;
  //         this.getBingImage(iteration, name);
  //       });
  //     });
  // }

  //  getWikiDetail(name:string):void{

  //   this.WikiApi.getWiki(name).subscribe((result: WikiSearch)=>{
  //     console.log("wiki name",name);
  //    this.wikiResult = result;
  //    this.wikiQueryList = this.wikiResult.query.search;
  //    this.wikiQueryList[0].snippet;
  //    console.log("query list", this.wikiQueryList)
  //    console.log("list 2", this.wikiQueryList[0].snippet)

  //   });
  //  }
}
