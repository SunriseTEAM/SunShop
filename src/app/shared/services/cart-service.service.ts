import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {HttpServiceService} from "./http-service.service";
import {error} from "protractor";
import {ToastrService} from "./toastr.service";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  url = "http://localhost:8090/";
  public cartServiceEvent = new BehaviorSubject({});
  cartQty = 0;
  cartObj = [];
  public cartTotalPrice: any;

  constructor(private http: HttpServiceService, private toastrService: ToastrService) {
    this.getCartDetailsByUser();
  }

  getCartDetailsByUser() {
    this.http
      .postRequestWithToken("api/addtocart/getCartsByUserId", {
        "userId":
          this.http.getLoginDataByKey("user_id")
      })
      .subscribe(
        (data: any) => {
          // alert("Error while fetching the cart Details");
          this.cartObj = data;
          this.cartQty = data.length;
          this.cartTotalPrice = this.getTotalAmounOfTheCart();
          this.cartServiceEvent.next({status: "completed"}); // emitter
          // tslint:disable-next-line:no-shadowed-variable
        },
        (error) => {
          alert("Error while fetching the cart Details");
        }
      );
  }

  addCart(obj) {
    this.cartServiceEvent.next({"status":"completed"})//emitter
    const request = {
      productId: obj.productId,
      name: obj.name,
      images: obj.images,
      qty: obj.qty,
      price: obj.price,
      userId: obj.userId,
    };
    console.log(obj);
    this.http
      .postRequestWithToken("api/addtocart/addProduct", request)
      .subscribe(
        (data: any) => {
          this.getCartDetailsByUser();
          this.toastrService.wait(
            "Adding Product to Cart",
            "Product Adding to the cart"
          );
        },
        (error) => {
          // if the products is already in cart
          alert("Error in AddCart API " + error.message);
        }
      );
  }

  getCartOBj() {
    return this.cartObj;
  }

  getTotalAmounOfTheCart() {
    const obj = this.cartObj;
    let totalPrice = 0;
    for (const o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }

    return totalPrice.toFixed(2);
  }

  getQty() {
    return this.cartQty;
  }

  removeCart(cartId) {
    const request = {
      userId: this.http.getLoginDataByKey("user_id"),
      cartId: cartId,
    };
    this.http
      .postRequestWithToken("api/addtocart/removeProductFromCart", request)
      .subscribe(
        (data: any) => {
          this.getCartDetailsByUser();
          // tslint:disable-next-line:no-shadowed-variable
        },
        (error) => {
          alert("Error while fetching the cart Details");
        }
      );
  }
}
