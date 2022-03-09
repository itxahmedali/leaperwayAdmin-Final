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
  public cards12 = [
    {
      name: "Elena Gilbert",
      type: "assets/1x/mastercard.png",
      number: "************2174",
      DateExpedition: "01/20",
      DateExpiry: "01/26",
      cc: "098",
    },
    {
      name: "Damon Salvatore",
      type: "assets/1x/visa.png",
      number: "************3029",
      DateExpedition: "01/20",
      DateExpiry: "01/23",
      cc: "008",
    },
    {
      name: "Tony Stark",
      type: "assets/1x/paypal.png",
      number: "************2981",
      DateExpedition: "01/20",
      DateExpiry: "01/28",
      cc: "100",
    },
    {
      name: "Robert Stark",
      type: "assets/1x/unionpay.png",
      number: "************2174",
      DateExpedition: "01/20",
      DateExpiry: "01/30",
      cc: "199",
    },
  ];
  public depositHistory = [
    {
      cardHolder: "Elena Gilbert",
      cardNo: "**************8412",
      deposit: 10000,
      transactionDate: "10/12/2021",
      
    },
    {
      cardHolder: "Klaus Mikalson",
      cardNo: "**************1422",
      deposit: 13200,
      transactionDate: "15/12/2021",
    },
    {
      cardHolder: "John Wu",
      cardNo: "**************8662",
      deposit: 14010,
      transactionDate: "14/10/2021",
    },
    {
      cardHolder: "Tony Stark",
      cardNo: "**************0971",
      deposit: 2870,
      transactionDate: "13/12/2021",
    },
    {
      cardHolder: "James Paulson",
      cardNo: "**************1621",
      deposit: 12073,
      transactionDate: "22/12/2020",
    },
    {
      cardHolder: "Damon Salvatore",
      cardNo: "**************0163",
      deposit: 966,
      transactionDate: "08/11/2021",
    },
  ];
  public currenttransaction = [
    {
      cardHolder: "Elena Gilbert",
      cardNo: "**************8412",
      deposit: 10000,
      dueDate: "10/12/2021",
      paymentDate:"30/12/2022"
    },
    {
      cardHolder: "Klaus Mikalson",
      cardNo: "**************1422",
      deposit: 13200,
      dueDate: "15/12/2021",
      paymentDate:"30/12/2022"
    },
    {
      cardHolder: "John Wu",
      cardNo: "**************8662",
      deposit: 14010,
      dueDate: "14/10/2021",
      paymentDate:"30/12/2022"
    },
    {
      cardHolder: "Tony Stark",
      cardNo: "**************0971",
      deposit: 2870,
      dueDate: "13/12/2021",
      paymentDate:"30/12/2022"
    },
    {
      cardHolder: "James Paulson",
      cardNo: "**************1621",
      deposit: 12073,
      dueDate: "22/12/2020",
      paymentDate:"30/12/2022"
    },
    {
      cardHolder: "Damon Salvatore",
      cardNo: "**************0163",
      deposit: 966,
      dueDate: "08/11/2021",
      paymentDate:"30/12/2022"
    },
  ];
  // deposit history pagination
  p: number = 1;
  // current transaction pagination
  currentTransactionPages = 1;
  id;
  userData;
  formattedDate;
  cards;
  constructor(private route: ActivatedRoute, private http:HttpService){

  }
  ngOnInit(){
    this.getData()
  }
  getData(){
    // getting id
    this.id=this.route.snapshot.paramMap.get("id");
    // getting deails of user
    this.http.getApi(`admin/user/${this.id}`, true).subscribe((res:any)=>{
      this.formattedDate = moment(res.created_at).format('MMMM Do YYYY');
      this.userData = res;
      console.log(res);
      
      ObservableService.loader.next(false)
    })
    // getting wallet details
    this.http.getApi(`admin/cards/${this.id}`, true).subscribe((res:any)=>{
      console.log(res);
      this.cards = res;
      ObservableService.loader.next(false)
    })
  }
}
