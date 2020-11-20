import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { Product } from "../../../../shared/models/product";
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
  productsList: any;
  cartObj = [];
  cartTotalPrice: any;
  totalValue = 0;
  constructor(
    private router: Router,
    public authService: AuthService,
    private productService: ProductService,
    private cartService: CartServiceService,
    private http: HttpServiceService
  ) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   const dataChanges: SimpleChange = changes.products;
  //
  //   const products: Product[] = dataChanges.currentValue;
  //   this.totalValue = 0;
  //   products.forEach((product) => {
  //     this.totalValue += product.productPrice;
  //   });
  // }

  ngOnInit() {
    // console.log(this.http.getCart());
    this.getCartDetailsByUser();
    // below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
  }
  qtyChange(qty, cartObj) {
    let userId = this.http.getLoginDataByKey("user_id");
    const request = {
      cartId: cartObj.id,
      qty,
      price: (cartObj.price)*(qty),
      userId: userId
    };
    this.http
      .postRequestWithToken('api/addtocart/updateQtyForCart', request)
      .subscribe(
        (data: any) => {
          this.cartService.getCartDetailsByUser(); // for updating in the application..
        },
        (error) => {
          alert('Error while fetching the cart Details');
        }
      );
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
  addCart(cartProductObj) {
    const cartObj = {
      productId: cartProductObj.id,
      name: cartProductObj.name,
      images: cartProductObj.images,
      qty: "1",
      price: cartProductObj.price,
      userId: cartProductObj.userId
    };
    this.cartService.addCart(cartObj);
  }
}
