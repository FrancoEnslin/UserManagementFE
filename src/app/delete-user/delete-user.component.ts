import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.service'
import { User } from '../Models/UserModel'

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']

})
export class UserDeleteComponent implements OnInit {
  user: User = { userId: 0, userName: '', firstName: '', lastName: '', userGroups: [], permissions: [] };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : 0;
    this.userService.getUser(id).subscribe(data => {
      this.user = data;
      console.log('Received: ', this.user)
    });
  }

  cancel(): void {

    this.router.navigate(['/users']);

  }


  async deleteUser(): Promise<void> {
    try {
      const response: any = await this.userService.deleteUser(this.user.userId).toPromise();
      // if (response.status === 200) {
      //   alert("Deleted User");
      // } else {
      //   alert("Something went wrong");
      // }
      this.router.navigate(['/users']);
    } catch (error) {
      console.error(error);
      // alert("Something went wrong");
      this.router.navigate(['/users']);
    }
  }

}