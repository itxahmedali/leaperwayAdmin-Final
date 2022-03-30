import { Injectable } from "@angular/core";
import { GeneralService } from "./general.service";
import { ObservableService } from "./observable.service";
import { GlobalDataService } from "./global-data.service";
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    public generalServie: GeneralService,
    ) {}
    
    postApi(link, data, token){
      ObservableService.loader.next(true)
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      let headerT = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
  
      return this.http.post(
        this.generalServie.globalUrl + link,
        JSON.stringify(data),
        {
          headers: !token ? header : headerT,
        }
      );
    }
    getApi(link,token){
      ObservableService.loader.next(true)
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      let headerT = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
      return this.http.get(
        this.generalServie.globalUrl + link,
        {
          headers: !token ? header : headerT,
        }
      );
    }
    post(link, data, token){
      ObservableService.loader.next(true)
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      let headerT = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
  
      return new Promise((res, rej)=>{
        this.http.post(this.generalServie.globalUrl + link, JSON.stringify(data), { headers: !token ? header : headerT } )
        .subscribe((data:any)=>{
          ObservableService.loader.next(false)
          console.log(data)
          res(data);
        }),(err)=>{
          
          ObservableService.loader.next(false)
          rej(err)
        }
      })
    }
  
    get(link,token){
      ObservableService.loader.next(true)
      let header = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
      let headerT = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json'
      }
      return new Promise((res, rej)=>{
        this.http.get(this.generalServie.globalUrl + link, { headers: !token ? header : headerT } )
        .subscribe((data:any)=>{
          ObservableService.loader.next(false)
          res(data);
        }),(err)=>{
          ObservableService.loader.next(false)
          rej(err)
        }
      })
    }
  
    uploadImages(fileToUpload: File, url) {

      ObservableService.loader.next(true)
      var formData = new FormData();
      console.log(formData);
      
      formData.append("image", fileToUpload);
  
      let headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      };
      return new Promise((res, rej)=>{
        this.http.post(this.generalServie.globalUrl + url, formData, { headers: headers })
        .subscribe((r:any)=>{
          ObservableService.loader.next(false)
          res(r);
        }),(err)=>{
          ObservableService.loader.next(false)
          rej(err)
        }
      })
    }
  }
