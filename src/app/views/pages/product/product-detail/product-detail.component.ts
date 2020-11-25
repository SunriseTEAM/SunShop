// import { Product } from "../../../../shared/models/product";
// import { Component, OnInit, OnDestroy } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { ProductService } from "../../../../shared/services/product.service";
// import { ToastrService } from "src/app/shared/services/toastr.service";
// import { HttpServiceService } from "../../../../shared/services/http-service.service";
// @Component({
//   selector: "app-product-detail",
//   templateUrl: "./product-detail.component.html",
//   styleUrls: ["./product-detail.component.scss"],
// })
// export class ProductDetailComponent implements OnInit, OnDestroy {
//   private sub: any;
//   product: Product;
//   categoryList: any;
//   productsList: any;
//   selectedBrand="All";
//   id: number;
//
//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService,
//     private toastrService: ToastrService,
//     private http: HttpServiceService
//   ) {
//     this.product = new Product();
//   }
//
//   ngOnInit() {
//     this.sub = this.route.params.subscribe((params) => {
//       const id = params.id; // (+) converts string 'id' to a number
//       this.getProductDetail(id);
//     });
//     this.http.postRequestWithToken("api/product/getAllCategory", {}).subscribe(
//       (data) => {
//         this.productsList = data;
//         if (this.productsList.length > 1) {
//           this.getProductsByCateogy(data[0]);
//         }
//       },
//       (error) => {
//         alert("Server connection error " + error);
//       }
//     );
//   }
//



// }


import { ProductDetail } from "../../../../shared/models/productDetail";
import { Component, OnInit, Input } from '@angular/core';
import { ProductDetailService} from "../../../../shared/services/productDetail.service";
// import { ProductListComponent } from "../../../pages/product/product-detail/product-detail.component";
import { Router, ActivatedRoute } from '@angular/router';
import {Product} from "../../../../shared/models/product";
import {ProductService} from "../../../../shared/services/product.service";
import {HttpServiceService} from "../../../../shared/services/http-service.service";
import {CartServiceService} from "../../../../shared/services/cart-service.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  private sub: any;
  id: number;
  productsList: any;
  selectedBrand="All";
  page = 1;
  product: Product;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cartService: CartServiceService,
              private productService: ProductService,
              private productDetailService: ProductDetailService,
              private http: HttpServiceService) { }

  ngOnInit() {
    this.product = new Product();

    this.id = this.route.snapshot.params['id'];

    this.productDetailService.getProductDetail(this.id)
      .subscribe(data => {
        console.log(data)
        this.product = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['employees']);
  }

  addCart(product: Product) {
    let userId = this.http.getLoginDataByKey("user_id");
    const cartObj = {
      productId: product.id,
      name: product.name,
      images: product.images,
      qty: '1',
      price: product.price,
      userId: userId
    };
    this.cartService.addCart(cartObj);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
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
