import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/models/product";
import { ProductService } from "../../../../shared/services/product.service";
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: "app-favourite-products",
  templateUrl: "./favourite-products.component.html",
  styleUrls: ["./favourite-products.component.scss"],
})
export class FavouriteProductsComponent implements OnInit {
  productList: Product[];
  showDataNotFound = true;
  cartObj = [];

  // Not Found Message
  messageTitle = "No Favourite Products Found";
  messageDescription = "Please, choose your favourite products";

  constructor(public authService: AuthService,
              private productService: ProductService) {}

  ngOnInit() {
    this.getFavouriteProduct();
  }
  removeFavourite(product: Product) {
    this.productService.removeLocalFavourite(product);

    this.getFavouriteProduct();
  }

  getFavouriteProduct() {
    this.productList = this.productService.getLocalFavouriteProducts();
  }
}
