import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

let API_URL ="https://universitybe.herokuapp.com/api/manager/";
@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  enrollmentList: Array<FileList>;
currentUser:User;
headers:HttpHeaders;

  constructor(private http:HttpClient) {
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    this.headers= new HttpHeaders({
        authorization:'Bearer '+this.currentUser.token,
        "Content-Type":"application/json; charset=UTF-8"
    });
   }

   findAllEnrollments():Observable<any>{
     return this.http.get(API_URL +"enrollments", {headers:this.headers});

   }
}
