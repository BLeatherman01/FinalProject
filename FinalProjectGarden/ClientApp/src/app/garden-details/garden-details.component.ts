import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MyGarden } from '../Services/my-garden';
import { MyGardenService } from '../Services/my-garden.service';
import { Plant, SearchPlant } from '../Services/searched-plant';
import { SearchedPlantService } from '../Services/searched-plant.service';
import { GardenDetailsService } from '../Services/garden-details.service';
import { ActivatedRoute } from '@angular/router';
import { RecentPlantsService } from '../Services/recent-plants.service';

@Component({
  selector: 'app-garden-details',
  templateUrl: './garden-details.component.html',
  styleUrls: ['./garden-details.component.css']
})
export class GardenDetailsComponent implements OnInit {
  UsersService: any;

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
    // this.getUserGarden()
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      this.sub = this.route.paramMap.subscribe((params) =>{
        this.searchID = params.get('GardenName');
        this.getDetailsService
        .GetMyGardensDetails(this.searchID).subscribe((result : MyGarden) => {
          this.searchedgarden = result; console.log(result)});
      });
  });
  }


  RemoveFromGarden(index: number): void {
    this.gardenService
      .DeleteMyGardens(this.listGardens[index].id)
      .subscribe((result: MyGarden) => {
        this.listGardens.splice(index, 1);
      });
  }
  
  getUserGarden() {
    this.gardenService
      .GetMyGardens(this.user.id)
      .subscribe((result: MyGarden[]) => {
        this.listGardens = result;
    // this.gardenService
    // .GetMyGardens(this.user.id)
    // .subscribe((result: MyGarden[]) => {
    //   this.listGardens = result;
    //   console.log(this.listGardens)
          // this.listGardens[i].gardenName?.search()
          

          //console.log("1"+ this.listGardens[0].plantId);
          // this.listGardens.forEach((pid: MyGarden) => {
          //   //console.log(pid.plantId);
          //   this.searchedPlantService
          //     .getPlantById(pid.plantId)
          //     .subscribe((result: Plant) => {
          //       console.log(this.apiPlant)
          //       this.apiPlant.push(result);
          //       this.apiPlant.forEach((plant: Plant) => {
          //       this.hideCards.push(false);
          //       });
          //       //console.log("2"+ result.common_name);
          //     });
      });
  };
}
