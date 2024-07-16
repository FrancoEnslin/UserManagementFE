import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/UserModel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.users = await this.userService.getUsers().toPromise();
      console.log('Users received: ', this.users);
    } catch (error) {
      console.error('Error fetching users', error);
      this.users = [];
    }
  }

  isAdminUser(user: User): boolean {
    // Check if user has 'Admin' permission
    return user.userGroups.some(group => group.permissions.includes('Admin'));
  }
}
