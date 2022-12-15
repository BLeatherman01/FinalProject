import { Component, OnInit, Query } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { SearchImage } from '../Services/searched-images';
import { SearchedImagesService } from '../Services/searched-images.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { SearchImages } from '../Services/search-bing';
import { BingSearchService } from '../Services/bing-search.service';
import { WikiService } from '../wiki.service';
import { Search, WikiSearch } from '../search-wiki';
import { RecentPlants } from '../Services/recent-plants';
import { RecentPlantsService } from '../Services/recent-plants.service';

@Component({
  selector: 'app-searched-plant',
  templateUrl: './searched-plant.component.html',
  styleUrls: ['./searched-plant.component.css'],
})
export class SearchedPlantComponent implements OnInit {

  results: SearchPlant = {} as SearchPlant;
  bingImageResults: SearchImages = {} as SearchImages;
  bingImageList: string[] = [];
  imageList: string[] = [];
  searchPlants: string = '';
  name: string = '';
  plantList: Plant[] = [];
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  //Wiki API
  wikiResult: WikiSearch = {} as WikiSearch;
  wikiQueryList: Search[] = [];
  wikiSearchResonse: string = '';
  wikiSnippet: string = '';
  // wikiElement: HTMLElement = document.getElementById(".wikiSnippet");

  constructor(
    private plantApi: SearchedPlantService,
    private ImageApi: SearchedImagesService,
    private gardenService: MyGardenService,
    private authService: SocialAuthService,
    private bingSearch: BingSearchService,
    private wikiApi: WikiService,
    private recentPlants: RecentPlantsService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  AddToGarden(commonName: Plant, imageurl: string): void {
     this.recentPlants
      .AddPlantToFavorite(commonName.common_name,imageurl, this.user.id)
      .subscribe((result: RecentPlants) => {
        console.log(result);
      });
  }

  getPlantDetails(): void {
    this.plantApi
      .getPlants(this.searchPlants)
      .subscribe((result: SearchPlant) => {
        this.results = result;
        this.plantList = this.results.data;
        console.log("DECKS" + this.plantList)
        let iteration: number = 1;
        this.results.data.forEach((plant: Plant) => {
          let name = plant.common_name;
          this.getBingImage(iteration, name);
        });
      });
  }
  getBingImage(iteration: number, name: string): void {
    this.bingSearch
      .getBingSearch(name, iteration)
      .subscribe((result: SearchImages) => {
        this.bingImageResults = result;
        for (let i: number = 0; i < this.plantList.length; i++) {
          if (
            this.plantList[i].common_name ===
            this.bingImageResults.queryContext.originalQuery
          ) {
            this.bingImageList[i] = this.bingImageResults.value[1].contentUrl;
          }
        }
      });
  }

  getWikiDetail(name: string): void {
    this.wikiApi.getWiki(name).subscribe((result: WikiSearch) => {
      console.log('wiki name', name);
      this.wikiResult = result;
      this.wikiQueryList = this.wikiResult.query.search;
      this.wikiSnippet = this.wikiQueryList[0].snippet;

      console.log('list 2', this.wikiQueryList[0].snippet);
      //  let wikiElement  = document.getElementById(".wikiSnippet")
      //  if(wikiElement != null){
      //  wikiElement.innerHTML = this.wikiSnippet;
      // }
    });
  }
}
