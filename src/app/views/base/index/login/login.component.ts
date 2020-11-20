import { ToastrService } from "../../../../shared/services/toastr.service";
import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../shared/services/user.service";
import { AuthService } from "../../../../shared/services/auth.service";
import { User } from "../../../../shared/models/user";
import { CartServiceService } from "../../../../shared/services/cart-service.service";
import { HttpServiceService } from "../../../../shared/services/http-service.service";
import {TranslateService} from "../../../../shared/services/translate.service";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator],
})
export class LoginComponent implements OnInit {

  errorInUserCreate = false;
  errorMessage: any;

  //
  dialogType = "login";
  isLogin = false;
  mobile = "0334118321";
  password = "12345678";
  register = { name: "", email: "", mobile: "", password: "", re_password: "" };
  welcomeUsername = "";
  emailaddress = "";
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private http: HttpServiceService,
    public translate: TranslateService,
  ) {

    //
    const request = {};

    this.http.postRequest("api/status", request).subscribe(
      (data) => {
        console.log("test", data);
      },
      (error) => {
        alert("Server connection error " + error);
      }
    );
    if (this.http.isLogin()) {
      this.isLogin = true;
      this.welcomeUsername = this.http.getLoginDataByKey("name");
    }
    if (this.http.isLogin()) {
      this.isLogin = true;
      this.emailaddress = this.http.getLoginDataByKey("name");
    }

  }

  ngOnInit() {}

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((res) => {
        this.router.navigate(["/"]);
      })
      .catch((err) => console.log(err));
  }

  //
  loginUserCheck() {
    // tslint:disable-next-line:triple-equals
    if (this.mobile == "") {
      alert("Name should not be empty");
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.password == "") {
      alert("Password should not be empty");
      return;
    }
    const request = {
      mobile: this.mobile,
      password: this.password,
    };
    this.http.postRequest("api/login/user", request).subscribe(
      (data) => {
        console.log(data);
        if (data.hasOwnProperty("token")) {
          this.http.setLoginToken(data.token);
          this.http.setLoginData(data);
          this.welcomeUsername = this.http.getLoginDataByKey("name");
          this.toastService.success(
            "Authentication Success",
            "Logging in please wait"
          );
          const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

          setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
          }, 1500);
          this.ngOnInit();
        }

      },

      (error) => {
              this.toastService.error(
                "Authentication Failed",
                "Invalid Credentials, Please Check your credentials"
              );
      }
    );
  }
  registerUser() {
    // tslint:disable-next-line:triple-equals
    if (this.register.name == "") {
      alert("Name should not be empty");
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.register.email == "") {
      alert("Email should not be empty");
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.register.password == "") {
      alert("password should not be empty");
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.register.password != this.register.re_password) {
      alert("password and rePassword should be same");
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.register.mobile == "") {
      alert("Mobile should not be empty");
      return;
    }

    const request = {
      name: this.register.name,
      email: this.register.email,
      password: this.register.password,
      mobile: this.register.mobile,
    };
    this.http.postRequest("api/signup/user", request).subscribe(
      (data) => {
        this.toastService.success("Registering", "User Registeration");
        setTimeout((router: Router) => {
          $("#createUserForm").modal("hide");
          this.router.navigate(["/"]);
        }, 1500);
      },
      (error) => {
        this.errorInUserCreate = true;
        this.errorMessage = error;
        this.toastService.error("Error while Creating User", error);
      }
    );
  }
}
