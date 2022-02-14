import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from "moment";
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ComingSoonModule } from 'src/app/pages/coming-soon/coming-soon.module';
@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
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
  company = history.state.data.row;
  formatDate;
  formattedDate
  // public company = [
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  //   {
  //     name: "StarBucks",
  //     leaper: "Ethel Price",
  //     email: "ethelprice@gmail.com",
  //     date: "22/12/2022",
  //   },
  // ];
  public revenue = [
    {
      title: "Jacob Gomez",
      deal: "Deal 01",
      dealAmount: 10,
      coupanDate: "10/12/2021",
      coupanNo: 1245,
    },
    {
      title: "Jacob Gomez",
      deal: "Deal 02",
      dealAmount: 102,
      coupanDate: "10/12/2021",
      coupanNo: 1223,
    },
    {
      title: "Jacob Gomez",
      deal: "Deal 03",
      dealAmount: 12,
      coupanDate: "10/12/2021",
      coupanNo: 1453,
    },
    {
      title: "Jacob Gomez",
      deal: "Deal 04",
      dealAmount: 106,
      coupanDate: "10/12/2021",
      coupanNo: 12452,
    },
    {
      title: "Jacob Gomez",
      deal: "Deal 05",
      dealAmount: 345,
      coupanDate: "10/12/2021",
      coupanNo: 12412,
    },
    {
      title: "Jacob Gomez",
      deal: "Deal 06",
      dealAmount: 101,
      coupanDate: "10/12/2021",
      coupanNo: 12451,
    },
  ];
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
  public currentOrders = [
    {
      name: "Jacob Gomez",
      deal: "Deal 01",
      dealAmount: 10,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 02",
      dealAmount: 25,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 03",
      dealAmount: 8,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 04",
      dealAmount: 5,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 05",
      dealAmount: 15,
      coupanDate: "12/02/2022",
    },
  ];
  public successOrders = [
    {
      name: "Jacob Gomez",
      deal: "Deal 01",
      dealAmount: 10,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 02",
      dealAmount: 25,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 03",
      dealAmount: 8,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 04",
      dealAmount: 5,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 05",
      dealAmount: 15,
      coupanDate: "12/02/2022",
    },
  ];
  public withdrawOrders = [
    {
      name: "Jacob Gomez",
      deal: "Deal 01",
      dealAmount: 10,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 02",
      dealAmount: 25,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 03",
      dealAmount: 8,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 04",
      dealAmount: 5,
      coupanDate: "12/02/2022",
    },
    {
      name: "Jacob Gomez",
      deal: "Deal 05",
      dealAmount: 15,
      coupanDate: "12/02/2022",
    },
  ];
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
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
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
    }
  }
  ngOnInit(): void {
    this.formatdateandTime()
    console.log(this.company.deals.deal_name)
  }
  formatdateandTime(){
      this.formatDate = this.company.user.created_at;
      this.formattedDate = moment(this.formatDate).format('MMMM Do YYYY');
  }
}
