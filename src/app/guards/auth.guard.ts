import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

currentUser:User;
constructor(private router:Router, private userService:UserService ){
  this.userService.currentUser.subscribe(data=>{
    this.currentUser=data;
  });

}
canActivate(router:ActivatedRouteSnapshot, state:RouterStateSnapshot){
  if(this.currentUser){
    if(router.data.roles &&router.data.roles.indexOf(this.currentUser.role)===-1){
      this.router.navigate(['/401']);
      return false;
    }
    return true;
    
  }
  this.router.navigate(['/login']);
  return false;
}


 
  
}
