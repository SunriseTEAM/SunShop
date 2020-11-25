import {Component, OnInit} from "@angular/core";
import {Product} from "../../../../shared/models/product";
import {AuthService} from "../../../../shared/services/auth.service";
import {ProductService} from "../../../../shared/services/product.service";
import {ToastrService} from "src/app/shared/services/toastr.service";
import {HttpServiceService} from "../../../../shared/services/http-service.service";
import {CartServiceService} from "../../../../shared/services/cart-service.service";
import {userInfo} from "os";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  categoryList: any;
  productsList: any;
  loading = false;
  selectedBrand="All";
  status ="all";
  page = 1;

  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private cartService: CartServiceService,
    private toastrService: ToastrService,
    private http: HttpServiceService,
  ) {
  }

  ngOnInit() {
    this.getAllProducts();
    this.http.postRequestWithToken("api/product/getAllCategory", {}).subscribe(
      (data) => {
        this.categoryList = data;
        if (this.categoryList.length > 1) {
          this.getAllPRoduct(data[0]);
        }
      },
      (error) => {
        alert("Server connection error " + error);
      }
    );
  }

  getAllProducts() {
    this.loading = true;
    const x = this.productService.getProducts();
    x.snapshotChanges().subscribe(
      (product) => {
        this.loading = false;
        this.productList = [];
        product.forEach((element) => {
          const y = {...element.payload.toJSON(), $key: element.key};
          this.productList.push(y as Product);
        });
      },
      (err) => {
        this.toastrService.error("Error while fetching Products", err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.http.setCart(product)
    this.productService.addToCart(product);
  }

  addCart(cartProductObj) {
    let userId = this.http.getLoginDataByKey("user_id");
    const cartObj = {
      productId: cartProductObj.id,
      name: cartProductObj.name,
      images: cartProductObj.images,
      qty: '1',
      price: cartProductObj.price,
      userId: userId
    };
    this.cartService.addCart(cartObj);
  }

  getAllPRoduct(obj) {
    const request = {
      cat_id: obj.id,
    };
    this.http
      .postRequestWithToken("api/product/getAll", request)
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
      )
  }

}
