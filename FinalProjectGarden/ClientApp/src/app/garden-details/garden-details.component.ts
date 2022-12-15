import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { GardenDetailsService } from '../Services/garden-details.service';
import { ActivatedRoute } from '@angular/router';
import { RecentPlantsService } from '../Services/recent-plants.service';
import { RecentPlants } from '../Services/recent-plants';

@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit {

  constructor(
    private authService: SocialAuthService,
    private gardenService: MyGardenService,
    private searchedPlantService: SearchedPlantService,
    private getDetailsService: GardenDetailsService,
    private route: ActivatedRoute,
    private recentPlants: RecentPlantsService
  ) {}

  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  showCard: boolean = false;
  listPlants: RecentPlants [] = [];
  listGardens: MyGarden[] = [];
  apiPlant: Plant[] = [];
  plantDate: Date[] = [];
  pickDate: Date[] = [];
  waterFreq: number[] = [];
  season: string[] = [];
  gardenName: string[] = [];
  description: string[] = [];
  notes: string[] = [];
  hideCards: boolean[] = [];


  // this.sub = this.route.paramMap.subscribe((params) => {
  //   this.searchID = params.get('id');
  //   this.helpdeskAPI.getSpecificTicket(this.searchID).subscribe((result : Ticket) => {this.tickets.push(result)});
  //   });
  // GetMyGardensDetails

  searchID: any;
  sub: any;
  searchedgarden : MyGarden = {} as MyGarden;

  ngOnInit(): void {
    
  this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null; 
    this.getGardenPlants()
  });
    this.sub = this.route.paramMap.subscribe((params) =>{
      this.searchID = params.get('GardenName');
      this.getDetailsService.GetMyGardensDetails(this.searchID).subscribe((result : MyGarden) => {this.searchedgarden = result; console.log(result)});
    });

  }


  RemoveFromGarden(index: number): void {
    this.gardenService
      .DeleteMyGardens(this.listGardens[index].id)
      .subscribe((result: MyGarden) => {
        this.listGardens.splice(index, 1);
      });
  }
  getGardenPlants():void{
    this.recentPlants.getPlantedDetails(this.user.id, this.listPlants[0].gardenId).subscribe((result: RecentPlants[]) => {
      this.listPlants = result;
      console.log(this.listGardens)
      });
  }

  // getUserGarden() {
  //     this.gardenService
  //       .GetMyGardens(this.user.id)
  //       .subscribe((result: MyGarden[]) => {
  //         this.listGardens = result;
  //         console.log(this.listGardens)
  //         });
       
  // }

}
