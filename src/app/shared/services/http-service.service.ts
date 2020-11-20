import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {map, filter, scan, catchError, tap} from "rxjs/operators";
import {Product} from "../models/product";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  url = "http://localhost:8090/";

  constructor(private http: HttpClient) {
  }

  postRequest(url: string, param: {}) {
    return this.http.post(this.url + url, param, httpOptions).pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }

  postRequestWithToken(url: string, param: {}) {
    const httpOptionsWithToken = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.getLoginToken(),
      }),
    };
    // @ts-ignore
    // param.userId = "1";
    return this.http.post(this.url + url, param, httpOptionsWithToken).pipe(
      catchError(this.handleError.bind(this)) // then handle the error
    );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      return throwError("Something went wrong..while connecting with server");
    }
  }

  setLoginData(data) {
    console.log(data);
    localStorage.setItem(
      "login_data",
      JSON.stringify(data.user_profile_details)
    );
  }

  getLoginDataByKey(key) {
    const data = JSON.parse(localStorage.getItem("login_data"));
    if (data.hasOwnProperty(key)) {
      return data[key];
    }
    return null;
  }

  setLoginToken(token) {
    if (token != "") {
      localStorage.setItem("token", token);
    }
  }

  getLoginToken() {
    return localStorage.getItem("token");
  }

  setCart(product) {
    let carts = this.getCart();
    if (carts == null) {
      carts = [];
    }
    carts.push(product)
    localStorage.setItem("cart", JSON.stringify(carts));
  }

  getCart(): Product[] {
    return JSON.parse(localStorage.getItem("cart"));
  }

  logout() {
    localStorage.setItem("token", "");
  }

  isLogin() {
    try {
      console.log("login token ", this.getLoginToken());

      // tslint:disable-next-line:triple-equals
      if (this.getLoginToken() != "" && this.getLoginToken().length > 10) {
        return true;
      }
    } catch (e) {
    }
    return false;
  }
}
