import { StorageKey } from './../constants/storage-keys.constan';
import { GenericStorageService } from './generic-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthTokenService extends GenericStorageService {

  constructor() { 
    super();
  }

  public setToken(authToken: string): void {
    this.save(StorageKey.AUTH_TOKEN, authToken);
  }

  public getToken(): string {
    let authToken: string;

    try {
      authToken = this.get(StorageKey.AUTH_TOKEN);
    } finally {
      if(!authToken) {
        this.removeToken();
      }
    }

    return authToken;
  }

  public removeToken(): void {
    this.remove(StorageKey.AUTH_TOKEN);
  }
 
}
