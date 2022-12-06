import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchImage } from './searched-images';
import { Secret } from './secret';

@Injectable({
  providedIn: 'root'
})
export class SearchedImagesService {
baseUrl: string = 'https://pixabay.com/api/';

constructor(private http: HttpClient) {}

  getImages(name: string): Observable<SearchImage> {
    return this.http.get<SearchImage>(
      this.baseUrl + '?key=' + Secret.key2 + '&q=' + name
    );
  }
}
