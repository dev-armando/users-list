import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint: string = environment.API + '/user';
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<User[]>(this.endpoint + '/');
  }
  get(id: string) {
    return this.http.get<User>(this.endpoint + '/' + id);
  }

  getCode(code: string) {
    return this.http.get<User>(this.endpoint + '/code/' + code);
  }

  create(user: User) {
    return this.http.post<string>(this.endpoint + '/create', user);
  }
  delete(id: string) {
    return this.http.delete<User>(this.endpoint + '/' + id, {});
  }
  edit(user: User) {
    return this.http.put<string>(this.endpoint + '/' + user._id, user);
  }

}
