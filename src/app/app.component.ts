import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom, filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  user = (localStorage.getItem("token"));
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService, translate: TranslateService, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'de', 'es', 'fr', 'pt', 'cn', 'ae']);
    }
  }

  ngOnInit() {
    this.location()
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     if (this.user) {
    //       if (
    //         window.location.href.indexOf("login") > -1
    //       ) {
    //         this.router.navigate(["/dashboard"]);
    //       }
    //     }
    //   });
  }

  async location() {
    await navigator.geolocation.getCurrentPosition((position) => { 
      localStorage.setItem('lat',JSON.stringify(position.coords.latitude))
      localStorage.setItem('lang',JSON.stringify(position.coords.longitude))
     });
   }
   
}
