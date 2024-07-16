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

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, error => {
      console.error('Error fetching users', error);
      this.users = [
        //   {
        //   id: 1,
        //   userName: "Franco",
        //   firstName: "Enslin",
        //   lastName: "YPYO",
        //   group: "Admin",
        // },
      ];
    });
  }
}
