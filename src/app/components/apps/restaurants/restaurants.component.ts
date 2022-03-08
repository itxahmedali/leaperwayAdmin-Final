import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as $ from "jquery";
import * as moment from "moment";
import { HttpService } from "src/app/services/http.service";
@Component({
  selector: "app-file-manager",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class FileManagerComponent implements OnInit {
  public url: any;
  public company; 
  lat;
  long;
  formatDate;
  formattedDate;
  id
  // temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(private modalService: NgbModal, private http: HttpService, private router:Router, private activatedRoute:ActivatedRoute) {
    
  }
  ngOnInit() {
    // this.location();
    setTimeout(() => {
      this.getRestuarants();
    },1000)
  }
 
  // restaurants Api
  async getRestuarants() {
    this.http.get(`admin/restaurents/${localStorage.getItem('lat')},${localStorage.getItem('lang')}`, true).then((res) => {
      this.company = res;
      for (let index = 0; index < this.company.length; index++) {
        this.formatDate = this.company[index].user.created_at;
        this.formattedDate = moment(this.formatDate).format('MMMM Do YYYY');
        // if(this.company[index].user.status == 0){
        //   this.company.splice(index,1)
        // }
      }
    }),
      (err) => {
        console.log(err);
      };
  }
  // filter functionality
  updateFilter(event) {
    // const val = event.target.value.toLowerCase();
    // // filter our data
    // const temp = this.company.filter(function(d) {
    //   return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });
    // // update the rows
    // this.company = temp;
    // // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
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
  // restaurant status
  status(event) {}
  changeHeading(event) {
    if ($(event.target.id == "addBtn")) {
      $("#modal-basic-title").text("Add Restaurant Info");
    } else {
      return;
    }
  }
  //FileUpload
  readUrl(event: any) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.url = reader.result;
      };
    }
  }
  // async location() {
  //  await navigator.geolocation.getCurrentPosition((position) => { 
  //     console.log("Got position", position.coords);
  //     this.lat = position.coords.latitude; 
  //     this.long = position.coords.longitude;
  //   });
  // }
  viewpage(row){

    this.router.navigate(["/all-restaurants/restaurant-profile",row.id])
  }
}
