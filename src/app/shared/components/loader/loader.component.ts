import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {ObservableService} from '../../../services/observable.service'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: boolean = false;

  constructor(
    private cd:ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.observe()
   }

  ngOnDestroy() { }

  async observe(){
    ObservableService.loader.subscribe((res:any)=>{
      this.show = res;
      this.cd.detectChanges();
    })
  }
}
