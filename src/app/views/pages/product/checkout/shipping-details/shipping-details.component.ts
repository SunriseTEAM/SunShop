import { Product } from "../../../../../shared/models/product";
import { ShippingService } from "../../../../../shared/services/shipping.service";
import {  User } from "../../../../../shared/models/user";
import { AuthService } from "../../../../../shared/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../../../shared/services/product.service";
import { map } from "rxjs/operators";
import {CartServiceService} from "../../../../../shared/services/cart-service.service";
import {HttpServiceService} from "../../../../../shared/services/http-service.service";
@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"],
})
export class ShippingDetailsComponent implements OnInit {
  userDetails: User;
  pay_type = "cash_on_delivery";
  delivery_address = "";
  cartObj = [];
  cartTotalPrice :any

  products: Product[];

  constructor(
    authService: AuthService,
    private shippingService: ShippingService,
    productService: ProductService,
    private router: Router,
    private cartService:CartServiceService,
    private http:HttpServiceService
  ) {
    /* Hiding products Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    this.products = productService.getLocalCartProducts();
    authService.user$.pipe(
      map((user) => {
        this.userDetails = user;
      })
    );
  }

  ngOnInit() {

    //below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe(data=>{
      this.cartObj =  this.cartService.getCartOBj();
      this.cartTotalPrice  = this.cartService.cartTotalPrice;
    });
  }

  updateUserDetails(form: NgForm) {
    const products = [];
    let totalPrice = 0;
    this.products.forEach((product) => {
      delete product.$key;
      totalPrice += product.price;
      products.push(product);
    });
    const data = {
      ...form.value,
      products,
      totalPrice,
      shippingDate: Date.now(),
    };

    this.shippingService.createshippings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } },
    ]);
  }

  checkoutCart(){
    if(this.delivery_address == ""){
      alert("Delivery address should not be empty");
      return;
    }
    if(this.pay_type == "cash_on_delivery"){

      let request = {
        "total_price":this.cartTotalPrice,
        "pay_type":"COD",
        "deliveryAddress":this.delivery_address,
        "userId" : this.http.getLoginDataByKey("user_id")
      }
      this.http.postRequestWithToken("api/order/checkout_order",request)
        .subscribe((data:any)=>{
        alert("checkout process completed.Your Order is processed..");
        this.cartService.getCartDetailsByUser();
        this.router.navigate(['']);
      },error=>{
        alert("Error while fetching the cart Details");
      })

    }else{
      alert("Payment Integration is not yet completed.")
    }
  }
}
