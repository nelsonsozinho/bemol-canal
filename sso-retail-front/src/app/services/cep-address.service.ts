import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepAddressService {

  protected serverUrl;
  

  constructor(private http: HttpClient) { 
    this.serverUrl = `${environment.API}/cep`;
  }

  getAddressByCep(cep: string){
    return this.http.get(`${this.serverUrl}/${cep}`);
  }


}
