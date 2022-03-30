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
  // filter
  term
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
  // add form 
  addForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
    type: ["user"],
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
  }

  getUsers() {
    this.http.getApi("admin/user", true).subscribe((res)=>{
      this.company = res;
      ObservableService.loader.next(false);
    },
    (err) => {
      ObservableService.loader.next(false);
      console.log(err);
    })
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
      password: [null],
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
    if(this.url){
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
    }else{
      this.update();
    }
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

    let data = {
      status:this.userstatus
    }

    this.http
      .postApi(`admin/user_edit/${id}`, data, true)
      .subscribe((res: any) => {
        ObservableService.loader.next(false);
        this.toaster.success(res.message);
        this.getUsers()
      },
      (err)=>{
        ObservableService.loader.next(false);
        console.log(err);
      });
  }

  //FileUpload
  readUrl(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);
      
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
    if(this.editForm.value.password == null){
      this.editForm.removeControl('password');
    }
    this.http
      .postApi(`admin/user_edit/${this.userData.id}`, this.editForm.value, true)
      .subscribe((res: any) => {
        ObservableService.loader.next(false);
        this.toaster.success(res.message);
        this.url = undefined;
        this.editForm = this.fb.group({
          name: [null, [Validators.required]],
          password: [null],
          phone: [null, [Validators.required]],
          image: [null, [Validators.required]],
        });
        this.getUsers()
      },
      (err)=>{
        ObservableService.loader.next(false);
        console.log(err);
      });
  }
  userDetails(id) {
    this.router.navigate(["dashboard/users/userProfile", id]);
  }
  // add restuarants
  addUser() {
    if(this.addForm.invalid){
      Object.keys(this.addForm.controls).forEach(key => {
        this.addForm.get(key).markAsTouched();
        return
      });
    }
    if(this.addForm.controls.password.value != this.addForm.controls.confirm_password.value){
      this.toaster.error("Password and confirm password does not match");
      return
    }
    else{
      this.http
        .postApi(`app/register_by_admin`, this.addForm.value, false)
        .subscribe(
          (res: any) => {
            for (let x in res) {
              console.log(x);
              if(x == "email"){
                this.toaster.error(res.email)
              }
            }
            ObservableService.loader.next(false);
            if(res.hasOwnProperty('access_token')){
              $('.close').trigger('click')
              this.toaster.success("Restaurant Added");
            }
            this.addForm = this.fb.group({
              name: [null, [Validators.required]],
              email: [null, [Validators.required]],
              password: [null],
              confirm_password: [null],
              type: ["user"],
            });
            this.getUsers();
          }
        ),
        (err)=>{
          ObservableService.loader.next(false);
          console.log(err);
        }
    }
  }
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  
}
