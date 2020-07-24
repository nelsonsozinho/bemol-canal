import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from '../app/app.routing.module';
import { LoginComponent } from '../app/components/login/login.component';
import { MaterialModule } from '../app/components/material/material.module';
import { AppComponent } from './app.component';
import { RemoveComponent } from './base/dialog/remove/remove.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './components/login/auth.guard';
import { AuthInterceptor } from './components/login/AuthInterceptor';
import { DialogMensagemComponent } from './components/share/dialog-mensagem/dialog-mensagem.component';
import { MensagemErrorComponent } from './components/share/mensagem-error/mensagem-error.component';
import { NewUserComponent } from './components/user/new-user/new-user.component';
import { UserComponent } from './components/user/user.component';
import { AuthTokenService } from './services/auth-token.service';
import { GenericSessionService } from './services/generic-session.service';
import { GenericStorageService } from './services/generic-storage.service';
import { UserDataService } from './services/user-data.service';
import { UserService } from './services/user.service';
import {MatBadgeModule} from '@angular/material/badge'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    DialogMensagemComponent,
    MensagemErrorComponent,
    LayoutComponent,
    UserComponent,
    RemoveComponent,
    NewUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatBadgeModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot({
      preventDuplicates: true,
      enableHtml: true
    }),

  ],
  providers: [UserService,
    AuthGuard,
    GenericSessionService, 
    GenericStorageService,
    AuthTokenService,
    UserService,
    UserDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
