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
  user: User = { id: 0, userName: '', firstName: '', lastName: '', group: '' };

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
    });
  }

  cancel(): void {
   
      this.router.navigate(['/users']);
  
  }


  deleteUser(): void {
    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}