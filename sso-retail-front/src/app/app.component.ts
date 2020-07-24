import { Component, Injector, OnInit } from '@angular/core';
import { DependencyInjector } from './base/dependency-injector';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Retail';
  isAuthenticated: boolean;
  showTemplate: boolean = false;

  constructor(injector: Injector) {
    DependencyInjector.setup(injector);
    
  }

  logoff(){
  
  }

  async ngOnInit() {
    
  }

  showContentWrapper(){
    
  }

}
