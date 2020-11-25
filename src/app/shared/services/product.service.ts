import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Product } from "../models/product";
import { AuthService } from "./auth.service";
import { ToastrService } from "./toastr.service";
import {ProductDetail} from "../models/productDetail";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  product: AngularFireObject<Product>;
  productDetail: AngularFireObject<ProductDetail>;
  private baseUrl = "http://localhost:8090/api/product/productById";

  // favouriteProducts
  favouriteProducts: AngularFireList<FavouriteProduct>;
  cartProducts: AngularFireList<FavouriteProduct>;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  getProducts() {
    this.products = this.db.list("products");
    return this.products;
  }

  getProductDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);

  }

  createProduct(data: Product, callback: () => void) {
    this.products.push(data);
    callback();
  }

  getProductById(key: string) {
    this.productDetail = this.db.object("products/" + key);
    return this.productDetail;
  }

  updateProduct(data: Product) {
    this.products.update(data.$key, data);
  }

  deleteProduct(key: string) {
    this.products.remove(key);
  }

  /*
   ----------  Favourite Product Function  ----------
  */

  // Get Favourite Product based on userId
  async getUsersFavouriteProduct() {
    const user = await this.authService.user$.toPromise();
    this.favouriteProducts = this.db.list("favouriteProducts", (ref) =>
      ref.orderByChild("userId").equalTo(user.id)
    );
    return this.favouriteProducts;
  }

  // Adding New product to favourite if logged else to localStorage
  addFavouriteProduct(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avf_item")) || [];
    a.push(data);
    this.toastrService.wait("Adding Product", "Adding Product as Favourite");
    setTimeout(() => {
      localStorage.setItem("avf_item", JSON.stringify(a));
    }, 1500);
  }

  // Fetching unsigned users favourite proucts
  getLocalFavouriteProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avf_item")) || [];

    return products;
  }

  // Removing Favourite Product from Database
  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  // Removing Favourite Product from localStorage
  removeLocalFavourite(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avf_item", JSON.stringify(products));
  }

  /*
   ----------  Cart Product Function  ----------
  */

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    const a: Product[] = JSON.parse(localStorage.getItem("avct_item")) || [];
    a.push(data);

    this.toastrService.wait(
      "Adding Product to Cart",
      "Product Adding to the cart"
    );
    setTimeout(() => {
      localStorage.setItem("avct_item", JSON.stringify(a));
    }, 500);
  }
  getLocalCartProducts(): Product[] {
    const products: Product[] =
      JSON.parse(localStorage.getItem("avct_item")) || [];

    return products;
  }
  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem("avct_item", JSON.stringify(products));
  }

  // Fetching Locat CartsProducts

}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
