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
  categoryList: any;
  cartObj = [];
  productsList: any;
  cartTotalPrice: any;
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
    // below function will be triggerd from when removing and qty  is changing..
    this.cartService.cartServiceEvent.subscribe((data) => {
      this.cartObj = this.cartService.getCartOBj();
      this.cartTotalPrice = this.cartService.cartTotalPrice;
    });
  }

  getCartDetailsByUser() {
    this.http
      .postRequestWithToken('api/addtocart/getCartsByUserId', {
        "userId":
          this.http.getLoginDataByKey("user_id")
      })
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

  removeCartById(cartObj) {
    if (confirm('Are you sure want to delete..?')) {
      const id = cartObj.id;
      const userId = this.http.getLoginDataByKey("user_id")
      // @ts-ignore
      this.cartService.removeCart(id,userId);
    }
  }

  removeCartProduct(product: Product) {
    this.productService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProduct();
  }

  getCartProduct() {
    this.cartProducts = this.productService.getLocalCartProducts();
  }

  getProductsByCateogy(obj) {
    const request = {
      cat_id: obj.id,
    };
    this.http
      .postRequestWithToken("api/product/getProductsByCategory", request)
      .subscribe(
        (data) => {
          this.productsList = data;
          if (this.productsList.length == 0) {
            alert("No Product is found..");
          }
        },
        (error) => {
          alert("Error in login " + error);
        }
      );
  }

}
