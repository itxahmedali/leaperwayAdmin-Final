import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";
import * as moment from "moment";
import { HttpService } from "src/app/services/http.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs";
import { ObservableService } from "src/app/services/observable.service";
@Component({
  selector: "app-team-details",
  templateUrl: "./team-details.component.html",
  styleUrls: ["./team-details.component.scss"],
})
export class TeamDetailsComponent implements OnInit {
  // pagination
  page: number = 1;
  totalPage = [];
  total;
  public url: any;
  public company;
  formatDate;
  formattedDate;
  dealImage;
  // status
  userstatus;
  //google map
  public lat_m2: number = 52.5159;
  public lng_m2: number = 13.3777;
  public zoom_m2: number = 14;
  userData;
  // edit form
  editForm = this.fb.group({
    name: [[null]],
    password: [[null]],
    phone: [[null]],
    image: [[null]],
  });

  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUsers();
    console.log(this.userData);
  }

  getUsers() {
    this.http.get("admin/user", true).then((res: any) => {
      this.company = res;
      for (let index = 0; index < this.company.length; index++) {
        this.formatDate = this.company[index].created_at;
        this.formattedDate = moment(this.formatDate).format("MMMM Do YYYY");
        console.log(this.formattedDate, "res");
        // this.formattedDate.push(formattedDate)
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
    // const temp = this.temp.filter(function(d) {
    //   return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    // });
    // // update the rows
    // this.rows = temp;
    // // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }
  // modal
  closeResult = "";
  openAdd(content) {
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
  openEdit(content, row) {
    console.log(row);
    this.userData = row;
    // edit form
    this.editForm = this.fb.group({
      name: [this.userData?.name, [Validators.required]],
      password: [null, [Validators.required]],
      phone: [this.userData?.phone, [Validators.required]],
      image: [this.userData?.image, [Validators.required]],
    });
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
  async dealAdd() {
    console.log(this.url);

    // if(this.editForm.invalid || this.url == undefined){
    //   this.toaster.error("Invalid")
    //   // return;
    // }
    // else{
    if (this.url == undefined) {
      let reader = new FileReader();
      this.dealImage = this.userData?.image;
      reader.readAsDataURL(this.dealImage);
      reader.onload = () => {
        this.dealImage = reader.result;
      };
    }
    // imageUpload
    await this.http
      .uploadImages(this.dealImage, "admin/image_upload")
      .then((res: any) => {
        console.log(res);
        if (res.image) {
          return false;
        }
        this.editForm.patchValue({
          image: res.data.image_url,
        });
        setTimeout(() => {
          this.update();
        }, 1000);
      }),
      (e) => {};
    // }
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
  status(id, event) {
    console.log(event.target.checked);
    if (event.target.checked == true) {
      this.userstatus = 1;
    } else {
      this.userstatus = 0;
    }

    this.http
      .postApi(`admin/user_edit/${id}`, this.userstatus, true)
      .subscribe((res: any) => {
        ObservableService.loader.next(false);
        this.toaster.success(res.message);
      });
  }

  //FileUpload
  readUrl(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.dealImage = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    } else {
      return false;
    }
  }
  update() {
    console.log(this.editForm.value);
    this.http
      .postApi(`admin/user_edit/${this.userData.id}`, this.editForm.value, true)
      .subscribe((res: any) => {
        ObservableService.loader.next(false);
        this.toaster.success(res.message);
      });
  }
  userDetails(id) {
    this.router.navigate(["users/userProfile", id]);
  }
  // routerLink="userProfile"/
}
