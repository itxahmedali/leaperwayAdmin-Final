import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from '../../../../services/firebase/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  userData;
  constructor(public authService: AuthService,
    private http:HttpService) { }

  ngOnInit() {
    this.getAdmin()
  }
  async getAdmin(){
    this.http.get('admin/my_data',true).then((res:any)=>{
      this.userData = res;
      console.log(this.userData.name)
    }),
    (err)=>{
      console.log(err)
    }
  }
}
