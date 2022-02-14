import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/firebase/auth.service';
import {Router} from '@angular/router';
import {HttpService} from "../../services/http.service"
import {ObservableService} from '../../services/observable.service'
import { GlobalDataService } from 'src/app/services/global-data.service';

declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor
  (public authService: AuthService,
     private fb: FormBuilder,
      private route:Router,
      private http:HttpService,
      ) {
      this.loginForm = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required],
        type:["admin", Validators.required]
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  login() {
    if(this.loginForm.invalid){
      return false;
    }
    this.http.post("app/login", this.loginForm.value, false).then((res:any)=>{
      console.log(res)
      if(res.error){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.error,
        });
      }
      else{
        localStorage.setItem("token", res.access_token);
        GlobalDataService.authToken = res.access_token;
        this.route.navigate(['/dashboard']);
      }
    } ),
    (err)=>{
      console.log(err)

    }
  
  //   if(this.loginForm.value['email'] == "test@gmail.com" && this.loginForm.value['password']=="test123"){
  //     this.route.navigate(['/dashboard']);
  //   }
  }

}
