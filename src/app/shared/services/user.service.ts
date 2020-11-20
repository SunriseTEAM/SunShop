import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import * as moment from "moment";
import { User } from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8090/api/user';
  selectedUser: User = new User();
  users: AngularFireList<User>;

  location = {
    lat: null,
    lon: null,
  };

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.list("clients");
    return this.users;
  }

  getUserById(id: string) {}

  createUser(data: any) {
    const updatedData = {
      ...data,
      location: this.location,
      createdOn: moment(new Date()).format("X"),
      isAdmin: false,
    };
    this.users.push(updatedData);
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}` + `/updatebyid/` + user.id, user);
  }
}
