import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor() { }
  public static authToken:any = null;
}
