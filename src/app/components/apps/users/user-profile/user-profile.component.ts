import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { HttpService } from 'src/app/services/http.service';
import { ObservableService } from 'src/app/services/observable.service';
// ng pagination
// import {NgxPaginationModule} from 'ngx-pagination';
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  // deposit history pagination
  p: number = 1;
  // current transaction pagination
  currentTransactionPages = 1;
  id;
  userData;
  formattedDate;
  cards;
  depositHistory = []
  constructor(private route: ActivatedRoute, private http:HttpService){

  }
  ngOnInit(){
    this.getData()
    setTimeout(() => {
      this.depositHistoryFunc()
        }, 1000);
  }
  getData(){
    // getting id
    this.id=this.route.snapshot.paramMap.get("id");
    // getting deails of user
    this.http.getApi(`admin/user/${this.id}`, true).subscribe((res:any)=>{
      this.formattedDate = moment(res.created_at).format('MMMM Do YYYY');
      this.userData = res;      
      ObservableService.loader.next(false)
    },
    (err)=>{
      console.log(err)
    })
    // getting wallet details
    this.http.getApi(`admin/cards/${this.id}`, true).subscribe((res:any)=>{
      this.cards = res;
      ObservableService.loader.next(false)
    })
  }
  // deposit history
  depositHistoryFunc(){
    this.http.getApi(`admin/deposit_history_admin/${this.id}`, true).subscribe((res:any)=>{
      console.log(res)
      this.depositHistory = res;
    },
    (err)=>{
      console.log(err)
    })
  }
}
