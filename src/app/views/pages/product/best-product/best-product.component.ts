import { TranslateService } from "src/app/shared/services/translate.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "src/app/shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { map } from "rxjs/operators";
import { CartServiceService } from "../../../../shared/services/cart-service.service";
import { HttpServiceService } from "../../../../shared/services/http-service.service";

@Component({
  selector: "app-best-product",
  templateUrl: "./best-product.component.html",
  styleUrls: ["./best-product.component.scss"],
})
export class BestProductComponent implements OnInit {
  bestProducts: Product[] = [];
  options: any;
  categoryList: any;
  productsList: any;
  loading = false;
  constructor(
    private cartService: CartServiceService,
    private http: HttpServiceService,
    private productService: ProductService,
    private toasterService: ToastrService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        0: { items: 1, margin: 5 },
        430: { items: 2, margin: 5 },
        550: { items: 3, margin: 5 },
        670: { items: 4, margin: 5 },
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 3000,
      lazyLoad: true,
    };
    this.getAllProducts();
    this.http.postRequestWithToken("api/product/getAllCategory", {}).subscribe(
      (data) => {
        this.categoryList = data;
        if (this.categoryList.length > 1) {
          this.getAllPRoducts(data[0]);
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
    x.snapshotChanges()
      .pipe(map((products) => products.slice(0, 5)))
      .subscribe(
        (products) => {
          this.loading = false;
          this.bestProducts = [];
          products.forEach((element) => {
            const y = { ...element.payload.toJSON(), $key: element.key };
            this.bestProducts.push(y as Product);
          });
        },
        (error) => {
          this.toasterService.error("Error while fetching Products", error);
        }
      );
  }

  addCart(cartProductObj) {
    const cartObj = {
      productId: cartProductObj.id,
      qty: "1",
      price: cartProductObj.price,
    };
    this.cartService.addCart(cartObj);
  }
  getAllPRoducts(obj) {
    this.loading = true;
    const x = this.productService.getProducts();
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
      );
  }
}
