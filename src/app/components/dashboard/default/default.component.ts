import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ObservableService } from 'src/app/services/observable.service';
import * as chartData from '../../../shared/data/dashboard/default'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
dashboardData;
  constructor(private http: HttpService) { 
  }

  ngOnInit() {
    this.http.getApi('admin/dashboard',true).subscribe((res)=>{
      console.log(res);
      this.dashboardData = res;
      ObservableService.loader.next(false);
    }),(err)=>{
      console.log(err);
      ObservableService.loader.next(false);
    }
  }
}
