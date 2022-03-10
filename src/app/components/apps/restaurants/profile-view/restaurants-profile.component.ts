import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import * as moment from "moment";
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateStruct,
  NgbDate,
  NgbCalendar,
  NgbDatepickerConfig,
  NgbDateParserFormatter,
} from "@ng-bootstrap/ng-bootstrap";
import { ComingSoonModule } from "src/app/pages/coming-soon/coming-soon.module";
import { HttpService } from "src/app/services/http.service";
import { ActivatedRoute } from "@angular/router";
import { ObservableService } from "src/app/services/observable.service";
@Component({
  selector: "app-profile-view",
  templateUrl: "./restaurants-profile.component.html",
  styleUrls: ["./restaurants-profile.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  model: NgbDateStruct;
  date: { year: number; month: number };
  modelPopup;
  modelDisabled: NgbDateStruct;
  disabled = true;
  modelCustom: NgbDateStruct;
  displayMonths = 2;
  navigation = "select";
  showWeekNumbers = false;
  outsideDays = "visible";
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  modelFooter: NgbDateStruct;
  today = this.calendar.getToday();
  fromDateParse: any;
  toDateParse: any;
  // data from api
  company;
  apiData;
  formatDate;
  formattedDate;
  public recievingHistory = [
    {
      accountTitle: "Elena Gilbert",
      accountNo: "1299997912868712",
      amountRecieved: 10000,
      transactionDate: "10/12/2021",
    },
    {
      accountTitle: "Klaus Mikalson",
      accountNo: "1299997912868712",
      amountRecieved: 13200,
      transactionDate: "15/12/2021",
    },
    {
      accountTitle: "John Wu",
      accountNo: "1299997912868712",
      amountRecieved: 14010,
      transactionDate: "14/10/2021",
    },
    {
      accountTitle: "Tony Stark",
      accountNo: "1299997912868712",
      amountRecieved: 2870,
      transactionDate: "13/12/2021",
    },
    {
      accountTitle: "James Paulson",
      accountNo: "1299997912868712",
      amountRecieved: 12073,
      transactionDate: "22/12/2020",
    },
    {
      accountTitle: "Damon Salvatore",
      accountNo: "1299997912868712",
      amountRecieved: 966,
      transactionDate: "08/11/2021",
    },
  ];

  public pendingAmount = [
    {
      accountTitle: "Elena Gilbert",
      accountNo: "1299997912868712",
      amountRecieved: 10000,
    },
    {
      accountTitle: "Klaus Mikalson",
      accountNo: "1299997912868712",
      amountRecieved: 13200,
    },
    {
      accountTitle: "John Wu",
      accountNo: "1299997912868712",
      amountRecieved: 14010,
    },
    {
      accountTitle: "Tony Stark",
      accountNo: "1299997912868712",
      amountRecieved: 2870,
    },
    {
      accountTitle: "James Paulson",
      accountNo: "1299997912868712",
      amountRecieved: 12073,
    },
    {
      accountTitle: "Damon Salvatore",
      accountNo: "1299997912868712",
      amountRecieved: 966,
    },
  ];
  public pendingOrders = [];
  public cancelledOrder = [];
  public withdrawOrders = [];
  // deals cards
  cards: any = [
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 01",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9,
    },
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 02",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9,
    },
    {
      img: "assets/1x/dealImg.jpeg",
      name: "Deal 03",
      details:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      qty: 1,
      price: 3.9,
    },
  ];
  // revenue pagination
  revenuePages: any = 1;
  // recieving history pagination
  recievingHistoryPage: any = 1;
  // pendiong amount pagination
  pendingAmountPage: any = 1;
  // current Orders pagination
  currentOrdersPages: any = 1;
  // current Orders pagination
  successOrdersPages: any = 1;
  // withdraw Orders pagination
  withdrawOrdersPages: any = 1;
  // location
  lat;
  long;
  // url param
  id;
  // deals data
  cancelledDeals = [];
  activeDeals = [];
  // revenue dates
  dates;
  // revenue data
  ravenueData = [];
  revenueAmount;
  // ammount tab
  amountDue;
  amount;
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private http: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
    this.location();
  }
  async location() {
    await navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.long = position.coords.longitude;
    });
  }
  // modal
  closeResult = "";
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  // date picker
  onDateSelection(date: NgbDate, event) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    // date conversion
    let fromYear = this.fromDate?.year;
    let fromMonth =
      this.fromDate?.month <= 9
        ? "0" + this.fromDate?.month
        : this.fromDate?.month;
    let fromDay =
      this.fromDate?.day <= 9 ? "0" + this.fromDate?.day : this.fromDate?.day;
    let toYear = this.toDate?.year;
    let toMonth =
      this.toDate?.month <= 9 ? "0" + this.toDate?.month : this.toDate?.month;
    let toDay =
      this.toDate?.day <= 9 ? "0" + this.toDate?.day : this.toDate?.day;
    this.fromDateParse = fromYear + "-" + fromMonth + "-" + fromDay;
    this.toDateParse = toYear + "-" + toMonth + "-" + toDay;
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
  // print outside modal
  saveDate() {
    $(".fromDate").html(this.fromDateParse);
    if (this.toDateParse == "undefined-undefined-undefined") {
      return;
    } else {
      $(".toDate").html(this.toDateParse);
      this.dates = { from: this.toDateParse, to: this.fromDateParse };
      setTimeout(() => {
        this.ravenueData.length = 0;
        this.http
          .postApi(`admin/revenue/${this.company.id}`, this.dates, true)
          .subscribe((res: any) => {
            console.log(res);
            res.data.map((data) => {
              this.ravenueData.push(data);
            });
            console.log(this.ravenueData);

            ObservableService.loader.next(false);
          });
      }, 1000);
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getRestuarants();
    });
    setTimeout(() => {
      this.defaultRevenue();
      this.amountData();
    }, 2000);
  }
  // restaurants Api
  async getRestuarants() {
    await this.http
      .getApi(`admin/restaurents/${this.lat},${this.long}`, true)
      .subscribe(
        (res: any) => {
          this.apiData = res;
          this.apiData.map((data) => {
            if (data.id == this.id) {
              this.company = data;
            }
          });
          // emptying array
          this.withdrawOrders.length = 0;
          this.pendingOrders.length = 0;
          this.cancelledOrder.length = 0;
          // emptying array
          this.cancelledDeals.length = 0;
          this.activeDeals.length = 0;
          this.http
            .getApi(`admin/orders_by_restaurant/${this.company.id}`, true)
            .subscribe((res: any) => {
              res.map((data) => {
                if (data.status == "withdraw") {
                  this.withdrawOrders.push(data);
                }
                if (data.status == "pending") {
                  this.pendingOrders.push(data);
                }
                if (data.status == "Cancelled") {
                  this.cancelledOrder.push(data);
                }

                if (data.deal.status == 0) {
                  this.cancelledDeals.push(data.deal);
                }
                if (data.deal.status == 1) {
                  this.activeDeals.push(data.deal);
                }
              });
            });
          ObservableService.loader.next(false);
        },
        (err) => {
          console.log(err);
          ObservableService.loader.next(false);
        }
      );
  }
  defaultRevenue() {
    var today = new Date(); // today!
    var prviousDays = new Date();
    prviousDays.setDate(prviousDays.getDate() - 30);
    var formattedToday = moment(today).format("MMMM Do YYYY");
    var formattedpreviousDays = moment(prviousDays).format("MMMM Do YYYY");
    var dates={
      to:formattedpreviousDays,
      from:formattedToday
    }
    this.http
      .postApi(`admin/revenue/${this.company.id}`, dates, true)
      .subscribe((res: any) => {
        this.revenueAmount = res.amount;
        res.data.map((data) => {
          this.ravenueData.push(data);
        });

        ObservableService.loader.next(false);
      });
      this.http.getApi(`admin/dues/${this.company.id}`, true).subscribe((res)=>{
        this.amountDue = res;
      })
  }
  amountData(){
    this.http.getApi(`admin/admintransactions/${this.company.id}`, true).subscribe((res: any)=>{
      this.amount = res;
      console.log(this.amount);
      
    });
  }
}
