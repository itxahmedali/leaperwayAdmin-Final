import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
import { ToastrService } from "ngx-toastr";
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
  Duration:any = null;
  Timetype:string = 'minut';
  processingFeeMethod:string = '%';
  processingFee:number = null;

  constructor(
    private http: HttpService,
    private toaster: ToastrService,
  ) {}
  //FileUpload
  ngOnInit() {
    this.getData();
    this.getDuration();
    this.getProcessingFee();
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

  getDuration(){
    this.http.getApi('admin/crontime_get', true).subscribe((res:any)=>{
      this.Duration = res.time_duration;
      // this.Timetype = res.type;
      ObservableService.loader.next(false);
    }, (err)=>{
      console.log(err)
      ObservableService.loader.next(false);
    })
  }

  saveDuration(){
    if(this.Duration == null || this.Duration == ''){
      this.toaster.error("Duration cannot be null!");
      return
    }
    let min = 0
    if(this.Timetype == 'day'){
      min = (this.Duration*1440)
    }else if(this.Timetype == 'hour'){
      min = (this.Duration*60)
    }else{
      min = this.Duration;
    }
    let data = {
      time_duration:Number(min),
      type:this.Timetype
    }
    this.http.postApi('admin/crontime', data, true).subscribe((res:any)=>{
      console.log(res)
      ObservableService.loader.next(false);
      this.getDuration()
    }, (err)=>{
      console.log(err)
      ObservableService.loader.next(false);
    })
  }

  getProcessingFee(){
    this.http.getApi('admin/processing_fee_get',true).subscribe((res:any)=>{
      console.log(res)
      this.processingFee = res.fee;
      this.processingFeeMethod = res.type;
      ObservableService.loader.next(false);
    },(err)=>{
      console.log(err);
      ObservableService.loader.next(false);
    })
  }

  saveMerchantFee(){
    if(this.processingFee == null){
      this.toaster.error("Processing fee cannot be null!");
      return
    }
    let data = {
      fee:this.processingFee,
      type:this.processingFeeMethod
    }

    this.http.postApi('admin/processing_fee', data, true).subscribe((res:any)=>{
      this.getProcessingFee();
      ObservableService.loader.next(false);
    },(err)=>{
      console.log(err);
      ObservableService.loader.next(false);
    })
  }

}
