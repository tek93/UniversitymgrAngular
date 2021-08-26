import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Field } from 'src/app/model/field';
import { FieldStudent } from 'src/app/model/fieldstudent';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {Role} from 'src/app/model/role';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fieldList:Array<Field>;
  errorMessage:string;
  infoMessage:string;
  currentUser:User;
  Role:any;

  constructor(private userService:UserService, private router:Router) { 
    this.currentUser = this.userService.currentUserValue;
    

  }

  ngOnInit(): void {
    this.findAllFields();



  }
  findAllFields(){
    this.userService.findAllFields().subscribe(data=>{
        this.fieldList=data;
    });
  }
  enroll(field:Field){
    if(!this.currentUser){
      this.errorMessage="You should sign in to enrolla a field";
      return;

    }
    var fieldStudent = new FieldStudent();
    fieldStudent.student = this.currentUser;
    fieldStudent.field = field;
    this.userService.enroll(fieldStudent).subscribe(data=>{
        this.infoMessage ="Mission is complete";
    }, error=>{this.errorMessage ="Unexpected error occured. Probably you are already on this field";
  });

  }

}
