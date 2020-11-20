import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard  {
  constructor(private router: Router, private authService: AuthService) {}

}
