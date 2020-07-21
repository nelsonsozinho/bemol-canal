import { User } from '../model/user';

import { Injectable, EventEmitter } from '@angular/core';
import { CurrentUser } from '../model/current-user';
import { Perfil } from '../model/perfil';

@Injectable()
export class SharedService {

  public static instance: SharedService = null;

  showTemplate = new EventEmitter<boolean>();

  listPerfil : Perfil[];
  currentUser: CurrentUser;

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn(): boolean {
    if (this.currentUser == null) {
      return false;
    }
    return this.currentUser.username != null;
  }

}
