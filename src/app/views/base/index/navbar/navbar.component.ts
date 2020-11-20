import { TranslateService } from "./../../../../shared/services/translate.service";
import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../../../../shared/services/auth.service";
import { ProductService } from "./../../../../shared/services/product.service";

import { ThemeService } from "src/app/shared/services/theme.service";
import { CartServiceService } from "../../../../shared/services/cart-service.service";
import { HttpServiceService } from "../../../../shared/services/http-service.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;
  colorPallet1 = [
    {
      title: "Purple Theme",
      color: "color-purple",
      id: "purple-theme",
    },
    {
      title: "Blue Theme",
      color: "color-blue",
      id: "blue-theme",
    },
  ];

  colorPallet2 = [
    {
      title: "Red Theme",
      color: "color-red",
      id: "red-theme",
    },
    {
      title: "Violet Theme",
      color: "color-violet",
      id: "violet-theme",
    },
  ];

  languageList = [
    { language: "Vietnamese", langCode: "vi" },
    { language: "English", langCode: "en" },
    { language: "French", langCode: "fr" },
    { language: "Persian", langCode: "fa" },
    { language: "Japanese", langCode: "ja" },
    { language: "Hindi", langCode: "hin" },
  ];

  mobile = "0334118321";
  password = "12345678";
  isLogin = false;

  welcomeUsername = "";
  cart_qty = 0;
  cartTotalPrice = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService,
    private cartService: CartServiceService,
    private http: HttpServiceService
  ) {
    // console.log(translate.data);
    if (this.http.isLogin()) {
      this.isLogin = true;
      this.welcomeUsername = this.http.getLoginDataByKey("name");
    }
    this.cartService.cartServiceEvent.subscribe(data => {
      this.cart_qty = this.cartService.getQty();
    });
  }
  logout() {
    this.http.logout();
    this.isLogin = false;
    this.cart_qty = 0;
    this.router.navigate(["/login"]);
  }
  ngOnInit() {}

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }

}
