import { BaseComponent } from './../../base/base.component';
import { User } from './../../model/user';
import { UserDataService } from './../../services/user-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { TooltipPosition } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { SidenavService } from '../../services/sidenav.service';
import { AuthTokenService } from './../../services/auth-token.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent extends BaseComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((result) => result.matches));

  @ViewChild('panel', { static: true })
  private sidePanel: MatSidenav;

  @ViewChild('content', { static: true, read: ViewContainerRef })
  private vcf: ViewContainerRef;

  public positionOptions: TooltipPosition[] = ['left']; // Tooltip postion
  public position = new FormControl(this.positionOptions[0]);
  public currentUser: User;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidenavService: SidenavService,
    private userService: UserService,
    private userDataService: UserDataService,
    private atuhTokenService: AuthTokenService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.sidenavService.setPanel(this.sidePanel);
    this.sidenavService.setContentVcf(this.vcf);
    this.currentUser = this.userDataService.getLoggedUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  isLoggedIn(): boolean {
    this.currentUser = this.userDataService.getLoggedUser();
    return this.currentUser == null ? false : true;
  }

}
