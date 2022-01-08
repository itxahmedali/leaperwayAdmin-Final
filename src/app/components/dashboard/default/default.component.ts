import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/dashboard/default'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {

  public greeting: string;
  public time: any;
  public today = new Date();
  public currentHour = this.today.getHours();
  public m = this.today.getMinutes();
  public ampm = this.currentHour >= 12 ? 'PM' : 'AM';
  public date: { year: number, month: number };

  // Charts
  public currentSales = chartData.currentSales;
  public smallBarCharts = chartData.smallBarCharts;
  public marketValue = chartData.marketValue;
  public knob = chartData.knob;
  public knobRight = chartData.knobRight;

  constructor() { 
  }

  ngOnInit() {
    if (this.currentHour >= 0 && this.currentHour < 4) {
      this.greeting = 'Good Night'
    } else if (this.currentHour >= 4 && this.currentHour < 12) {
      this.greeting = 'Good Morning'
    } else if (this.currentHour >= 12 && this.currentHour < 16) {
      this.greeting = 'Good Afternoon'
    } else {
      this.greeting = 'Good Evening'
    }
    this.startTime();
    document.getElementById('knob').append(this.knob);
    document.getElementById('knob-right').append(this.knobRight);
  }

  startTime() {
    this.currentHour = this.currentHour % 12;
    this.currentHour = this.currentHour ? this.currentHour : 12;
    this.m = this.checkTime(this.m);
    this.time = this.currentHour + ":" + this.m + ' ' + this.ampm;
  }
  
  checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
  }
}
