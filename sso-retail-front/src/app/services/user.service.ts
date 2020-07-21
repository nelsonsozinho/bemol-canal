import { Perfil } from './../model/perfil';
import { StorageKey } from './../constants/storage-keys.constan';
import { UserDataService } from './user-data.service';
import { AuthTokenService } from './auth-token.service';
import { UserFilter } from './../filters/user-filter';
import { BasePaginatedResponse } from './../base/base-paginated.response';
import { Injectable } from '@angular/core';
import { Autentication } from '../model/autentication';

import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  protected serverUrl;

  page :string;
  size :string;
  param = '';

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService,
    private userDataservice: UserDataService, 
  ) {
    this.serverUrl = `${environment.API}/user/`;
  }

  login(user: Autentication){
    return this.http.post(`${environment.API}/user/authentication`,user);
  }

  createOrUpdate(user: User){
    if(user.codigo != null){
      return this.http.put(`${environment.API}/user/${user.codigo}`,user);

    } else {
      user.codigo = null;
      return this.http.post(`${environment.API}/user`, user);
    }
  }

  update(user: User){
    return this.http.put(`${environment.API}/user/${user.codigo}`,user);
  }

  findAll(filters?: UserFilter){
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(function (key) {
          if (filters[key] !== null && filters[key] !== undefined) {
              params = params.append(key, filters[key]);
          }
      });
    }
    return this.http.get<BasePaginatedResponse<User>>(this.serverUrl, {params});
  }

  findById(codigo:number){
    return this.http.get(`${environment.API}/user/${codigo}`);
  }

  delete(codigo:number){
    return this.http.delete(`${environment.API}/user/${codigo}`);
  }

  find(nome: string) {
    console.log('search');
    this.param = 'nome='+nome;

    return this.http.get(`${environment.API}/user/search?`+this.param);
  }

  pesquisar(user: User, param: string) {
    console.log('pesquisar');
    return this.http.post(`${environment.API}/user/pesquisar`+param, user);
  }

  alterarSenha(user: User){
    return this.http.put(`${environment.API}/user/alterar-senha`,user);
  }

  public saveUserData(data) {
    this.userDataservice.save(StorageKey.USER_DATA, data);
    this.authTokenService.setToken(data.token);
  }

  public saveProfileList(perfis: Perfil[]) {
    this.userDataservice.setUserProfile(perfis);
  }

  public logout() {
    this.authTokenService.removeToken();
    this.userDataservice.removeUserData();
    this.userDataservice.removeUserProfile();
  }

  public isAuthenticated(): boolean {
    const token = this.authTokenService.getToken();
    return (token !== undefined && token != null);
  }

}
