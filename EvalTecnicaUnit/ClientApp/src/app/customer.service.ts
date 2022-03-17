import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/CustomerModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  ctrlUrl: string = 'customer';
  armedUrl: string;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.armedUrl = `${baseUrl}${this.ctrlUrl}`;
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.armedUrl}/GetAll`);
  }

  public save(record: CustomerModel): Observable<any> {
    if (record.id)
      return this.httpClient.put(`${this.armedUrl}/update`, record);
    else {
      record.id = 0;
      return this.httpClient.post(`${this.armedUrl}/create`, record);
    }
  }

  public getById(id: string): Observable<any> {
    return this.httpClient.get(`${this.armedUrl}/${id}`);
  }

  public delete(id: string): Observable<any> {
    return this.httpClient.delete(`${this.armedUrl}/${id}`);
  }


}
