import { HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { FieldStudent } from '../model/fieldstudent';
let API_URL = "http://universitybe.herokuapp.com/api/user/";
let STUDENt_API_URL = "http://universitybe.herokuapp.com/api/student/"
@Injectable({
  providedIn: 'root'
})
export class UserService {

    public currentUser:Observable<User>;
    private currentUserSubject:BehaviorSubject<User>;
    headers:HttpHeaders;


  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

   }
   setHeaders(){
     this.headers = new HttpHeaders({
        authorization:'Bearer '+this.currentUserSubject.value.token,
        "Content-Type":"application/json; charset=UTF-8"

     });
   }
   public get currentUserValue():User{
     return this.currentUserSubject.value;

   }
   login(user: User):Observable<any>{
     const headers = new HttpHeaders(
       user? {
         authorization:'Basic '+btoa(user.username + ':'+user.password)
       }:{}
     );
     return this.http.get<any>(API_URL+"login", {headers:headers}).pipe(
          map(response=>{
              if(response){
                localStorage.setItem('currentUser', JSON.stringify(response));
                this.currentUserSubject.next(response);
              }
              return response;
          })
     );
     
   }
   logOut():Observable<any>{
     return this.http.post(API_URL+"logout", {}).pipe(
       map(response=>{
         localStorage.removeItem('currentUser');
         this.currentUserSubject.next(null);
       })
     );
   }
   register(user:User):Observable<any>{
     return this.http.post(API_URL+"registration", JSON.stringify(user), 
     {headers:{"Content-Type":"application/json; charset=UTF-8"}});
     
   }
   findAllFields():Observable<any>{
     return this.http.get(API_URL+"fields",  {headers:{"Content-Type":"application/json; charset=UTF-8"}});
   }
   findAllFieldsOfStudent(studentId:number):Observable<any>{
     this.setHeaders();
     return this.http.get(STUDENt_API_URL + "fields/"+studentId,{ headers:this.headers});

   }
   enroll(fieldStudent:FieldStudent):Observable<any>{
    this.setHeaders();
     return this.http.post(STUDENt_API_URL+"enroll", JSON.stringify(fieldStudent),{ headers:this.headers});

   }
}
