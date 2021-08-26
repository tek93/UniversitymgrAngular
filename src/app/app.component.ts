import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role';
import { User } from './model/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'University Application';
  currentUser:User;
  constructor(private userService:UserService, private router:Router){
    this.userService.currentUser.subscribe(data=>{
        this.currentUser=data;
    });

  }
  logout(){
    this.userService.logOut().subscribe(data=>{
        this.router.navigate(['/login']);

    });
  }
  get isStudent(){
    return this.currentUser&& this.currentUser.role=== Role.STUDENT;

  }
  get isTeacher(){
    return this.currentUser&& this.currentUser.role===Role.TEACHER;
  }
  get isManager(){
    return this.currentUser&& this.currentUser.role===Role.MANAGER;
  }
}
