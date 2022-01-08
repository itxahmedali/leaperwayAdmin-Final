import { Component, OnInit, ViewChild } from "@angular/core";
import * as $ from "jquery";
@Component({
  selector: "app-bookmarks",
  templateUrl: "./bookmarks.component.html",
  styleUrls: ["./bookmarks.component.scss"],
})
export class BookmarksComponent implements OnInit {
  // public url: any = [
  //   {
  //     dashboardLogo:null,
  //     dashboardIcon:null,
  //     appLogo:""
  //   },
  // ];

  // url = {dashboardLogo:null,dashboardIcon:null,}
  dashboardLogo: string = "assets/images/user/1.jpg";
  dashboardIcon: string = "assets/images/user/1.jpg";

  constructor() {}
  //FileUpload
  readUrl(event: any, param) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this[param] = reader.result;
        return;
      };
    }
  }
  ngOnInit() {}
}
