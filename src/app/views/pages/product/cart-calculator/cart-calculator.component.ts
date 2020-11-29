import {Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges,} from "@angular/core";
import {Product} from "../../../../shared/models/product";
import {HttpServiceService} from "../../../../shared/services/http-service.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {ProductService} from "../../../../shared/services/product.service";
import {CartServiceService} from "../../../../shared/services/cart-service.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-cart-calculator",
  templateUrl: "./cart-calculator.component.html",
  styleUrls: ["./cart-calculator.component.scss"],
})
export class CartCalculatorComponent implements OnInit {
  @Input() products: Product[];
  cartObj = [];
  cartTotalPrice: any;
  totalValue = 0;
  rootPrice = 0;

  constructor(
    private router: Router,
    public authService: AuthService,
    private productService: ProductService,
    private cartService: CartServiceService,
    private http: HttpServiceService
  ) {}


  ngOnInit() {
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
  }

  qtyChange(qty, cartObj) {
    console.log(cartObj);
    if (this.rootPrice == 0) {
      this.rootPrice = cartObj.price;
    }
    let userId = this.http.getLoginDataByKey("user_id");
    const request = {
      cartId: cartObj.id,
      qty,
      price: (this.rootPrice) * (qty),
      userId: userId
    };
    this.http
      .postRequestWithToken ('api/addtocart/updateQtyForCart', request)
      .subscribe(
        (data: any) => {
          this.cartService.getCartDetailsByUser(); // for updating in the application..
        },
        (error) => {
          alert('Error while fetching the cart Details');
        }
      );
  }
  getTotalAmounOfTheCart() {
    const obj = this.cartObj;
    let totalPrice = 0;
    for (const o in obj) {
      totalPrice = totalPrice + parseFloat(obj[o].price);
    }
    return totalPrice.toFixed(2);
  }
}
