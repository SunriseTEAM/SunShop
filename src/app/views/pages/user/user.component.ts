import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import {User} from "../../../shared/models/user";
import {Router} from "@angular/router";
import {HttpServiceService} from "../../../shared/services/http-service.service";
import {UserService} from "../../../shared/services/user.service";
import {ToastrService} from "../../../shared/services/toastr.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  isLogin = false;
  users: Array<User> = [];
  showUser = new User();

  constructor(
    private router: Router,
    public authService: AuthService,
    private http: HttpServiceService,
    private userService: UserService,
    private toastService: ToastrService,
             ) {
    if (this.http.isLogin()) {
      this.isLogin = true;
      this.showUser.name = this.http.getLoginDataByKey("name");
      this.showUser.id = this.http.getLoginDataByKey("user_id");
      this.showUser.email = this.http.getLoginDataByKey("email");
      this.showUser.address = this.http.getLoginDataByKey("address");
      this.showUser.mobile = this.http.getLoginDataByKey("mobile");
      this.showUser.created_at = this.http.getLoginDataByKey("created_at");
      console.log(this.showUser);
    }
  }
  ngOnInit() {}
}
