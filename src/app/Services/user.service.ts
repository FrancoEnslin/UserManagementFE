import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/UserModel'
import { AddUser } from '../Models/AddUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44359/api/Users';

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/GetUsers`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/GetUserById/${id}`);
  }

  createUser(user: AddUser): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/CreateUser`, user);
  }

  updateUserDetails(user: AddUser): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateUserDetails`, user);
  }

  updateUserGroup(userId: number, newGroupId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/UpdateUserGroup/${userId}/${newGroupId}`, {});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DeleteUser/${id}`);
  }

  getUserCount(): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/GetUserCount`);
  }
  getUserCountByGroup(id: number): Observable<any> {
    return this.http.get<number>(`${this.apiUrl}/GetUserCountByGroup/${id}`);
  }
}
