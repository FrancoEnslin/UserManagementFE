import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../Models/UserModel';
import { Group } from '../Models/GroupModel';
import { GroupsService } from '../Services/groups.service';
import { AddUser } from '../Models/AddUser';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = { userId: 0, userName: '', firstName: '', lastName: '', userGroups: [], permissions: [] };
  groups: Group[] = [
    { groupId: 1, groupName: 'Admin Group', groupDescription: '', permissions: ["Admin", "User"], users: [] },
    { groupId: 2, groupName: 'User Group', groupDescription: '', permissions: ["User"], users: [] }
  ]; // Initialize with static groups

  constructor(
    private userService: UserService,
    private groupService: GroupsService,
    private router: Router
  ) { }
  selectedGroupId: number = 0;

  async onSubmit(): Promise<void> {
    // Prepare user object as per API expectation
    const newUser: AddUser = {
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      groupId: this.selectedGroupId
    };

    if (!this.user.userName || !this.user.firstName || !this.user.lastName || !this.selectedGroupId) {
      alert('Please fill out all fields');
      return;
    }

    console.log('Sending over: ', newUser);

    try {
      const response: any = await this.userService.createUser(newUser).toPromise();
      console.log(response)
      if (response.status === 200) {
        alert("Added User");
      } else {
        alert("Something went wrong");
      }
      this.router.navigate(['/users']);
    } catch (error) {
      this.router.navigate(['/users']);
    }


  }
}
