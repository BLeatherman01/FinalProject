import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchPlant } from './searched-plant';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root',
})
export class SearchedPlantService {
  baseUrl: string = 'https://api.floracodex.com/v1/plants';

  constructor(private http: HttpClient) {}

  getPlants(name: string): Observable<SearchPlant> {
    return this.http.get<SearchPlant>(
      this.baseUrl + '?key=' + Secret.key + '&q=' + name
    );
  }
}
