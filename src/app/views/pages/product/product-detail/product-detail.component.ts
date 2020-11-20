import { Product } from "../../../../shared/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { HttpServiceService } from "../../../../shared/services/http-service.service";
@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  categoryList: any;
  productsList: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService: ToastrService,
    private http: HttpServiceService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params.id; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
    this.http.postRequestWithToken("api/product/getAllCategory", {}).subscribe(
      (data) => {
        this.categoryList = data;
        if (this.categoryList.length > 1) {
          this.getProductsByCateogy(data[0]);
        }
      },
      (error) => {
        alert("Server connection error " + error);
      }
    );
  }

  getProductDetail(id: string) {
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(
      (product) => {
        const y = { ...(product.payload.toJSON() as Product), $key: id };
        this.product = y;
      },
      (error) => {
        this.toastrService.error("Error while fetching Product Detail", error);
      }
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
