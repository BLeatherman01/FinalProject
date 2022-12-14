import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';
import { RecentPlants } from './recent-plants';

@Injectable({
  providedIn: 'root'
})
export class RecentPlantsService {
  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { 
    
  }
  
  AddPlantToFavorite(commonName:string, plantimgurl:string, googleid: string): Observable<RecentPlants> {
    return this.http.post<RecentPlants>(
      this.baseUrl + `api/RecentPlants?googleId=${googleid}&commonName=${commonName}&img=${plantimgurl}`,
      {}
    );
  }

  getMyFavPlants(googleid: string): Observable<RecentPlants[]> {
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants?googleId=${googleid}`);
  }

  getAllPlantedPlants(googleid: string): Observable<RecentPlants[]>{
    return this.http.get<RecentPlants[]>(this.baseUrl + `api/RecentPlants/PlantsInGarden?googleId=${googleid}` )
  }

}
