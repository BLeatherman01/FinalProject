import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateFormatServiceService {

  constructor(@Inject (LOCALE_ID) public locale: string) { }

  formattedDate(myDate:string): string{
  return formatDate(myDate, "MM/dd/YY", this.locale);
  }
}
