import { DependencyInjector } from './base/dependency-injector';

import { Component, OnInit, ViewChild, ViewContainerRef, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Inventário';
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
