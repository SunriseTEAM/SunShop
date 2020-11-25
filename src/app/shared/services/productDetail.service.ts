import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  private baseUrl = "http://localhost:8090/api/product/productById";

  constructor(private http: HttpClient) { }

  getProductDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }


  createEmployee(prDetail: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, prDetail);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }


}
