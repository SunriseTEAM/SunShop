import { ProductService } from "../../../../../shared/services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Product } from "../../../../../shared/models/product";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../shared/services/auth.service";
import {CartServiceService} from "../../../../../shared/services/cart-service.service";
import {HttpServiceService} from "../../../../../shared/services/http-service.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  checkoutProducts: Product[];
  cartObj = [];
  cartTotalPrice: any;
  totalPrice = 0;
  constructor(productService: ProductService,
              private router: Router,
              public authService: AuthService,
              private cartService: CartServiceService,
              private http: HttpServiceService) {
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const products = productService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach((product) => {
      this.totalPrice += product.price;
    });
  }

  ngOnInit() {
    // console.log(this.http.getCart());
    this.getCartDetailsByUser();
    // below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
  }
  getCartDetailsByUser() {
    this.http
      .postRequestWithToken('api/addtocart/getCartsByUserId', { "userId":
          this.http.getLoginDataByKey("user_id")})
      .subscribe(
        (data: any) => {
          this.cartObj = data;
          this.cartTotalPrice = this.getTotalAmounOfTheCart();
        },
        (error) => {
          alert('Error while fetching the cart Details');
        }
      );
  }

  getTotalAmounOfTheCart() {
    const obj = this.cartObj;
    let totalPrice = 0;
    // tslint:disable-next-line:forin
    for (const o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }
    return totalPrice.toFixed(2);
  }
}
