import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../Models/UserModel';
import { Group } from '../Models/GroupModel';
import { AddUser } from '../Models/AddUser';
import { EditUser } from '../Models/EditUser';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = { userId: 0, userName: '', firstName: '', lastName: '', userGroups: [], permissions: [] };

  groups: Group[] = [
    { groupId: 1, groupName: 'Admin Group', groupDescription: '', permissions: ['Admin', 'User'], users: [] },
    { groupId: 2, groupName: 'User Group', groupDescription: '', permissions: ['User'], users: [] }
  ]; // Initialize with static groups
  originalGroup: number = 0;

  selectedGroupId: number = 0

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }



  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0; // Default to 0 if idParam is null or undefined

    this.userService.getUser(id).subscribe(data => {
      this.user = data;
      console.log('User received by id: ', this.user);

      if (this.user.userGroups.length > 0) {
        this.selectedGroupId = this.user.userGroups[0].groupId;
        this.originalGroup = this.user.userGroups[0].groupId;
      }

    });
  }

  async onSubmit(): Promise<void> {
    // Prepare user object as per API expectation
    const newUser: EditUser = {
      userId: this.user.userId,
      userName: this.user.userName,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      groupId: this.selectedGroupId
    };

    try {
      if (this.originalGroup !== this.selectedGroupId) {
        console.log('Updating user group:', this.selectedGroupId);
        await this.userService.updateUserGroup(this.user.userId, this.selectedGroupId).toPromise();
        alert('User group updated');
      } else {
        console.log('Updating user details:', newUser);
        const response: any = await this.userService.updateUserDetails(newUser).toPromise();
        // if (response.status === 200) {
        //   alert('User details updated');
        // } else {
        //   alert('Failed to update user details');
        // }
      }
      this.router.navigate(['/users']);
    } catch (error) {
      // console.error('Error updating user:', error);
      // alert('Something went wrong');
      this.router.navigate(['/users']);
    }
  }
}
