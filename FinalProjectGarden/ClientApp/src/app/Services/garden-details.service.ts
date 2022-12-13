import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MyGarden } from './my-garden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GardenDetailsService {

  constructor(private http: HttpClient, @Inject (LOCALE_ID) public locale: string, @Inject('BASE_URL') private baseUrl: string) { }

  formattedDate(myDate:string): string{
  return formatDate(myDate, "MM/dd/YY", this.locale);
  }
  GetMyGardens(googleid: string): Observable<MyGarden[]> {
    return this.http.get<MyGarden[]>(this.baseUrl + `api/MyGardens/${googleid}`);
  }

  UpdateMyGardens(id: number, plant: MyGarden): Observable<MyGarden> {
    return this.http.put<MyGarden>(this.baseUrl + `api/MyGardens/${id}`, plant);
  }

  DeleteMyGardens(id: number): Observable<MyGarden> {
    return this.http.delete<MyGarden>(this.baseUrl + `api/MyGardens/${id}`);
  }

  getPlantByGarden(id: number): Observable<MyGarden> {
    return this.http.get<MyGarden>(this.baseUrl + `api/MyGardens/${id}`);
  }

}
