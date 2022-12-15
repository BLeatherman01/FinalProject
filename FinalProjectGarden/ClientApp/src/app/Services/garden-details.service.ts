import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';
import { RecentPlants } from './recent-plants';

@Injectable({
  providedIn: 'root',
})
export class GardenDetailsService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  GetMyGardensDetails(id: number): Observable<RecentPlants> {
    return this.http.get<RecentPlants>(
      this.baseUrl + `api/MyGardens/GardenDetails/${id}`
    );
  }
}
