import { Perfil } from './../model/perfil';
import { User } from './../model/user';
import { StorageKey } from './../constants/storage-keys.constan';
import { GenericSessionService } from './generic-session.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService extends GenericSessionService {

  constructor() {
    super();
  }

  public setUserData(userData) {
    this.save(StorageKey.USER_DATA, userData);
  }

  public setUserProfile(userProfile) {
    this.save(StorageKey.USER_PROFILE, userProfile);
  }

  public removeUserData(): void {
    this.remove(StorageKey.USER_DATA);
  }

  public removeUserProfile(): void {
    this.remove(StorageKey.USER_PROFILE);
  }

  public isLoggedUser() {
    return this.getLoggedUser() == null ? false : true;;
  }

  public getLoggedUser(): User {
    let userData = null;
    try {
      userData = this.get(StorageKey.USER_DATA);
    } finally {
      if (!userData) {
        this.removeUserData();
        userData = null;
      }
    }

    return userData;
  }

  public getUserProfile(): Perfil[] {
    let userProfiles = null;
    try {
      userProfiles = this.get(StorageKey.USER_PROFILE);
    } finally {
      if (!userProfiles) {
        this.removeUserProfile();
        userProfiles = null;
      }
    }

    return userProfiles;
  }

}
