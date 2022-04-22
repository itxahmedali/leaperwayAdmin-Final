import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { HttpService } from "src/app/services/http.service";
import { ObservableService } from "src/app/services/observable.service";
@Component({
  selector: "app-bookmarks",
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["./bookmarks.component.scss"],
})
export class BookmarksComponent implements OnInit {
  dashboardLogo: string = "assets/images/user/1.jpg";
  dashboardIcon: string = "assets/images/user/1.jpg";
  androidUrl:string = null;
  iosUrl:string = null;

  constructor(
    private http: HttpService,
  ) {}
  //FileUpload
  ngOnInit() {
    this.getData()
  }
  readUrl(event: any, param) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this[param] = reader.result;
        return;
      };
    }
  }

  getData(){
    this.http.getApi('admin/admin_data_index', true).subscribe((res:any)=>{
      console.log(res)
      ObservableService.loader.next(false);
      this.androidUrl = res.app_url_android;
      this.iosUrl = res.app_url_ios
    }, (err)=>{
      console.log(err)
      ObservableService.loader.next(false);
    })
  }

  postData(){
    this.http.postApi('admin/admin_data', {}, true).subscribe((res:any)=>{
      console.log(res)
      ObservableService.loader.next(false);
    }, (err)=>{
      console.log(err)
      ObservableService.loader.next(false);
    })
  }

  saveUrl(){
    let data = {
      // logo_lg:232323232323,
      // logo_sm:000000,
      app_url_android:this.androidUrl,
      app_url_ios:this.iosUrl
    }
    this.http.postApi('admin/admin_data' , data, true).subscribe((res:any)=>{
      console.log(res)
      ObservableService.loader.next(false);
    }, (err)=>{
      console.log(err)
      ObservableService.loader.next(false);
    })
  }
}
