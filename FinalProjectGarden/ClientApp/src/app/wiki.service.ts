import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WikiSearch } from './search-wiki';
import { Secret } from './Services/secret';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
baseUrl: string = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=';

  constructor(private http: HttpClient) {}

  getWiki(name: string): Observable<WikiSearch>{
    return this.http.get<WikiSearch>(
      this.baseUrl + name + '&format=json'
    )
  }

  }
