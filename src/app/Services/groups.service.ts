import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/UserModel'
import { Group } from '../Models/GroupModel';
import { AddGroup } from '../Models/AddGroup';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private apiUrl = 'https://localhost:5001/api/Groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}/GetGroups`);
  }

  getGroupById(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: AddGroup): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}/CreateGroup`, group);
  }

  // updateUser(user: Group): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/${user.id}`, user);
  // }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
