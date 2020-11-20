import {Component, OnInit, AfterViewInit} from "@angular/core";
import {User} from "src/app/shared/models/user";
import {AuthService} from "src/app/shared/services/auth.service";
import {HttpServiceService} from "../../../../shared/services/http-service.service";
import {UserService} from "../../../../shared/services/user.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements AfterViewInit {
  // Enable Update Button
  isLogin = false;
  isFullNameUpdate = false;
  users: Array<User> = [];
  showUser = new User();
  isSelected: boolean = false;

  constructor(private router: Router,public authService: AuthService, private http: HttpServiceService, private userService: UserService,private toastService: ToastrService,) {
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

  ngAfterViewInit(): void {
  }

  updateUser() {
    console.log(this.showUser);
    this.userService.updateUser(this.showUser)
      .subscribe(data => {
        window.alert("Update Successfully!Please, Login try again! ")
          // this.toastService.success(
          //   "Update Successfully",
          //   "Please, Logging in again!"
          // );
          console.log(data);
          this.http.logout();
          this.isLogin = false;
          // this.router.navigate(["/login"]);
          location.replace('/login')
        }
        , (error) => {
          console.log(error);
          let errMsg = "Update Fail ! Error = " + error;
        });
  }
  updateName() {
    this.isFullNameUpdate = !this.isFullNameUpdate;
  }
}
