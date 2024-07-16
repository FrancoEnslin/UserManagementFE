import { Component, OnInit } from '@angular/core';
import { Group } from '../Models/GroupModel';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-admin-actions',
  templateUrl: './admin-actions.component.html',
  styleUrls: ['./admin-actions.component.css']
})
export class AdminActionsComponent implements OnInit {
  groups: Group[] = [
    { groupId: 1, groupName: 'Admin Group', groupDescription: '', permissions: ['Admin', 'User'], users: [] },
    { groupId: 2, groupName: 'User Group', groupDescription: '', permissions: ['User'], users: [] }
  ];

  selectedGroupId: number | undefined;
  userCountByGroup: number = 0
  totalUsers: number = 0

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUserCount();
  }

  fetchUserCount() {
    this.userService.getUserCount().subscribe(
      (count: number) => {
        this.totalUsers = count;
      },
      error => {
        console.error('Error fetching user count', error);
      }
    );
  }

  onGroupSelectChange(): void {
    console.log('SelectedGroupID: ', this.selectedGroupId)
    if (this.selectedGroupId) {
      this.userService.getUserCountByGroup(this.selectedGroupId).subscribe(
        (response: number) => {
          this.userCountByGroup = response;
        },
        error => {
          console.error('Error fetching user count by group:', error);
         
        }
      );
    } else {
    
    }
  }
}




