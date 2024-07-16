import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../Models/UserModel';
import { Group } from '../Models/GroupModel';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User = { id: 0, userName: '', firstName: '', lastName: '', group: '' };
  groups: Group[] = [
    { id: 1, groupName: 'Admin Group', groupDescription: '', permissions: ["Admin", "User"], users: [] },
    { id: 2, groupName: 'User Group', groupDescription: '', permissions: ["User"], users: [] }
  ]; // Initialize with static groups

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
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
