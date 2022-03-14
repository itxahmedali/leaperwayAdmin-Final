import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";
import { ObservableService } from "src/app/services/observable.service";
import { AuthService } from "../../../../services/firebase/auth.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  userData;
  user = localStorage.getItem("token");
  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpService
  ) {}

  ngOnInit() {
  }
  logout() {
    this.http.postApi('admin/logout', {}, true).subscribe((res)=>{
      window.localStorage.clear();
      window.localStorage.removeItem("token");
      ObservableService.loader.next(false);
      this.router.navigate(["/login"]);
    }),(err)=>{
      ObservableService.loader.next(false);
      console.log(err);
    }
  }
}
