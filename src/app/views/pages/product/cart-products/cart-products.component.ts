import {Component, OnInit} from "@angular/core";
import {Product} from "../../../../shared/models/product";
import {ProductService} from "../../../../shared/services/product.service";
import {HttpServiceService} from "../../../../shared/services/http-service.service";
import {AuthService} from "../../../../shared/services/auth.service";
import {CartServiceService} from "../../../../shared/services/cart-service.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-cart-products",
  templateUrl: "./cart-products.component.html",
  styleUrls: ["./cart-products.component.scss"],
})
export class CartProductsComponent implements OnInit {
  cartProducts: Product[];
  cartObj = [];
  showDataNotFound = true;

  // Not Found Message
  messageTitle = "No Products Found in Cart";
  messageDescription = "Please, Add Products to Cart";

  constructor(
    private router: Router,
    public authService: AuthService,
    private productService: ProductService,
    private cartService: CartServiceService,
    private http: HttpServiceService) {
  }

  ngOnInit() {
    console.log(this.cartService.getCartOBj());
    this.getCartDetailsByUser();
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
    });
  }

  getCartDetailsByUser() {
    this.http
      .postRequestWithToken('api/addtocart/getCartsByUserId', {"userId": this.http.getLoginDataByKey("user_id")})
      .subscribe(
        (data: any) => {
          this.cartObj = data;
        },
        (error) => {
          alert('Error while fetching the cart Details');
        }
      );
  }
  removeCartById(cartObj) {
    if (confirm('Are you sure want to delete..?')) {
      const id = cartObj.id;
      const userId = this.http.getLoginDataByKey("user_id")
      // @ts-ignore
      this.cartService.removeCart(id,userId);
    }
  }

}
