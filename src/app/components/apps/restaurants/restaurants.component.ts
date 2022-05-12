import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import * as $ from "jquery";
import { ToastrService } from "ngx-toastr";
import { HttpService } from "src/app/services/http.service";
import { ObservableService } from "src/app/services/observable.service";
@Component({
  selector: "app-file-manager",
  templateUrl: "./restaurants.component.html",
  styleUrls: ["./restaurants.component.scss"],
})
export class FileManagerComponent implements OnInit {
  // filter
  term
  public url: any;
  public company;
  lat: number = 29.8159954;
  lng: number = -95.9617495;
  id;
  // pagination
  page: number = 1;
  totalPage = [];
  total;
  restaurantData;
  restauratnImage;
  restaurantstatus;
  // edit form
  editForm = this.fb.group({
    name: [null],
    phone: [null],
    address: [null],
    city: [null],
    state: [null],
    country: [null],
    password: [null],
    image: [null],
  });
  // add form
  addForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
    address: [null, [Validators.required]],
    city: [null, [Validators.required]],
    state: [null, [Validators.required]],
    country: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    image: [null],
    latlng: [null, [Validators.required]],
    type: ["restaurant"],
  });
  // temp = [];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    // edit form
    this.editForm = this.fb.group({
      name: [this.restaurantData?.user?.name, [Validators.required]],
      password: [null],
      address: [this.restaurantData?.address],
      city: [this.restaurantData?.city],
      state: [this.restaurantData?.state],
      country: [this.restaurantData?.country],
      phone: [this.restaurantData?.user?.phone, [Validators.required]],
      image: [this.restaurantData?.user?.image, [Validators.required]],
    });
    // add form
    this.addForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      country: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      image: [null],
      latlng: [null, [Validators.required]],
      type: ["restaurant"],
    });
  }
  ngOnInit() {
    this.location()
    setTimeout(() => {
      this.getRestuarants();
    }, 1000);
  }

  async location() {
    await navigator.geolocation.getCurrentPosition((position) => {
      // this.lat = position.coords.latitude;
      // this.lng = position.coords.longitude;
    });
  }

  // restaurants Api
  async getRestuarants() {
    // this.location();
    this.http.getApi(`admin/restaurents/${localStorage.getItem("lat")},${localStorage.getItem("lang")}`,
      true
    )
      .subscribe(
        (res) => {
          this.company = res;
          ObservableService.loader.next(false);
        }
      ),
      (err) => {
        ObservableService.loader.next(false);
        console.log(err);
      };
  }

  // modal
  closeResult = "";
  open(content, restaurant) {
    console.log(restaurant);
    this.restaurantData = restaurant;
    // edit form
    this.editForm = this.fb.group({
      name: [this.restaurantData?.user?.name, [Validators.required]],
      password: [null],
      address: [this.restaurantData?.address],
      city: [this.restaurantData?.city],
      state: [this.restaurantData?.state],
      country: [this.restaurantData?.country],
      phone: [this.restaurantData?.user?.phone, [Validators.required]],
      image: [this.restaurantData?.user?.image, [Validators.required]],
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
  addModal(content) {
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
  status(event, id) {
    if (event.target.checked == true) {
      this.restaurantstatus = 1;
    } else {
      this.restaurantstatus = 0;
    }

    let data = {
      status: this.restaurantstatus,
    };

    this.http.postApi(`admin/restaurent_edit/${id}`, data, true).subscribe(
      (res: any) => {
        ObservableService.loader.next(false);
        this.toaster.success(res.message);
        this.getRestuarants();
      }
    ),
      (err) => {
        ObservableService.loader.next(false);
        console.log(err);
      }
  }
  changeHeading(event) {
    if ($(event.target.id == "addBtn")) {
      $("#modal-basic-title").text("Add Restaurant Info");
    } else {
      return;
    }
  }
  //FileUpload
  readUrl(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.restauratnImage = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.url = reader.result;
      };
    } else {
      return false;
    }
  }
  async dealUpdate() {
    if (this.url) {
      await this.http
        .uploadImages(this.restauratnImage, "admin/image_upload")
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
        (e) => { };
    } else {
      this.update();
    }
  }
  // add deal
  async dealAdd() {
    if (this.url) {
      await this.http
        .uploadImages(this.restauratnImage, "admin/image_upload")
        .then((res: any) => {
          if (res.image) {
            return false;
          }
          this.addForm.patchValue({
            image: res.data.image_url,
          });
          setTimeout(() => {
            this.add();
          }, 1000);
        }),
        (e) => { };
    } else {
      this.add();
    }
  }
  viewpage(restaurant) {
    this.router.navigate([
      "dashboard/all-restaurants/restaurant-profile",
      restaurant.id,
    ]);
  }
  update() {
    if (this.editForm.value.password == null) {
      this.editForm.removeControl("password");
    }
    this.http
      .postApi(
        `admin/restaurent_edit/${this.restaurantData.id}`,
        this.editForm.value,
        true
      )
      .subscribe(
        (res: any) => {
          ObservableService.loader.next(false);
          this.toaster.success(res.message);
          this.url = undefined;
          this.editForm = this.fb.group({
            name: [this.restaurantData?.user?.name, [Validators.required]],
            password: [null],
            address: [this.restaurantData?.address],
            city: [this.restaurantData?.city],
            state: [this.restaurantData?.state],
            country: [this.restaurantData?.country],
            phone: [this.restaurantData?.user?.phone, [Validators.required]],
            image: [this.restaurantData?.user?.image, [Validators.required]],
          });
          this.getRestuarants();
        }
      ),
      (err) => {
        ObservableService.loader.next(false);
        console.log(err);
      };
  }
  // add restuarants
  add() {
    if (this.addForm.invalid) {
      Object.keys(this.addForm.controls).forEach(key => {
        this.addForm.get(key).markAsTouched();
        return
      });
    }
    else {
      this.http.postApi('app/check-email', { email: this.addForm.value.email }, true).subscribe((res: any) => {
        this.http.postApi(`app/restaurent_register`, this.addForm.value, false).subscribe((res: any) => {
          ObservableService.loader.next(false);
          this.toaster.success(res.message);
          if (res.hasOwnProperty('access_token')) {
            $('.close').trigger('click')
            this.toaster.success("Restaurant Added");
          }
          this.url = undefined;
          this.addForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            address: [null, [Validators.required]],
            city: [null, [Validators.required]],
            state: [null, [Validators.required]],
            country: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            image: [null],
            latlng: [null, [Validators.required]],
            type: ["restaurant"],
          });
          this.getRestuarants();
        }
        ),
          (err) => {
            ObservableService.loader.next(false);
            console.log(err);
          };
      }, (err: any) => {
        
        this.toaster.error(err.error.message);
        ObservableService.loader.next(false);
        setTimeout(() => {
          window.location.reload()
        }, 1000);
      })
      
    }
  }
  markerDragEnd($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.addForm.patchValue({
      latlng: this.lat + "," + this.lng
    })
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
