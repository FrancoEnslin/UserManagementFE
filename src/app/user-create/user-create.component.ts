import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service'
import { User } from '../Models/UserModel'
import { Group } from '../Models/GroupModel';
import { GroupsService } from '../Services/groups.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = { id: 0, userName: '', firstName: '', lastName: '', group: '' };
  groups: Group[] = [
    { id: 1, groupName: 'Admin Group', groupDescription: '', permissions: ["Admin", "User"], users: [] },
    { id: 2, groupName: 'User Group', groupDescription: '', permissions: ["User"], users: [] }
  ]; // Initialize with static groups


  constructor(
    private userService: UserService,
    private groupService: GroupsService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
