import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyGardenService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  PlantingGarden(garden: MyGarden, googleid: string): Observable<MyGarden> {
    return this.http.post<MyGarden>(
      this.baseUrl + `api/MyGardens?googleId=${googleid}`,
      garden
    );
  }

  GetMyGardens(googleid: string): Observable<MyGarden[]> {
    return this.http.get<MyGarden[]>(
      this.baseUrl + `api/MyGardens/${googleid}`
    );
  }

  UpdateMyGardens(id: number, plant: MyGarden): Observable<MyGarden> {
    return this.http.put<MyGarden>(this.baseUrl + `api/MyGardens/${id}`, plant);
  }

  DeleteMyGardens(id: number): Observable<MyGarden> {
    return this.http.delete<MyGarden>(this.baseUrl + `api/MyGardens/${id}`);
  }

  getSpecificPlant(id: number): Observable<MyGarden> {
    return this.http.delete<MyGarden>(this.baseUrl + `api/MyGardens/${id}`);
  }
}
